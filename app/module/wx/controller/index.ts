import {
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPQuery,
  Inject,
} from "@eggjs/tegg";
import { db } from "../../../utils/db";
import { WxApiService } from "../service";

const TokenExpire = 7000 * 1000;

@HTTPController({
  path: "/wx",
})
export class UserController {
  @Inject()
  wxApiService: WxApiService;

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: "token",
  })
  async token(
    @HTTPQuery({ name: "appId" }) appId: string,
    @HTTPQuery({ name: "appSecret" }) appSecret: string
  ) {
    const WxAccessToken = db.getModelWxAccessToken();

    const findToken = await WxAccessToken.findOne({
      where: {
        appId,
      },
    });

    let wxToken = "";

    const dbData = findToken?.toJSON();

    const isTokenValid =
      findToken && findToken.updatedAt.getTime() + TokenExpire > Date.now();

    if (!isTokenValid) {
      const res = await this.wxApiService.getAccessToken(appId, appSecret);
      if (res.errcode) {
        return {
          code: res.errcode,
          message: res.errmsg,
        };
      }

      wxToken = res.access_token!;
      if (findToken) {
        findToken.token = wxToken;
        await findToken.save();
      } else {
        await WxAccessToken.create({
          appId,
          token: wxToken,
        });
      }
    } else {
      wxToken = findToken.token;
    }

    return {
      code: 0,
      data: {
        dbData,
        now: Date.now(),
        wxToken,
      },
    };
  }
}

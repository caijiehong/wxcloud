import Router from "koa-router";
import { WxAccessToken } from "../db";
import * as wx from "../business/wx";

export default function (router: Router) {
  // 获取并更新微信全局Token
  router.get("/api/wx/token", async (ctx) => {
    const { request } = ctx;
    const { appId, appSecret } = request.query as {
      appId: string;
      appSecret: string;
    };

    const findToken = await WxAccessToken.findOne({
      where: {
        appId,
      },
    });

    let wxToken = "";

    const dbData = findToken?.toJSON();

    const isTokenValid =
      findToken && findToken.updatedAt.getTime() + wx.TokenExpire > Date.now();

    if (!isTokenValid) {
      const res = await wx.getAccessToken(appId, appSecret);
      if (res.errcode) {
        ctx.body = {
          code: res.errcode,
          message: res.errmsg,
        };
        return;
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

    ctx.body = {
      code: 0,
      data: {
        dbData,
        now: Date.now(),
        wxToken,
      },
    };
  });
}

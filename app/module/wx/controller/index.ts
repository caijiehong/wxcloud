import {
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPQuery,
  Inject,
} from "@eggjs/tegg";
import { WxApiService } from "../service";

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
  async token(@HTTPQuery({ name: "appId" }) appId: string) {
    const res = await this.wxApiService.getAccessToken(appId);

    return {
      code: 0,
      data: res,
    };
  }
}

import {
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPQuery,
  Inject,
  EggContext,
  Context,
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
  async token(
    @Context() ctx: EggContext,
    @HTTPQuery({ name: "appId" }) appId: string
  ) {
    const res = await this.wxApiService.getAccessToken(ctx, appId);

    return {
      code: 0,
      data: res,
    };
  }
}

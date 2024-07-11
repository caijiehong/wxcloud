import {
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPQuery,
  Inject,
  EggContext,
  Context,
  HTTPBody,
} from "@eggjs/tegg";
import { WxApiService } from "../service";

@HTTPController({
  path: "/wx",
})
export class WxController {
  @Inject()
  wxApiService: WxApiService;

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: "token",
  })
  public async token(
    @Context() ctx: EggContext,
    @HTTPQuery({ name: "appId" }) appId: string
  ) {
    const res = await this.wxApiService.getAccessToken(ctx, appId);

    return {
      code: 0,
      data: res,
    };
  }

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: "fun",
  })
  public async fun(
    @Context() ctx: EggContext,
    @HTTPBody()
    body: { appId: string; funName: string; funData: Record<string, string> }
  ) {
    const res = await this.wxApiService.invokeCloudFunction(
      ctx,
      body.appId,
      body.funName,
      body.funData
    );

    return {
      code: res.errcode,
      messsage: res.errmsg,
      data: res.data,
    };
  }
}

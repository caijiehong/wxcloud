import {
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPQuery,
} from "@eggjs/tegg";

@HTTPController({
  path: "/wx",
})
export class UserController {
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: "token",
  })
  async token(
    @HTTPQuery({ name: "appId" }) appId: string,
    @HTTPQuery({ name: "appSecret" }) appSecret: string
  ) {
    return {
      appId,
      appSecret,
    };
  }
}

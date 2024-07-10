import { EggLogger } from "egg";
import { SingletonProto, AccessLevel, Inject } from "@eggjs/tegg";

@SingletonProto({
  // 如果需要在上层使用，需要把 accessLevel 显示声明为 public
  accessLevel: AccessLevel.PUBLIC,
})
export class WxApiService {
  // 注入一个 logger
  @Inject()
  logger: EggLogger;

  async getAccessToken(appId: string, appSecret: string) {
    const url = `https://api.weixin.qq.com/cgi-bin/token`;
    const query = `grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
    const res = await fetch(`${url}?${query}`);
    const json = (await res.json()) as {
      errcode?: number;
      errmsg?: string;
      access_token?: string;
      expires_in?: number;
    };

    return json;
  }
}

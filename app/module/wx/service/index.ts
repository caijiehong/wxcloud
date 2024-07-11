import { SingletonProto, AccessLevel, Context, EggContext } from "@eggjs/tegg";

const TokenExpire = 7000 * 1000;

@SingletonProto({
  // 如果需要在上层使用，需要把 accessLevel 显示声明为 public
  accessLevel: AccessLevel.PUBLIC,
})
export class WxApiService {
  async getAppInfo(@Context() ctx: EggContext, appId: string) {
    const AppInfo = ctx.app.db.getModelAppInfo();
    const resAppInfo = await AppInfo.findOne({
      where: {
        miniAppId: appId,
      },
    });

    if (!resAppInfo) {
      throw new Error("appId not found");
    }
    return resAppInfo.toJSON();
  }

  async getAccessToken(@Context() ctx: EggContext, appId: string) {
    const WxAccessToken = ctx.app.db.getModelWxAccessToken();

    const findToken = await WxAccessToken.findOne({
      where: {
        appId: appId,
      },
    });

    let wxToken = "";

    const isTokenValid =
      findToken && findToken.updatedAt.getTime() + TokenExpire > Date.now();

    if (!isTokenValid) {
      const resAppInfo = await this.getAppInfo(ctx, appId);

      const res = await this.getAccessTokenFromSdk(
        appId,
        resAppInfo.miniAppSecret
      );
      if (res.errcode) {
        throw res;
      }

      wxToken = res.access_token!;
      if (findToken) {
        findToken.token = wxToken;
        await findToken.save();
      } else {
        await WxAccessToken.create({
          appId: appId,
          token: wxToken,
        });
      }
    } else {
      wxToken = findToken.token;
    }

    return {
      wxToken,
    };
  }

  async getAccessTokenFromSdk(appId: string, appSecret: string) {
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

  async invokeCloudFunction(
    @Context() ctx: EggContext,
    appId: string,
    fun: string,
    data: unknown
  ) {
    const appInfo = await this.getAppInfo(ctx, appId);
    const wxToken = (await this.getAccessToken(ctx, appId)).wxToken;
    const url = `https://api.weixin.qq.com/tcb/invokecloudfunction`;
    const query = `access_token=${wxToken}`;

    const body = { env: appInfo.wxCloudEnv, name: fun, req_data: data };

    const res = await fetch(`${url}?${query}`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const json = await res.json();

    return json;
  }
}

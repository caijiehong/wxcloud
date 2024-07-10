/**
 * 微信全局Token的过期时间
 * 单位：毫秒
 * 官方默认是 7200 秒，这里设置为 7000 秒
 */
export const TokenExpire = 7000 * 1000;

export async function getAccessToken(appId: string, appSecret: string) {
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

import Router from "koa-router";
import { WxAccessToken } from "../db";

export default function (router: Router) {
  // 更新计数
  router.get("/api/wx/token", async (ctx) => {
    const { request } = ctx;
    const { appId } = request.query as { appId: string };

    const findToken = await WxAccessToken.findOne({
      where: {
        appId,
      },
    });

    let wxToken = "";
    if (findToken === null) {
      wxToken = "Not found!";
    } else {
      wxToken = findToken.token;
    }

    ctx.body = {
      code: 0,
      data: {
        wxToken,
      },
    };
  });
}

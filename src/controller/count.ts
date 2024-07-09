import Router from "koa-router";
import { Counter } from "../db";

export default function (router: Router) {
  // 更新计数
  router.post("/api/count", async (ctx) => {
    const { request } = ctx;
    const { action } = request.body as { action: string };
    if (action === "inc") {
      await Counter.create();
    } else if (action === "clear") {
      await Counter.destroy({
        truncate: true,
      });
    }

    ctx.body = {
      code: 0,
      data: await Counter.count(),
    };
  });

  // 获取计数
  router.get("/api/count", async (ctx) => {
    const result = await Counter.count();

    ctx.body = {
      code: 0,
      data: result,
    };
  });
}

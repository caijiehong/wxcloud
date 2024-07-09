import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import koaStatic from "koa-static";
import bodyParser from "koa-bodyparser";
import path from "path";
import { init as initDB } from "./db";
import count from "./controller/count";

const router = new Router();

// 小程序调用，获取微信 Open ID
router.get("/api/wx_openid", async (ctx) => {
  if (ctx.request.headers["x-wx-source"]) {
    ctx.body = ctx.request.headers["x-wx-openid"];
  }
});
count(router);

const app = new Koa();
app
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(koaStatic(path.join(__dirname, "../public")));

const port = process.env.PORT || 80;
async function bootstrap() {
  app.listen(port, () => {
    console.log("启动成功 0708", port);
  });
  try {
    await initDB();
  } catch (error) {
    console.error("数据库初始化失败");

    console.error(error);
  }
}
bootstrap();

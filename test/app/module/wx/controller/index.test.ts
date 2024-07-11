import { app, assert } from "egg-mock/bootstrap";
import { mockDB } from "@/test/mock/db";
import { env } from "@/test/mock/env";
import { WxController } from "@/app/module/wx/controller/index";

const { MockMiniAppId, MockOpenId } = env;

type IFunRes = Awaited<ReturnType<WxController["fun"]>>;

describe("test/app/module/wx/controller/index.test.ts", () => {
  mockDB();

  it("should GET /wx/fun", async () => {
    const type = "dateWeek";
    const funData = {
      type,
      dateFrom: "20240630",
      dateTo: "20240720",
      _openid: MockOpenId,
    };
    const res = await app
      .httpRequest()
      .post(`/wx/fun?appId=${MockMiniAppId}&fun=homeIndex`)
      .type("json")
      .send({
        appId: MockMiniAppId,
        funName: "homeIndex",
        funData,
      });

    assert.equal(res.status, 200);

    const body = res.body as IFunRes;

    assert.equal(body.message, "ok");

    console.log(body.data);
  });
});

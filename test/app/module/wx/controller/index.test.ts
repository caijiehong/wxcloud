import { app, assert } from "egg-mock/bootstrap";
import { mockDB, MockWxToken, MockMiniAppId } from "@/test/mock/db";
import { WxController } from "@/app/module/wx/controller/index";

type IFunRes = Awaited<ReturnType<WxController["fun"]>>;

describe("test/app/module/wx/controller/index.test.ts", () => {
  mockDB();

  // it("should GET /wx/token", async () => {
  //   const res = await app.httpRequest().get(`/wx/token?appId=${MockMiniAppId}`);

  //   assert.equal(res.status, 200);

  //   const body = res.body as Awaited<ReturnType<WxController["token"]>>;

  //   assert.equal(body.data.wxToken, MockWxToken);
  // });

  it("should GET /wx/fun", async () => {
    const res = await app
      .httpRequest()
      .post(`/wx/fun?appId=${MockMiniAppId}&fun=homeIndex`)
      .type("json")
      .send({
        appId: MockMiniAppId,
        funName: "homeIndex",
        funData: { type: "demo" },
      });

    assert.equal(res.status, 200);

    const body = res.body as IFunRes;

    const data = body.data as { event: { type: string } };

    assert.equal(data.event.type, "demo");
  });
});

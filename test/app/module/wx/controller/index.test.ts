import { app, assert } from "egg-mock/bootstrap";
import { mockDB, MockWxToken, MockMiniAppId } from "@/test/mock/db";
import { UserController } from "@/app/module/wx/controller/index";

describe("test/app/module/wx/controller/index.test.ts", () => {
  mockDB();

  it("should GET /wx/token", async () => {
    const res = await app.httpRequest().get(`/wx/token?appId=${MockMiniAppId}`);

    assert.equal(res.status, 200);

    const body = res.body as Awaited<ReturnType<UserController["token"]>>;

    assert.equal(body.data.wxToken, MockWxToken);
  });
});

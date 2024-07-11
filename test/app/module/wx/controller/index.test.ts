import { strict as assert } from "node:assert";
import { app } from "egg-mock/bootstrap";

describe("test/app/module/wx/controller/index.test.ts", () => {
  it("should GET /wx/token", async () => {
    const res = await app.httpRequest().get("/wx/token?appId=123");
    assert.equal(res.status, 200);
    assert.equal(res.text, "hello egg");
  });
});

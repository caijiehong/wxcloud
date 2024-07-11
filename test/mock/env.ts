import fs from "fs";
import path from "path";

function getMockEnv(): {
  MockMiniAppId: string;
  MockWxToken: string;
  MockCloudEnv: string;
  MockOpenId: string;
} {
  // 如果当前目录下存在 env.mock.json 文件，则使用该文件的内容作为环境变量
  const file = path.resolve(__dirname, "env.mock.json");
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  }

  return {
    MockMiniAppId: "MockMiniAppId",
    MockWxToken: "MockWxToken",
    MockCloudEnv: "MockCloudEnv",
    MockOpenId: "MockOpenId",
  };
}

export const env = getMockEnv();

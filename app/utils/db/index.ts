import { Sequelize } from "sequelize";
import {
  defineModelAccessToken as defineWxAccessToken,
  defineModelAppInfo,
} from "./wx";

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

export const db = (function () {
  let WxAccessToken: ReturnType<typeof defineWxAccessToken> | null = null;
  let AppInfo: ReturnType<typeof defineModelAppInfo> | null = null;
  /**
   * 初始化数据库
   */
  async function init(): Promise<void> {
    console.log("init db");
    const sequelize = new Sequelize(
      "nodejs_demo",
      MYSQL_USERNAME!,
      MYSQL_PASSWORD,
      {
        host,
        port: +port,
        dialect:
          "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
      }
    );

    WxAccessToken = defineWxAccessToken(sequelize);
    await WxAccessToken.sync({ alter: true });
    AppInfo = defineModelAppInfo(sequelize);
    await AppInfo.sync({ alter: true });
  }

  function getModelWxAccessToken() {
    if (!WxAccessToken) {
      throw new Error("WxAccessToken is not initialized");
    }
    return WxAccessToken;
  }

  function getModelAppInfo() {
    if (!AppInfo) {
      throw new Error("AppInfo is not initialized");
    }
    return AppInfo;
  }

  return {
    init,
    getModelWxAccessToken,
    getModelAppInfo,
  };
})();

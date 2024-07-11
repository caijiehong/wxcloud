import { Sequelize } from "sequelize";
import {
  defineModelAccessToken as defineWxAccessToken,
  defineModelAppInfo,
} from "./wx";

export function createDB({ userName, password, host, port }) {
  let WxAccessToken: ReturnType<typeof defineWxAccessToken> | null = null;
  let AppInfo: ReturnType<typeof defineModelAppInfo> | null = null;
  /**
   * 初始化数据库
   */
  async function init(): Promise<void> {
    console.log("init db");
    try {
      const sequelize = new Sequelize("nodejs_demo", userName, password, {
        host,
        port: +port,
        dialect:
          "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
      });

      WxAccessToken = defineWxAccessToken(sequelize);
      AppInfo = defineModelAppInfo(sequelize);

      const p1 = WxAccessToken.sync({ alter: true });
      const p2 = AppInfo.sync({ alter: true });
      await Promise.all([p1, p2]);
    } catch (error) {
      console.warn("init db error", error);
    }
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
}

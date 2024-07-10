import { EggLogger } from "egg";
import { SingletonProto, AccessLevel, Inject } from "@eggjs/tegg";
import { Sequelize } from "sequelize";
import { defineModel as defineWxAccessToken } from "./wxAccessToken";

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize(
  "nodejs_demo",
  MYSQL_USERNAME!,
  MYSQL_PASSWORD,
  {
    host,
    port: +port,
    dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  }
);

const WxAccessToken = defineWxAccessToken(sequelize);

// 数据库初始化方法
async function init() {
  await WxAccessToken.sync({ alter: true });
}

// 导出初始化方法和模型
export { init, WxAccessToken };

@SingletonProto({
  // 如果需要在上层使用，需要把 accessLevel 显示声明为 public
  accessLevel: AccessLevel.PUBLIC,
})
export class DBService {
  // 注入一个 logger
  @Inject()
  logger: EggLogger;

  // 封装业务
  async hello(userId: string): Promise<string> {
    const result = { userId, handledBy: "foo module" };
    this.logger.info("[hello] get result: %j", result);
    return `hello, ${result.userId}`;
  }
}

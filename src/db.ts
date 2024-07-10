import { Sequelize, DataTypes, Model } from "sequelize";

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

// 定义数据模型
const Counter = sequelize.define("Counter", {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

type WxAccessTokenAttributes = {
  appId: string;
  token: string;
};

class MWxAccessToken extends Model<WxAccessTokenAttributes> {
  declare appId: string;
  declare token: string;
  declare readonly id: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

const WxAccessToken = sequelize.define<MWxAccessToken>(
  "WxAccessToken",
  {
    appId: {
      type: DataTypes.CHAR(128),
      allowNull: false,
    },
    token: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["appId"],
      },
    ],
  }
);

// 数据库初始化方法
async function init() {
  await Counter.sync({ alter: true });
  await WxAccessToken.sync({ alter: true });
}

// 导出初始化方法和模型
export { init, Counter, WxAccessToken };

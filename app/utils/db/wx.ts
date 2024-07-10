import { Sequelize, DataTypes, Model } from "sequelize";

type WxAccessTokenAttributes = {
  /**
   * 小程序的 appId
   */
  appId: string;
  /**
   * 小程序的 access token
   */
  token: string;
};

class MWxAccessToken extends Model<WxAccessTokenAttributes> {
  declare appId: string;
  declare token: string;
  declare readonly id: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function defineModelAccessToken(sequelize: Sequelize) {
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

  return WxAccessToken;
}

type AppInfoAttributes = {
  /**
   * 小程序的 appId
   */
  miniAppId: string;
  /**
   * 小程序的 appSecret
   */
  miniAppSecret: string;
  /**
   * 云开发环境 ID
   */
  wxCloudEnv: string;
};
class MAppInfo extends Model<AppInfoAttributes> {
  declare miniAppId: string;
  declare miniAppSecret: string;
  declare wxCloudEnv: string;
  declare readonly id: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function defineModelAppInfo(sequelize: Sequelize) {
  const AppInfo = sequelize.define<MAppInfo>(
    "AppInfo",
    {
      miniAppId: {
        type: DataTypes.CHAR(128),
        allowNull: false,
      },
      miniAppSecret: {
        type: DataTypes.CHAR(255),
        allowNull: false,
        defaultValue: "",
      },
      wxCloudEnv: {
        type: DataTypes.CHAR(255),
        allowNull: false,
        defaultValue: "",
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["miniAppId"],
        },
      ],
    }
  );

  return AppInfo;
}

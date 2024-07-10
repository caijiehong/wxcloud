import { Sequelize, DataTypes, Model } from "sequelize";

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
  appId: string;
  appSecret: string;
};
class MAppInfo extends Model<AppInfoAttributes> {
  declare appId: string;
  declare appSecret: string;
  declare readonly id: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function defineModelAppInfo(sequelize: Sequelize) {
  const AppInfo = sequelize.define<MAppInfo>(
    "AppInfo",
    {
      appId: {
        type: DataTypes.CHAR(128),
        allowNull: false,
      },
      appSecret: {
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

  return AppInfo;
}

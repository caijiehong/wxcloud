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

export function defineModel(sequelize: Sequelize) {
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

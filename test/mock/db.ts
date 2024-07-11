import { mock } from "egg-mock/bootstrap";
import * as db from "@/app/utils/db";

export const MockMiniAppId = "123";

export const MockWxToken = "123";

export function mockDB() {
  mock(db, "createDB", () => {
    return {
      init: async () => {
        console.log("db init mock !!!!!!!!!!!!!!");
      },
      getModelWxAccessToken: () => {
        return {
          findOne: async () => {
            return {
              appId: MockMiniAppId,
              token: MockWxToken,
              id: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
          },
        };
      },
      getModelAppInfo: () => {
        return {
          findOne: async () => {
            return {
              miniAppId: MockMiniAppId,
              miniAppSecret: "123",
              wxCloudEnv: "123",
            };
          },
        };
      },
    };
  });
}

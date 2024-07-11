import { mock } from "egg-mock/bootstrap";
import * as db from "@/app/utils/db";

export const MockMiniAppId = "MockMiniAppId";

export const MockWxToken = "MockWxToken";

export const MockCloudEnv = "MockCloudEnv";

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
            const json = {
              miniAppId: MockMiniAppId,
              miniAppSecret: "123",
              wxCloudEnv: MockCloudEnv,
            };
            return {
              ...json,
              toJSON: () => {
                return json;
              },
            };
          },
        };
      },
    };
  });
}

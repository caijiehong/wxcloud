import { createDB } from "../utils/db";

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

// app.ts
export default {
  db: createDB({
    userName: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    host,
    port,
  }),
};

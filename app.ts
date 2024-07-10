// app.ts
import { Application, IBoot } from "egg";

export default class implements IBoot {
  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  configWillLoad() {
    // 预备调用 configDidLoad，
    // Config 和 plugin 文件已被引用，
    // 这是修改配置的最后机会。
  }

  configDidLoad() {
    // Config 和 plugin 文件已加载。
  }

  async didLoad() {
    // 所有文件已加载，此时可以启动插件。
  }

  async willReady() {
    // 所有插件已启动，这里可以执行一些在应用准备好之前的操作。
  }

  async didReady() {
    // Worker 已准备好，可以执行一些不会阻塞应用启动的操作。
  }

  async serverDidReady() {
    this.app.logger.info("serverDidReady", new Date().toLocaleString());
    // 服务器已监听。
  }

  async beforeClose() {
    // 应用关闭前执行的操作。
  }
}

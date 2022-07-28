export class AppConfiguration {
  port: string;
  static instance: AppConfiguration;

  constructor() {
    this.port = process.env.PORT as string;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new AppConfiguration();
    }
    return this.instance;
  }
};

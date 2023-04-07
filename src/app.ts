import {
  Application,
  Middleware,
} from "./deps.ts";
import { ConfigService } from "./services/config.service.ts";
import { Service, ServiceNameEnum } from "./types/service.ts";
import { LoggerService } from "./services/logger.service.ts";

export class App {
  private app: Application;
  private services: Map<string, Service>;
  private middlewares: Middleware[];
  private routes: Middleware[];
  private loggerService?: LoggerService;

  constructor() {
    this.app = new Application();
    this.services = new Map<string, Service>();
    this.middlewares = [];
    this.routes = [];

    this.initialize();
  }

  public useMiddlewares(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  public useRoutes(routes: Middleware) {
    this.routes.push(routes);
  }

  public getService(serviceName: string) {
    return this.services.get(serviceName);
  }

  public async listen(port: number) {
    this.loggerService = this.getService(
      ServiceNameEnum.LoggerService,
    ) as LoggerService;
    this.loggerService.logger.info("Application starting!");

    this.loggerService.logger.info("Configuring middlewares");
    this.middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });

    this.loggerService.logger.info("Configuring routes");
    this.routes.forEach((route) => {
      this.app.use(route);
    });

    return await this.app.listen({ port });
  }

  private initialize() {
    this.services.set(ServiceNameEnum.ConfigService, new ConfigService());
    this.services.set(ServiceNameEnum.LoggerService, new LoggerService());
  }
}

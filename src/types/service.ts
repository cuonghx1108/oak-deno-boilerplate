import { BaseService } from "../services/base.service.ts";

export type Service = BaseService;

export enum ServiceNameEnum {
  ConfigService = "ConfigService",
  LoggerService = "LoggerService",
}

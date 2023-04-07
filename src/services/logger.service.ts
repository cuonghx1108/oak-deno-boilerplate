import { BaseService } from "./base.service.ts";
import { ServiceNameEnum } from "../types/service.ts";
import {
  ConsoleTransport,
  Houston,
} from "../deps.ts";

export class LoggerService extends BaseService {
  public logger: Houston;
  constructor() {
    super();
    this.name = ServiceNameEnum.LoggerService;
    this.logger = new Houston([
      new ConsoleTransport(),
    ]);
  }
}

import {
  config,
  ConfigOptions,
  DotenvConfig,
  MissingEnvVarsError,
} from "../deps.ts";
import { ServiceNameEnum } from "../types/service.ts";
import { BaseService } from "./base.service.ts";

export class ConfigService extends BaseService {
  private env: DotenvConfig;

  constructor(opts?: ConfigOptions) {
    super();
    this.name = ServiceNameEnum.ConfigService;
    this.env = config(opts);
  }

  public get(key: string) {
    if (!this.env[key]) {
      throw new MissingEnvVarsError();
    }
    return this.env[key];
  }

  get port(): number {
    return +this.get("PORT")
  }
}

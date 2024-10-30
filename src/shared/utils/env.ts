import { configDotenv } from 'dotenv';
import config from '../../config/env';

configDotenv();

export default class Env {
  private static validatedEnv: any;

  public static get<T = string>(key: string) {
    if (this.validatedEnv?.[key] != null) return this.validatedEnv[key] as T;
    return (config as any)[key] as T;
  }
}

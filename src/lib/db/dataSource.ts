import "reflect-metadata";
import { DataSource } from "typeorm";
import { PriceIndex } from "./entity/PriceIndex";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  timezone: process.env.DB_TIMEZONE ?? "Z",
  logging: process.env.DB_LOGGING === "true",
  synchronize: true, // 개발 단계에서만
  entities: [PriceIndex],
});

let _inited: Promise<DataSource> | null = null;
export async function getDS() {
  if (_inited) return _inited;
  _inited = AppDataSource.initialize();
  return _inited;
}

import "reflect-metadata";
import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { MainSeeder } from "./seeds/mainSeeder";

const port = process.env.TYPEORM_PORT as unknown as number | undefined;

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_URL ? "database" : "localhost",
  port: port,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [__dirname + "/**/entities/*.entity.{ts,js}"],
  migrations: [__dirname + "/**/migrations/**/*.{ts,js}"],
  seeds: [MainSeeder],
  logging: true,
  migrationsRun: false,
} as DataSourceOptions & SeederOptions);

import "reflect-metadata";
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

// Load environment variables before creating DataSource
dotenv.config({ path: ".env" });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  synchronize: true,
  logging: false,
  entities: [__dirname + "/../domain/**/*.js"],
  migrations: [],
  subscribers: [],
  ssl: {
    rejectUnauthorized: false, // Set to false for AWS-managed SSL
  },
});

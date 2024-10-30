import { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const config: Knex.Config = {
  client: "mysql2",
  connection: {
    port: 3306,
    host: process.env.DEMO_CREDIT_DATABASE_HOST,
    user: process.env.DEMO_CREDIT_DATABASE_USER,
    password: process.env.DEMO_CREDIT_DATABASE_PASSWORD,
    database: process.env.DEMO_CREDIT_DATABASE_NAME,
  },
  migrations: {
    directory: "./migrations",
  },
};

export default config;

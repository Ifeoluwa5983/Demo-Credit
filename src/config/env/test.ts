import { configDotenv } from 'dotenv';
import process from 'node:process';
configDotenv();

const test = {
  NODE_ENV: process.env.DEMO_CREDIT_NODE_ENV,
  PORT: process.env.DEMO_CREDIT_PORT,
  DATABASE_HOST: process.env.DEMO_CREDIT_TEST_DATABASE_HOST,
  DATABASE_USER: process.env.DEMO_CREDIT_TEST_DATABASE_USER,
  DATABASE_PASSWORD: process.env.DEMO_CREDIT_TEST_DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DEMO_CREDIT_TEST_DATABASE_NAME,
  JWT_SECRET: process.env.DEMO_CREDIT_DEV_JWT_SECRET,
  JWT_TIME_TO_LIVE: process.env.DEMO_CREDIT_DEV_JWT_TIME_TO_LIVE,
  SALT_ROUND: process.env.DEMO_CREDIT_DEV_SALT_ROUND,
  KARMA_API_KEY: process.env.DEMO_CREDIT_KARMA_API_KEY
};

export default test;

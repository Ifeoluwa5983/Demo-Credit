import { configDotenv } from 'dotenv';
import process from 'node:process';
configDotenv();

const test = {
  NODE_ENV: process.env.DEMO_CREDIT_NODE_ENV,
  PORT: process.env.DEMO_CREDIT_PORT,
  DATABASE_URL: process.env.DEMO_CREDIT_TEST_DATABASE_URL,
  JWT_SECRET: process.env.DEMO_CREDIT_DEV_JWT_SECRET,
  JWT_TIME_TO_LIVE: process.env.DEMO_CREDIT_DEV_JWT_TIME_TO_LIVE,
  SALT_ROUND: process.env.DEMO_CREDIT_DEV_SALT_ROUND,
  KARMA_API_KEY: process.env.DEMO_CREDIT_KARMA_API_KEY
};

export default test;

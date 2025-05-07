import { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: +process.env.DB_PORT,
  },
  migrations: {
    directory: __dirname + '/src/database/migrations',
  },
  seeds: {
    directory: __dirname + '/src/database/seeds',
  },
  debug: false,
  log: {
    debug: (query: string) => console.log(query),
  },
};

export default config;

import knex from 'knex';
import knexFile from '../../knexfile';

export const KNEX_CONNECTION = 'KNEX_CONNECTION';

export const databaseProvider = {
  provide: KNEX_CONNECTION,
  useFactory: async () => {
    return knex(knexFile);
  },
};

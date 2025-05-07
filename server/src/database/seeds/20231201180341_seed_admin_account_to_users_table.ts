import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';

export async function seed(knex: Knex): Promise<void> {
  await knex(TABLES.USERS).del();

  const additionalUsers = [...Array(1000).keys()].map((i) => ({
    username: `user${i + 1}`,
    email: `user${i + 1}@example.com`,
    password: '$2b$12$gAuASEt0LwyUTjf7npjJcOwy9Ct5iFlIk0FlOvA4JjLuDa4hpu00W',
  }));

  // Password: "P@ssw0rd"
  await knex(TABLES.USERS).insert([
    {
      username: 'super-admin',
      email: 'super-admin@gmail.com',
      password: '$2b$12$gAuASEt0LwyUTjf7npjJcOwy9Ct5iFlIk0FlOvA4JjLuDa4hpu00W',
    },
    {
      username: 'admin',
      email: 'admin@gmail.com',
      password: '$2b$12$gAuASEt0LwyUTjf7npjJcOwy9Ct5iFlIk0FlOvA4JjLuDa4hpu00W',
    },
    {
      username: 'manager',
      email: 'manager@gmail.com',
      password: '$2b$12$gAuASEt0LwyUTjf7npjJcOwy9Ct5iFlIk0FlOvA4JjLuDa4hpu00W',
    },
    {
      username: 'developer',
      email: 'developer@gmail.com',
      password: '$2b$12$gAuASEt0LwyUTjf7npjJcOwy9Ct5iFlIk0FlOvA4JjLuDa4hpu00W',
    },
    ...additionalUsers,
  ]);
}

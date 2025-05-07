import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(TABLES.USER_ROLES, (table) => {
    // PK
    table.increments('id').primary();

    // INFO
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable(TABLES.USERS)
      .onDelete('CASCADE');
    table
      .integer('role_id')
      .unsigned()
      .references('id')
      .inTable(TABLES.ROLES)
      .onDelete('CASCADE');

    // TIMESTAMPS
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(TABLES.USER_ROLES);
}

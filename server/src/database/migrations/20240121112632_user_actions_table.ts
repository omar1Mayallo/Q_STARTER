import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(TABLES.USER_ENTITY_ACTION, (table) => {
    // PK
    table.increments('id').primary();

    // INFO
    table.string('email').references('email').inTable(TABLES.USERS);

    table
      .string('action_key')
      .references('action_key')
      .inTable(TABLES.ENTITY_ACTION)
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');

    // TIMESTAMPS
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(TABLES.USER_ENTITY_ACTION);
}

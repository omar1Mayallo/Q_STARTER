import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(TABLES.ROLE_ENTITY_ACTIONS, (table) => {
    // PK
    table.increments('id').primary();

    // INFO
    table
      .integer('role_id')
      .unsigned()
      .references('id')
      .inTable(TABLES.ROLES)
      .onDelete('CASCADE')
      .notNullable();
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
  return await knex.schema.dropTable(TABLES.ROLE_ENTITY_ACTIONS);
}

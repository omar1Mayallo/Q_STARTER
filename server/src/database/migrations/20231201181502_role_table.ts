import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';
import { STATUS, USER_TYPE } from '../../shared/types/enums';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(TABLES.ROLES, (table) => {
    // PK
    table.increments('id').primary();

    // INFO
    table.string('name', 100).notNullable().unique();
    table.string('description', 255).nullable();
    table.string('type', 50).defaultTo(USER_TYPE.ADMINISTRATIVE).notNullable();
    table.string('status', 50).defaultTo(STATUS.INACTIVE).notNullable();

    // TIMESTAMPS
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(TABLES.ROLES);
}

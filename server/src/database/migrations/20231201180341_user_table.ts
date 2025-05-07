import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';
import { STATUS, USER_TYPE } from '../../shared/types/enums';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(TABLES.USERS, (table) => {
    // PK
    table.increments('id').primary();

    // INFO
    table.string('email', 254).notNullable().unique();
    table.string('username', 30).notNullable();
    table.string('password').notNullable();
    table.string('type', 50).defaultTo(USER_TYPE.ADMINISTRATIVE).notNullable();
    table.string('status', 50).defaultTo(STATUS.ACTIVE).notNullable();
    table.string('phone', 50).nullable();
    table.boolean('login_with_otp').defaultTo(false).notNullable();
    table.specificType('avatar', 'BYTEA').defaultTo(null);

    // TIMESTAMPS
    table.timestamp('deleted_at').nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(TABLES.USERS);
}

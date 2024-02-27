const { TableBuilder } = require("knex");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("employees", (TableBuilder) => {
    TableBuilder.increments("id").primary();
    TableBuilder.string("address").notNullable();
    TableBuilder.string("phone_number").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("employees", (TableBuilder) => {
    TableBuilder.dropColumn("id");
    TableBuilder.dropColumn("address");
    TableBuilder.dropColumn("phone_number");
  });
};

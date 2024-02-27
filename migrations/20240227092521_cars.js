const { TableBuilder } = require("knex");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cars", (TableBuilder) => {
    TableBuilder.increments("id");
    TableBuilder.string("car_name").notNullable();
    TableBuilder.string("model").notNullable();
    TableBuilder.integer("year").notNullable();
    TableBuilder.string("color").notNullable();
    TableBuilder.double("mileage").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("cars");
};

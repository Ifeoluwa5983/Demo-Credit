import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
        table.increments("id").primary().unique();
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.string("country").notNullable();
        table.string('country_code').notNullable();
        table.string("email").notNullable().unique();
        table.string("transaction_pin").notNullable();
        table.string("phone_number").notNullable().unique();
        table.string("password").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });

    await knex.schema.createTable("wallets", (table) => {
        table.increments("id").primary().unique();
        table.integer("user_id").unsigned().notNullable();
        table.string("currency").notNullable();
        table.decimal("balance", 10, 2).defaultTo(0.00);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());

        table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
    });

    await knex.schema.createTable("wallet_transactions", (table) => {
        table.increments("id").primary().unique();
        table.integer("wallet_id").unsigned().notNullable();
        table.decimal("amount", 10, 2).notNullable();
        table.decimal("fees", 10, 2).notNullable();
        table.decimal("balance", 10, 2).notNullable();
        table.string("reference").notNullable().unique();
        table.enum("transaction_type", ["credit", "debit"]).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());

        table.foreign("wallet_id").references("id").inTable("wallets").onDelete("CASCADE");
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("wallet_transactions");
    await knex.schema.dropTableIfExists("wallets");
    await knex.schema.dropTableIfExists("users");
}

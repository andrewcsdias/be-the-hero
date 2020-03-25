
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table){
        table.string('id', 128).primary();
        table.string('name', 128).notNullable();
        table.string('email', 128).notNullable();
        table.string('whatsapp', 32).notNullable();
        table.string('city', 128).notNullable();
        table.string('uf', 2).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};
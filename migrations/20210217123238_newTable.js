
exports.up = async function(knex) {
  await knex.schema.createTable("domains",(table)=>{
    //foreign key table "domains"
    table.increments("domain_id");
    table.string("domain_name",128).unique().notNullable();
    table.string("domain_description",128);
  })
  await knex.schema.createTable("dreams",(table)=>{
    table.increments("dreams_id");
    table.string("dreams_name",128).unique().notNullable();
    table.integer("domain_id")
    .defaultTo(1)
    .references("domains.domain_id")
    .unsigned()
    .onUpdate("CASCADE")
    .onDelete("CASCADE")
  })
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("domains")
  await knex.schema.dropTableIfExists("dreams")
}

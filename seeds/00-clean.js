
exports.seed = async function(knex) {
   await knex("domains").truncate();
   await knex("dreams").truncate();
};

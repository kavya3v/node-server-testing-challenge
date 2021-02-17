
exports.seed = async function(knex) {
  await knex("domains").insert([
    {domain_name:"Bio Tech",domain_description:"Neural Networks"},
    {domain_name:"Social Media",domain_description:"Social Networks"},
    {domain_name:"Medical",domain_description:"Medical and Medicine"}
  ])
  await knex("dreams").insert([
    {dreams_name:"NeuraLink" ,domain_id:1},
    {dreams_name:"23andMe" ,domain_id:1},
    {dreams_name:"Twitter" ,domain_id:2},
  ])
};

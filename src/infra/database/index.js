const { Model } = require('objection');
const knex = require('knex');

module.exports = function ({ config }) {
	const { client, connection } = config.database;

	const database = knex({
		client,
		connection,
		useNullAsDefault: false,
	});

	Model.knex(database);

	return database;
};

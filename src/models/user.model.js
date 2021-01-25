const { Model } = require('objection');
const bcrypt = require('bcrypt');
const { formatSqlDatetime } = require('../utils/dates');

class User extends Model {
	static get tableName() {
		return 'users';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['password'],
			properties: {
				email: { type: ['string', 'null'] },
				password: 'string',
				strategy: 'string'
			}
		};
	}

	async $beforeInsert() {
		this.password = await bcrypt.hash(this.password, 10);
		this.createdAt = this.updatedAt = formatSqlDatetime(new Date());
	}

	$beforeUpdate() {
		this.updatedAt = formatSqlDatetime(new Date());
	}
}

module.exports = function createModel({ database }) {
	database.schema.hasTable('users').then(exists => {
		if (!exists) {
			database.schema.createTable('users', table => {
				table.increments('id');

				table.string('email').unique();
				table.string('password');
				table.enum('strategy', ['local', 'oauth2']).notNullable();
				table.datetime('createdAt').notNullable();
				table.datetime('updatedAt').notNullable();
			})
				.then(() => console.log('Created users table')) // eslint-disable-line no-console
				.catch(e => console.error('Error creating users table', e)); // eslint-disable-line no-console
		}
	})
		.catch(e => console.error('Error creating users table', e)); // eslint-disable-line no-console

	return User;
};

module.exports = {
	environment: process.env.NODE_ENV,
	auth: {
		jwt: {
			secret: process.env.AUTH_JWT_SECRET,
		},
		okta: {
			issuer: process.env.OKTA_ISSUER,
			clientId: process.env.OKTA_CLIENT_ID,
			audience: process.env.OKTA_AUDIENCE,
		}
	},
	api: {
		port: process.env.API_PORT || 3000
	},
	database: {
		client: 'mysql2',
		connection: {
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
		}
	},
	logger: {
		enabled: process.env.NODE_ENV == 'production',
		file: __dirname + '/logs'
	}
};

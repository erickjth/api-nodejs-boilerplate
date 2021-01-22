module.exports = {
	api: {
		port: process.env.API_PORT || 3000
	},
	database: {
		client: "mysql2",
		connection: {
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
		}
	}
}

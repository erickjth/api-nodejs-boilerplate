module.exports = function (app, opts, done) {
	const authController = app.container.resolve('authController');

	app.post('/login', {
		schema: {
			body: {
				type: 'object',
				properties: {
					username: { type: 'string' },
					password: { type: 'string' }
				}
			},
			response: {
				200: {
					type: 'object',
					properties: {
						token: { type: 'string' },
						data: {
							type: 'object',
							properties: {
								email: { type: 'string' },
								createdAt: { type: 'string' },
								updatedAt: { type: 'string' },
							}
						}
					}
				}
			}
		}
	}, authController.login);

	return done();
};

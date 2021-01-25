module.exports = function (app, opts, done) {
	const userController = app.container.resolve('userController');

	app.get('/user', {
		schema: {
			response: {
				200: {
					type: 'object',
					properties: {
						data: { type: 'array' }
					}
				}
			}
		},
		preValidation: [app.authenticate]
	}, userController.getAll);

	app.get('/user/:id', {
		schema: {
			response: {
				200: {
					type: 'object',
					properties: {
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
		},
		preValidation: [app.authenticate]
	}, userController.get);

	app.post('/user', {
		schema: {
			body: {
				type: 'object',
				properties: {
					email: { type: 'string' },
					password: { type: 'string' }
				}
			},
			response: {
				200: {
					type: 'object',
					properties: {
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
	}, userController.postUser);

	return done();
};

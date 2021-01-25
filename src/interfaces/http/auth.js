const fp = require('fastify-plugin');
const httpStatus = require('http-status');
const ApiError = require('./errors/api-error');

module.exports = fp((instance, opts, done) => {
	const jwtStrategy = instance.container.resolve('jwtStrategy');
	const config = instance.container.resolve('config');

	instance.register(require('fastify-jwt'), {
		formatUser: jwtStrategy.formatUser,
		secret: config.auth.jwt.secret
	});

	instance.decorate('authenticate', async function (request, reply) {
		try {
			await request.jwtVerify();
		} catch (err) {
			throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
		}
	});

	// const oklaStrategy = instance.container.resolve('oktaStrategy');
	// instance.decorate('authenticate-with-okta', async function (request, reply) {
	// 	try {
	// 		const { authorization } = request.headers;

	// 		if (!authorization) {
	// 			throw new Error('Missing Token');
	// 		}

	// 		const [, token] = authorization.trim().split(' ');

	// 		await oklaStrategy.verify(token);
	// 	} catch (err) {
	// 		throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
	// 	}
	// });

	done();
});

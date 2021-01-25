const httpStatus = require('http-status');
const ApiError = require('../../errors/api-error');

module.exports = function AuthController({ jwtStrategy }) {
	async function login(request, reply) {
		try {
			const user = await jwtStrategy.authenticate(
				request.body.username,
				request.body.password
			);

			const token = await reply.jwtSign({ id: user.id });

			return reply.send({
				token: token,
				data: user
			});
		} catch (err) {
			throw new ApiError(httpStatus.UNAUTHORIZED, 'Authentication failed');
		}
	}

	return { login };
};

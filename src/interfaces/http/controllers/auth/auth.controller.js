const httpStatus = require('http-status');
const ApiError = require('../../errors/api-error');

module.exports = function AuthController({ jwtStrategy }) {
	async function login(request, reply) {
		try {
			const user = await jwtStrategy.authenticate(
				request.body.username,
				request.body.password
			);

			reply.jwtSign({ id: user.id }, function (err, token) {
				return reply.send(err || {
					token: token,
					data: user
				});
			});
		} catch (err) {
			throw new ApiError(httpStatus.UNAUTHORIZED, 'Authentication failed');
		}
	}

	return { login };
};

const ApiError = require('../../errors/api-error');
const httpStatus = require('http-status');

module.exports = function UserController({ userServices }) {
	async function getAll(request, reply) {
		const users = await userServices.findAll();

		reply.send({ data: users });
	}

	async function get(request, reply) {
		const user = await userServices.findById(request.params.id);

		if (!user) {
			throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
		}

		reply.send({ data: user });
	}

	async function postUser(request, reply) {
		const { email, password } = request.body;

		const user = await userServices.findByEmail(email);

		if (user) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'User with email ' + email + ' already exists.');
		}

		const created = await userServices.create({
			email,
			password,
			strategy: 'local' // @TODO: Hard code for now
		});

		reply.send({ data: created });
	}

	return {
		get,
		getAll,
		postUser
	};
};

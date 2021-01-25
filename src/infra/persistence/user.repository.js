module.exports = function userRepository({ userModel }) {

	async function create(data) {
		return await userModel.query().insert(data);
	}

	async function findById(id) {
		return await userModel.query().findById(id);
	}

	async function findAll() {
		return await userModel.query();
	}

	async function findByEmail(email) {
		const users = await userModel.query().where('email', email);
		return users[0];
	}

	return {
		create,
		findById,
		findAll,
		findByEmail
	};
};

const bcrypt = require('bcrypt');

module.exports = function JwtStrategy({ userRepository }) {
	async function formatUser(data) {
		const user = await userRepository.findById(data.id);

		if (!user) {
			throw new Error('No user found');
		}

		return user;
	}

	async function authenticate(email, password) {
		const user = await userRepository.findByEmail(email);

		if (!user) {
			throw new Error('No user found');
		}

		const isValid = await bcrypt.compare(password, user.password);

		if (!isValid) {
			throw new Error('Authentication failed');
		}

		return user;
	}

	return {
		formatUser,
		authenticate
	};
};

module.exports = function configureUsers({ userRepository }) {
	function findById(id) {
		return userRepository.findById(id);
	}

	function findByEmail(email) {
		return userRepository.findByEmail(email);
	}

	function findAll() {
		return userRepository.findAll();
	}

	function create(data) {
		return userRepository.create(data);
	}

	return {
		findById,
		findByEmail,
		findAll,
		create
	};
};

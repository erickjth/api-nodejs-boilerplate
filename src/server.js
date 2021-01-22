const fastify = require('fastify');

exports.createApplication = function createApplication(container) {
	const application = fastify();
	return application;
};

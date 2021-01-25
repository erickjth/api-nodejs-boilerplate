const fastify = require('fastify');
const fp = require('fastify-plugin');

module.exports = async function createServer(container) {
	const application = fastify({ logger: true });

	await application.register(require('middie'));

	application.register(fp((instance, opts, done) => {
		instance.decorate('container', container);
		done();
	}));

	application.register(require('./api'), { prefix: '/v1' });

	const config = container.resolve('config');

	application.start = function () {
		const port = config.api.port;

		// Run and return the server!
		return application.listen(port);
	};

	return application;
};

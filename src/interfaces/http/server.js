const fastify = require('fastify');
const fp = require('fastify-plugin');

module.exports = async function createServer(container) {
	const config = container.resolve('config');

	const {
		api,
		logger: {
			enabled: loggerEnabled,
			...loggerOpts
		} } = config;

	const application = fastify({
		logger: loggerEnabled ? {
			level: 'info',
			...loggerOpts
		} : false
	});

	application.register(fp((instance, opts, done) => {
		instance.decorate('container', container);
		done();
	}));

	await application.register(require('middie'));

	application.use(require('cors')());

	application.register(require('./api'), { prefix: '/v1' });

	application.start = function () {
		const port = api.port;

		// Run and return the server!
		return application.listen(port);
	};

	return application;
};

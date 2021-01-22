require('dotenv-safe').config({
	allowEmptyValues: true
});

const container = require('./container');
const { createHttpServer } = require('./server');

async function start() {
	const server = await createHttpServer(container);

	const port = container.get('config').api.port;

	// Run the server!
	server.listen(port, function (err, address) {
		if (err) {
			server.log.error(err)
			process.exit(1)
		}
		server.log.info(`server listening on ${address}`)
	})

	process.on('unhandledRejection', (reason, p) =>
		server.log.error('Unhandled Rejection at: Promise ', p, reason)
	);

	server.on('listening', () =>
		server.log.info('Feathers application started on http://%s:%d', server.get('host'), port)
	);
}

start();




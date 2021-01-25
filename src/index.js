require('dotenv-safe').config({ allowEmptyValues: true });
const container = require('./container');
const createServer = require('./interfaces/http/server');

async function start() {
	const server = await createServer(container);

	server.addHook('onClose', (instance, done) => {
		container.dispose().then(done);
	});

	await server.start()
		.then((address) => server.log.info(`server listening on ${address}`))
		.catch(err => {
			if (err) {
				server.log.error(err);
				process.exit(1);
			}
		});

	process.on('unhandledRejection', (reason, p) =>
		console.error('Unhandled Rejection at: Promise ', p, reason)
	);
}

start();




const { createContainer, InjectionMode, asFunction, asValue, Lifetime } = require('awilix');
const config = require('../config');
const logger = require('./infra/logger');
const database = require('./infra/database');

const container = createContainer({
	injectionMode: InjectionMode.PROXY
});

container.register({
	config: asValue(config),
	logger: asFunction(logger).singleton(),
	database: asFunction(database).singleton(),
});

container.loadModules(
	[
		'./models/*.model.js',
		'./infra/persistence/*.repository.js',
		'./infra/auth/*.strategy.js',
		'./services/*.services.js',
		'./interfaces/http/controllers/**/*.controller.js',
	],
	{
		cwd: __dirname,
		formatName: (name) => {
			const [moduleName, namespace] = name.split('.');

			return moduleName +
				namespace.charAt(0).toUpperCase() +
				namespace.substring(1);
		},
		resolverOptions: { register: asFunction, lifetime: Lifetime.SINGLETON },
	},
);

module.exports = container;

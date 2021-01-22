const { createContainer, asValue } = require('awilix');
const config = require('../config');

const container = createContainer();

container.register({
	config: asValue(config),
});

module.exports = container;

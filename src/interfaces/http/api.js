const authPlugin = require('./auth');
const userRoutes = require('./controllers/user/user.routes');
const authRoutes = require('./controllers/auth/auth.routes');
const errorHandler = require('./errors/error-handler');

module.exports = async function (app, opts, done) {
	app.register(authPlugin);
	app.register(authRoutes);
	app.register(userRoutes);
	app.setErrorHandler(errorHandler);
};

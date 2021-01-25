const ApiError = require('./api-error');
const httpStatus = require('http-status');

module.exports = function errorHandler(incomingError, request, reply) {
	let error = incomingError;

	if (!incomingError.statusCode) {
		error = new ApiError(httpStatus.INTERNAL_SERVER_ERROR,
			process.env.NODE_ENV === 'production' ?
				'Internal Server Error' : incomingError.message
		);
	}

	request.log.error(error.message);

	// Send error response
	reply.status(error.statusCode).send({
		message: error.message,
		statusCode: error.statusCode
	});
};

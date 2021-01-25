exports.formatSqlDatetime = (date) => {
	if (!(date instanceof Date)) {
		throw new Error('Invalid Date');
	}

	return date.toISOString().slice(0, 19).replace('T', ' ');
};

const OktaJwtVerifier = require('@okta/jwt-verifier');

module.exports = function OktaStrategy({ config }) {
	const { issuer, clientId, audience } = config.auth.okta;

	const oktaJwtVerifier = new OktaJwtVerifier({
		issuer: issuer,
		clientId: clientId
	});

	async function verify(token) {
		if (!token) {
			throw new Error('Invalid token');
		}

		try {
			const { claims } = await oktaJwtVerifier.verifyAccessToken(token, audience);

			if (!claims || !claims.scp.includes('api')) {
				throw new Error('Authorized');
			}
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	return {
		verify
	};
};


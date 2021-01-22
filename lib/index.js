const request = require('request');
const jwt = require('jsonwebtoken');

const testUrl = 'https://test.salesforce.com/services/oauth2/token';
const prodUrl = 'https://login.salesforce.com/services/oauth2/token';
const testAudience = 'https://test.salesforce.com';
const prodAudience = 'https://login.salesforce.com';

module.exports.getToken = function (opts, cb) {
	const isTest = opts.isTest === true;
	const options = {
		issuer: opts.clientId,
		audience: opts.audience || isTest ? testAudience : prodAudience,
		expiresInMinutes: opts.expiresInMinutes || 3,
		algorithm: opts.algorithm || 'RS256'
	}

	const token = jwt.sign({ prn: opts.user }, opts.privateKey, options);

	const post = {
		uri: opts.uri || isTest ? testUrl : prodUrl,
		form: {
			'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
			'assertion':  token
		},
		method: 'post'
	}

	request(post, function(err, res, body) {
		if (err) {
			cb(err);
			return;
		};

		const reply = JsonTryParse(body);

		if (!reply) {
			cb(new Error('No response from oauth endpoint.'));
			return;
		};

		if (res.statusCode != 200) {
			const message = `Unable to authenticate: ${reply.error} (${reply.error_description})`;
			cb(new Error(message))
			return;
		};

		cb(null, reply);
	});
}

function JsonTryParse(string) {
	try {
		return JSON.parse(string);
	} catch (e) {
		return null;
	}
}
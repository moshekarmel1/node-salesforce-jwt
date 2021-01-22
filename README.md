Salesforce Auth 2.0 JWT Bearer Token Flow Implementation
=============
node-salesforce-jwt is an minimal implementation of the [OAuth 2.0 JWT Bearer Token Flow](https://help.salesforce.com/HTViewHelpDoc?id=remoteaccess_oauth_jwt_flow.htm&language=en_US) that allows you to impersonate users on SalesForce.

It is compatible with [jsforce](https://github.com/jsforce/jsforce).

## Installation

```bash
$ npm install node-salesforce-jwt
```

## Usage

```javascript

const nsj = require('node-salesforce-jwt');

const clientId = '3MVG9A2kN3Bn17hvVNDOE5FX8c9hS...30dgSSfyGi1FS09Zg'; // This is the connected app consumerKey
const privateKey = require('fs').readFileSync('./privateKey.key', 'utf8');
// pass in options
const options = {
  uri: 'https://test.salesforce.com/services/oauth2/token' // OAuth URL
  clientId: clientId, // SFDC `ConsumerKey` of Connected App
  privateKey: privateKey, // private key file as string
  user: 'user@toImpersonate.com' // UserName of API user
}

nsj.getToken(options, function(err, response) {
	// err
	// response.accessToken will contain the token to use on SalesForce API.
});

```

This is an example on how to use it with [jsforce](https://github.com/jsforce/jsforce).

```javascript
const jsforce = require('jsforce');
const nsj = require('salesforce-jwt');

const options = ...

nsj.getToken(options, function(err, response) {
	// err

	const sfConnection = new jsforce.Connection();

  sfConnection.initialize({
    instanceUrl: response.instanceUrl,
    accessToken: response.accessToken
  });

  sfConnection.query('Select Name from Account', function(err, results) {
    console.log(results);
  });

});
```

## License

MIT





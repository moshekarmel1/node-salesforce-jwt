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
  isTest: true, // is this a test instance?
  clientId: clientId, // SFDC `ConsumerKey` of Connected App
  privateKey: privateKey, // private key file as string
  user: 'user@toImpersonate.com' // UserName of API user
}

nsj.getToken(options, function(err, response) {
  // err
  // response.access_token will contain the token to use on SalesForce API.
});

```

This is an example on how to use it with [jsforce](https://github.com/jsforce/jsforce).

```javascript
const jsforce = require('jsforce');
const nsj = require('node-salesforce-jwt');

const options = ...

nsj.getToken(options, function(err, response) {
  if (err) {
    console.log(err);
    return;
  }
  const sfConnection = new jsforce.Connection();

  sfConnection.initialize({
    instanceUrl: response.instance_url,
    accessToken: response.access_token
  });

  sfConnection.query('SELECT Id, Name FROM Account', function(err, results) {
    console.log(results);
    console.log(`First record : ${result.records[0].Name} - ${result.records[0].Id}`);
  });

});
```

## License

MIT





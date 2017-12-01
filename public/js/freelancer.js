var request = require("request");

var options = { method: 'POST',
  url: 'https://www.freelancer-sandbox.com/api/projects/0.1/projects/',
  qs: { compact: '' },
  headers: 
   { 'postman-token': 'c60f8e43-6d1d-72bc-8971-dfdd3cbd3982',
     'cache-control': 'no-cache',
     'freelancer-oauth-v1': 'vOmqi4FNxRFBRK7bdTkCq7JRZDKRpo',
     'content-type': 'application/json' },
  body: 
   { title: 'Write trvel article',
     description: 'Help me write December article',
     currency: { code: 'AUD', id: 3, sign: '$' },
     budget: { minimum: 500 },
     jobs: [ { id: 2 }, { id: 174 } ] },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

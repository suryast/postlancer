/* global TrelloPowerUp */
var request = require("request-promise");

var options = { method: 'POST',
  url: 'https://www.freelancer-sandbox.com/api/projects/0.1/projects/',
  qs: { compact: '' },
  headers: 
   { 'postman-token': '1760e9d2-2006-8e1a-ed64-fc7f21cca502',
     'cache-control': 'no-cache',
     'freelancer-oauth-v1': 'vOmqi4FNxRFBRK7bdTkCq7JRZDKRpo',
     'content-type': 'application/json' },
  body: 
   { title: 'Write travel article',
     description: 'Help me write December article',
     currency: { code: 'AUD', id: 3, sign: '$' },
     budget: { minimum: 500 },
     jobs: [ { id: 2 }, { id: 174 } ] },
  json: true };

window.estimate.addEventListener('submit', function(event){
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
});
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://www.freelancer-sandbox.com/api/projects/0.1/projects/?compact=",
  "method": "POST",
  "headers": {
    "content-type": "application/json",
    "freelancer-oauth-v1": "vOmqi4FNxRFBRK7bdTkCq7JRZDKRpo",
    "cache-control": "no-cache",
    "postman-token": "beaca7d7-4bcd-2e6b-9e80-b570e9cd5af5"
  },
  "processData": false,
  "data": "{\n  \"title\": \"Write trvel article\",\n  \"description\": \"Help me write December article\",\n  \"currency\": {\n        \"code\": \"AUD\",\n        \"id\": 3,\n        \"sign\": \"$\"\n    },\n    \"budget\": {\n        \"minimum\": 500\n    },\n    \"jobs\": [\n        {\n          \"id\": 2\n        },\n        {\n          \"id\": 174\n        }\n    ]\n}"
}

window.estimate.addEventListener('submit', function(event){
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
});
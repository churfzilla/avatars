var request = require("request");

request("http://www.example.com", function(err, response, body) {
  if (err) {
    throw err;
  }

  console.log("Full HTML of Example:", body);

});
var AlchemyAPI = require('./models/alchemyapi');
var alchemyapi = new AlchemyAPI();
var fs=require("fs"); 

//read from file
module.exports = function(app) {

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {
		var node_xj = require("xls-to-json");
		node_xj({
			input: "sample.xls",  // input xls
			output: "output.json" // output json
			sheet: "sheetname",  // specific sheetname
		}, function(err, result) {
			if(err) {
			  console.error(err);
			} else {
			  console.log(result);
			}
		});

		// create a todo, information comes from AJAX request from Angular
		var output = {};
		var myText = req.body.text;
		console.log("Processing - " + myText);
		alchemyapi.sentiment('text', myText, {}, function(response) {
			output['sentiment'] = { html:myText, response:response, results:response['docSentiment'] };
		});
	});
	
}


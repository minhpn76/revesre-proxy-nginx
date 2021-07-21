const bodyParser = require('body-parser');
// Require packages and set the port
const express = require('express');
const port = 5002;
const app = express();

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.get('/', (request, response) => {
	const temperature_c  = request.query.temp ?? 23;

	const is_cold = temperature_c < 0
	const is_warm = temperature_c > 25 

	let precip_type = "rain"
	if (is_cold) {
		precip_type = "snow"
	}
	if (is_warm) {
		precip_type = "storms"
	}
	const percent_chance = Math.round((Math.random() * (1 - 0) + 0) * 100)
	response.send({
		'precip_chance': percent_chance,
		'type': precip_type
	});
});

// Start the server
const server = app.listen(port, (error) => {
	if (error) return console.log(`Error: ${error}`);

	console.log(`Server listening on port ${server.address().port}`);
});
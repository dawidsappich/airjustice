const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const PORT = 5000;

// Use native promises
mongoose.Promise = global.Promise;
// connect to mongodb
mongoose.connect(config.uri, { useMongoClient: true }, err => {
	if (err) {
		console.log(`Could not connect to mongodb: ${err}`)
	} else {
		console.log(`Connected to database: ${config.db}`);
	}
});

// setup folder for static content
app.use(express.static(__dirname + '/public/dist/'));

// Routing
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/dist/index.html'));
})


app.listen(PORT);
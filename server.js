const path = require('path');
const express = require('express');
const router = express.Router();
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');
const PORT = 5000;

const dataServiceRoute = require('./routes/dataService')(router);

// middleware for parsing incoming requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/dataService', dataServiceRoute);

/**
 * Mongooose Setup
 */
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
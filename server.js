const path = require('path');
const express = require('express');
const router = express.Router();
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');
const cors = require('cors');// ONLY FOR DEVELOPMENT
const PORT = 5000;
const PORT_DEV = 4200;
const dataServiceRoute = require('./routes/dataService')(router);

// ONLY FOR DEVELOPMENT
// allow CORS
app.use(cors({
	origin: `http://localhost:${PORT_DEV}`
}))
console.warn(`!!!!!! CORS is allowed for localhost:${PORT_DEV} REMOVE before deployment !!!!!!!!`);

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
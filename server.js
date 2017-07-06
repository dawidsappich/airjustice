const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = 5000;

app.get('/', (req, res) => {
	res.json({ success: true, message: 'Hello World from NodeJs' });
})

app.listen(PORT);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formFieldSchema = new Schema({
	type: String,
	list: String,
	values: [
		{
			value: String,
			order: Number,
			icon: String
		}
	]
	// use collection forms
}, { collection: 'forms' })

module.exports = mongoose.model('FormField', formFieldSchema);
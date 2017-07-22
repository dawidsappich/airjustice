const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordsSchema = new Schema({
	flightNr: { type: String, required: true, uppercase: true },
	flightDate: { type: Date, required: true },
	problemCase: { type: String, required: true },
	flightType: { type: String, required: true }
}, { collection: 'captures' })

module.exports = mongoose.model('Record', recordsSchema);
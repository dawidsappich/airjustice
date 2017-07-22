const Lookup = require('../models/lookup');
const FormField = require('../models/formField');
const API = require('../config/api');

/**
 * All incoming requests from frontend to the route '/dataService'
 * will be handled here
 */
module.exports = (router) => {

	/**
	 * Intercepts all incoming requets to this route to check if the API_KEY is set and valid
	 * Only authorized requests are valid and will be handled further
	 * down by the router configurations
	 */
	router.use((req, res, next) => {
		const token = req.headers['authorization'];
		if (token === API.API_KEY) {
			// ok, invoke next step
			next();
		} else if (!token) {
			res.json({ success: false, message: 'no api key provided' });
		} else if (token !== API.API_KEY) {
			res.json({ success: false, message: 'invalid api key provided' });
		}
	})

	/**
	 * configure the different routes
	 */

	/**
	 * Return one airport from mongodb
	 */
	router.get('/airport/:query', (req, res) => {
		// Find one airport
		if (!req.params.query) {
			res.json({ success: false, message: 'No query provided' });
		} else {
			const regex = new RegExp(req.params.query, 'i');
			Lookup.find({ $or: [{ code: { $regex: regex } }, { value: { $regex: regex } }] }, 'code value', (err, doc) => {
				if (err) {
					res.json({ success: false, message: err });
				} else {
					// found a document in collection
					if (doc) {
						res.json({ success: true, message: doc });
					} else {
						res.json({ success: true, message: 'no matching result' });
					}
				}
			})
				.limit(10)
				.sort({ value: 1 })
		}
	})

	/**
	 * Return one form descriptor from mongodb
	 */
	router.get('/forms/:query', (req, res) => {
		if (!req.params.query) {
			res.json({ success: false, message: 'No query provided' });
		} else {
			FormField.findOne({ list: req.params.query }, (err, formfield) => {
				if (err) {
					res.json({ success: false, message: err });
				} else {
					if (formfield) {
						res.json({ success: true, message: formfield });
					} else {
						res.json({ success: true, message: 'no matching result' });
					}
				}
			});
		}
	})

	return router;
}

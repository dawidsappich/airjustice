const Lookup = require('../models/lookup');
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
		console.log(req.headers);
		const apiKey = req.headers['apikey']
		if (apiKey === API.API_KEY) {
			// ok, invoke next step
			next();
		} else if (!apiKey) {
			res.json({ success: false, message: 'no api key provided' });
		} else if (apiKey !== API.API_KEY) {
			res.json({ success: false, message: 'invalid api key provided' });
		}
	})

	/**
	 * configure the different routes
	 */
	router.post('/airports', (req, res) => {
		// get all airports
		Lookup.find((err, airports) => {
			if (err) {
				res.json({ success: false, message: err });
			} else {
				res.json({ success: true, message: airports });
			}
		})
	});
	
	return router;
}

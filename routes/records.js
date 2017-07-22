const API = require('../config/api');
const Record = require('../models/record');


/**
 * All incoming requests from frontend to the route '/dataService'
 * will be handled here
 */
module.exports = (router) => {

	/**
	 * Persist form entiries form first input
	 */
	router.post('/record', (req, res) => {
		if (!req.body.flightNr) {
			res.json({ success: false, message: 'no flightNr provided' });
		} else if (!req.body.flightDate) {
			res.json({ success: false, message: 'no flightDate provided' });
		} else if (!req.body.problemCase) {
			res.json({ success: false, message: 'no problemCase provided' });
		} else if (!req.body.flightType) {
			res.json({ success: false, message: 'no flightType provided' });
		} else {
			// create model
			const record = new Record({
				flightNr: req.body.flightNr,
				flightDate: req.body.flightDate,
				problemCase: req.body.problemCase,
				flightType: req.body.flightType
			});

			record.save(err => {
				if (err) {
					if (err.errors) { // are there any error form validation via the schema
						if (err.errors.flightNr) {
							res.json({ success: false, message: 'no valid flightNr provided' });
						} else if (err.errors.flightDate) {
							res.json({ success: false, message: 'no valid flightDate provided' });
						} else if (err.errors.problemCase) {
							res.json({ success: false, message: 'no valid problemCase provided' });
						} else if (err.errors.flightType) {
							res.json({ success: false, message: 'no valid flightType provided' });
						}
					} else {
						// common error#
						res.json({ success: false, message: err });
					}
				} else {
					res.json({ success: true, message: 'record saved' });
				}

			})

		}
	})


	return router;
}

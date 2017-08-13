const API = require('../config/api');
const User = require('../models/user');

module.exports = router => {

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

	router.post('/register', (req, res) => {

		if (!req.body.email) {
			res.json({ success: false, message: 'no email provided' });
		} else if (!req.body.username) {
			res.json({ success: false, message: 'no username provided' });
		} else if (!req.body.password) {
			res.json({ success: false, message: 'no password provided' });
		} else {
			// create new user
			let user = new User({
				email: req.body.email.toLowerCase(),
				username: req.body.username.toLowerCase(),
				password: req.body.password
			});

			res.send('user saved');
			// save user to DB
			// user.save(err => {
			// 	if (err) {
			// 		res.json({ success: false, message: 'user could not save to DB', err });
			// 	} else {
			// 		res.json({ success: true, message: 'user saved to DB' });
			// 	}
			// })
		}


	})

	router.post('/login', (req, res) => {
		if (!req.body.username) {
			res.json({ success: false, message: 'no username provided' });
		} else if (!req.body.password) {
			res.json({ success: false, message: 'no password provided' });
		} else {
			User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
				if (err) {
					res.json({ success: false, message: err });
				} else {
					res.json({ success: true, message: user });
				}
			})
		}
	})

	return router;
}
const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
	db:'airjustice',
	secret: crypto,
	uri: 'mongodb://appUser:YX-3iWzUqWSV4fqZn9_adLeh0XCVQe@localhost/airjustice',
}
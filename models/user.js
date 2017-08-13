const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
	email: { type: String, required: true, unique: true, lowercase: true },
	username: { type: String, required: true, unique: true, lowercase: true },
	password: { type: String, required: true }
}, { collection: 'user' });

// middleware to encrypt password

userSchema.pre('save', function (next) {
	if (!this.isModified('password')) {
		return next();
	} else {
		bcrypt.hash(this.password, null, null, (err, hash) => {
			if (err) {
				return next(err);
			} else {
				this.password = hash;
				next();
			}
		})
	}
});

userSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
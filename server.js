const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost.nodeappdatabase', {
	useMongoClient: true
});

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	username: { type: String, required: true, unique: true },
	password: {type: String, required: true },
	admin: Boolean
});

const User = mongoose.model('User', userSchema);

userSchema.methods.manify = function(next) {
	this.name = this.name + '-boy';
	return next(null, this.name);
};

userSchema.pre('save', function(next) {
	const currentDate = new Date();

	this.updated_at = currentDate;

	if (!this.created_at) {
		this.created_at = currentDate;
	}
	next();
});

const kenny = new User({
	name: 'Kenny',
	username: 'Kenny_the_boy',
	password: 'password'
});

kenny.manify(function(err, name) {
	if (err) throw err;
	console.log('Twoje imię to: ' + name);
});

kenny.save(function(err) {
	if (err) throw err;
	console.log('Użytkownik zapisany pomyślnie');
});

const benny = new User({
    name: 'Benny',
    username: 'Benny_the_boy',
    password: 'password'
});

benny.manify(function(err, name) {
    if (err) throw err;
    console.log('Twoje nowe imię to: ' + name);
});

benny.save(function(err) {
    if (err) throw err;

    console.log('Uzytkownik ' + benny.name +  ' zapisany pomyslnie');
});

const mark = new User({
    name: 'Mark',
    username: 'Mark_the_boy',
    password: 'password'
});

mark.manify(function(err, name) {
    if (err) throw err;
    console.log('Twoje nowe imię to: ' + name);
});

mark.save(function(err) {
    if (err) throw err;

    console.log('Uzytkownik ' + mark.name +  ' zapisany pomyslnie');
});
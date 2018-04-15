const LocalStrategy = require('passport-local');
const User = require('../models/User');

module.exports = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
},
async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !user.checkPassword(password)) {
      return done(null, false, { message: 'User not found or missing password.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

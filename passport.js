const passport = require('koa-passport');
const LocalStrategy = require('./strategies/LocalStrategy');
const JwtStrategy = require('./strategies/JwtStrategy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);

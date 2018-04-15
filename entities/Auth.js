const jwt = require('jsonwebtoken');
const passport = require('koa-passport');
const _ = require('lodash');
const User = require('../models/User');

const jwtsecret = require('../jwtsecret').jwtsecret;

const login = async (ctx, next) => {
  await passport.authenticate('local', (err, user) => {
    if (!user) {
      ctx.body = { errors: { email: 'Login or password failed', password: 'Login or password failed' } };
      ctx.status = 400;
    } else {
      const payload = {
        id: user.id,
        email: user.email
      };
      const token = jwt.sign(payload, jwtsecret);

      ctx.body = { user: user, token: 'JWT ' + token };
    }
  })(ctx, next);
};

exports.login = login;

exports.createUser = async (ctx, next) => {
  try {
    const user = ctx.request.body;
    const auxiliaryValue = 9.99 * user.weight + 6.25 * user.growth - 4.92 * user.age;

    let baseMetabolism;
    if (user.gender === 'male') {
      baseMetabolism = auxiliaryValue + 5;
    } else {
      baseMetabolism = auxiliaryValue - 161;
    }

    let dailyMetabolism;
    if (user.physicalActivity === 'never') dailyMetabolism = baseMetabolism * 1.2;
    else if (user.physicalActivity === 'small') dailyMetabolism = baseMetabolism * 1.375;
    else if (user.physicalActivity === 'normal') dailyMetabolism = baseMetabolism * 1.4625;
    else if (user.physicalActivity === 'strong') dailyMetabolism = baseMetabolism * 1.6375;

    await User.create(_.extend(user, { baseMetabolism, dailyMetabolism }));
    await login(ctx, next);
  } catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
};

exports.loadUser = async (ctx, next) => {
  await passport.authenticate('jwt', (err, user) => {
    if (user) {
      ctx.body = user;
    } else {
      ctx.status = 404;
      console.log('err', err)
    }
  })(ctx, next);
};

const Food = require('../models/Food');

exports.getFoods = async (ctx, next) => {
  try {
    ctx.body = await Food.find({ short_desc: { $regex: `^(${ctx.query.term.toUpperCase()})` } });
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
  }
}

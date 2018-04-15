const _ = require('lodash');
const Ingestion = require('../models/Ingestion');

exports.addIngestion = async (ctx, next) => {
  try {
    const preparedFoods = ctx.request.body.foods.map((food) => {
      const totalFood = Object.assign({}, _.omit(food, '_id'));
      totalFood.total_kcal = food.energ_kcal * food.weight / 100;
      totalFood.total_protein = food.protein * food.weight / 100;
      totalFood.total_lipid = food.lipid * food.weight / 100;
      totalFood.total_carbohydrates = food.carbohydrates * food.weight / 100;
      return totalFood;
    });
    const total = preparedFoods.reduce((previousValue, currentValue) => ({
      total_kcal: previousValue.total_kcal + currentValue.total_kcal,
      total_protein: previousValue.total_protein + currentValue.total_protein,
      total_lipid: previousValue.total_lipid + currentValue.total_lipid,
      total_carbohydrates: previousValue.total_carbohydrates + currentValue.total_carbohydrates
    }));
    ctx.body = await Ingestion.create(_.extend(ctx.request.body, { foods: preparedFoods }, total));
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
  }
}

exports.getIngestion = async (ctx, next) => {
  try {
    ctx.body = await Ingestion.find(ctx.query);
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
  }
}

exports.deleteIngestion = async (ctx, next) => {
  try {
    ctx.body = await Ingestion.remove({ _id: ctx.params.id });
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
  }
}

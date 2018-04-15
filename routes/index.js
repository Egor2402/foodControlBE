const Router = require('koa-router');

const Auth = require('../entities/Auth');
const Food = require('../entities/Food');
const Ingestion = require('../entities/Ingestion');

const router = new Router();

router.post('/user', Auth.createUser);
router.post('/login', Auth.login);
router.get('/custom', Auth.loadUser);

router.get('/food', Food.getFoods);

router.get('/ingestion', Ingestion.getIngestion);
router.post('/ingestion', Ingestion.addIngestion);
router.del('/ingestion/:id', Ingestion.deleteIngestion);

module.exports = router;

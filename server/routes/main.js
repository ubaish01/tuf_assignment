const { insertData, getData } = require('../controllers/controller');
const { asyncError } = require('../error/error');

const router = require('express').Router();

router.post('/data', asyncError(insertData))
router.get('/data', asyncError(getData))

module.exports = router
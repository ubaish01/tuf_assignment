const { insertData, getData, getCode } = require('../controllers/controller');
const { asyncError } = require('../error/error');

const router = require('express').Router();

router.post('/data', asyncError(insertData))
router.get('/data', asyncError(getData));
router.get('/data/:id', asyncError(getCode));

module.exports = router
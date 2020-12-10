const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');

router.get('/', indexController.home);

router.get('/detail', indexController.detail);

router.get('/callback', indexController.callback);

router.post('/notifications', indexController.notifications);

router.post('/buy', indexController.buy);

module.exports = router;
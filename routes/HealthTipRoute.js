const express = require('express');
const router = express.Router();
const healthTipController = require('../controller/HealthTipsController.js');
const authenticateUser = require('../middlewares/AuthenticationMiddleware.js');

router.post('/create', healthTipController.create);
router.get('/find-by-id/:id', healthTipController.findById);
router.get('/find-all',authenticateUser, healthTipController.findAll);
router.delete('/delete-by-id/:id', healthTipController.deleteById);

module.exports = router;
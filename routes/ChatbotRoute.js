const express = require('express');
const { chatbotController } = require('../controller/ChatbotController.js');
const router = express.Router();

router.post('/post', chatbotController);

module.exports = router;

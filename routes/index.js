var express = require('express');
var router = express.Router();
const greetingService = require('../services/greetingService');

/* GET home page. */
router.get('/', function(req, res, next) {
  let greeting = greetingService.greet();
  res.json({
    title: 'Express',
    greeting
  });
});

module.exports = router;

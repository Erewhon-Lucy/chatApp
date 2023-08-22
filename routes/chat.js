var express = require('express');
const { render } = require('pug');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('chat');
});

module.exports = router;
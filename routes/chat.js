var express = require('express');
const { render } = require('pug');
var router = express.Router();

router.get('/chat', function(req, res, next) {
  res.render('chat');
});

module.exports = router;
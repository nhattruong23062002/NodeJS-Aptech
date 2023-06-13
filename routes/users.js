var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('this is get');
});
router.post('/', function(req, res, next) {
  res.send('this is post');
});

router.put('/', function(req, res, next) {
  res.send('this is put');
});

router.patch('/', function(req, res, next) {
  res.send('this is patch');
});


module.exports = router;

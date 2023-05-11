var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.end('App API reviews v5 welcom ');
});


router.use('/speciality', require('./routers-reviews-speciality-web'));


module.exports = router;
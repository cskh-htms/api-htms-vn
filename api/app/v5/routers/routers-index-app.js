var router = require('express').Router();


router.get('/', function(req, res, next) {
  res.end('App API v5 welcom ');
});


router.use('/reviews', require('./reviews/routers-reviews-app'));


module.exports = router;
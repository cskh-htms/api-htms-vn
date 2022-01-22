var router = require('express').Router();


router.get('/', function(req, res, next) {
  res.end('App API v5 welcom ');
});


router.use('/reviews', require('./reviews/routers-reviews-app'));
router.use('/discounts', require('./discounts/routers-discount-program-by-position-app'));
router.use('/categorys', require('./categorys/routers-category-app'));


module.exports = router;
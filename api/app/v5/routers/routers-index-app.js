var router = require('express').Router();


router.get('/', function(req, res, next) {
  res.end('App API v5 welcom ');
});


router.use('/reviews', require('./reviews/routers-reviews-app'));
router.use('/discounts', require('./discounts/routers-discount-program-by-position-app'));
router.use('/categorys', require('./categorys/routers-category-app'));
router.use('/products', require('./products/routers-product-app'));
router.use('/stores', require('./stores/routers-store-app'));
router.use('/orders', require('./orders/routers-order-app'));
router.use('/shipping-tracking', require('./shipping-tracking/routers-shipping-tracking-app'));


module.exports = router;
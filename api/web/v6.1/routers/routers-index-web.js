var router = require('express').Router();


router.get('/', function(req, res, next) {
  res.end('App API v5 welcom ');
});


router.use('/reviews', require('./reviews/routers-reviews-web'));
router.use('/discounts', require('./discounts/routers-discount-program-by-position-web'));
router.use('/categorys', require('./categorys/routers-category-web'));
router.use('/products', require('./products/routers-product-web'));
router.use('/stores', require('./stores/routers-store-web'));
router.use('/orders', require('./orders/routers-order-web'));
router.use('/shipping', require('./shippings/routers-shipping-web.js'));
router.use('/shipping-tracking', require('./shipping-tracking/routers-shipping-tracking-web'));
router.use('/coupons', require('./coupons/routers-coupon-web'));
router.use('/users', require('./users/routers-users-web'));
router.use('/news', require('./news/routers-news-web'));
router.use('/meta-adress', require('./meta-adress/routers-meta-adress-web.js'));
router.use('/trackings', require('./trackings/routers-tracking-web.js'));
module.exports = router;
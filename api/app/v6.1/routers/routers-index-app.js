var router = require('express').Router();


router.get('/', function(req, res, next) {
  res.end('App API dala  welcom ');
});








router.use('/users', require('./users/routers-users-app'));
router.use('/reviews', require('./reviews/routers-reviews-app'));
router.use('/discounts', require('./discounts/routers-discount-program-by-position-app'));
router.use('/categorys', require('./categorys/routers-category-app'));
router.use('/products', require('./products/routers-product-app'));
router.use('/stores', require('./stores/routers-store-app'));
router.use('/news', require('./news/routers-news-app'));
router.use('/orders', require('./orders/routers-order-app'));
router.use('/shipping-tracking', require('./shipping-tracking/routers-shipping-tracking-app'));
router.use('/coupons', require('./coupons/routers-coupon-app'));
router.use('/meta-adress', require('./meta-adress/routers-meta-adress-app'));
router.use('/shipping', require('./shippings/routers-shipping-app'));
router.use('/trackings', require('./trackings/routers-tracking-app'));
router.use('/traffics', require('./traffics/routers-traffic-app'));



module.exports = router;
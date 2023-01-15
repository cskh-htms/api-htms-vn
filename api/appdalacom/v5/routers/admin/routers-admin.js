
//@
//@
//@
//@ fields start




const express = require('express');
const router = require('express').Router();


router.get('/', function(req, res, next) {
  res.end('api v5 dmin  appdalacom welcom ! ');
});









router.use('/stores', require('./stores/router-admin-store.js'));
router.use('/users', require('./users/router-admin-user.js'));
router.use('/mains', require('./mains/router-admin-main.js'));
router.use('/brands', require('./brands/router-admin-brand.js'));
router.use('/discounts', require('./discounts/router-admin-discount.js'));
router.use('/coupons', require('./coupons/router-admin-coupon.js'));
router.use('/orders', require('./orders/router-admin-order.js'));
router.use('/products', require('./products/router-admin-product.js'));
router.use('/categorys', require('./categorys/router-admin-category.js'));
router.use('/options', require('./options/router-admin-option.js'));
router.use('/notes', require('./notes/router-admin-notes.js'));
router.use('/news', require('./news/router-admin-news.js'));
router.use('/shippings', require('./shippings/router-admin-shipping.js'));
router.use('/reviews', require('./reviews/router-admin-review.js'));
router.use('/shippers', require('./shippers/router-admin-shipper.js'));
router.use('/uploads', require('./uploads/router-admin-upload.js'));


//@
//@
//@
//@ export
module.exports = router;









//@
//@
//@
//@ fields end



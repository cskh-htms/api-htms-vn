
//@
//@
//@
//@ fields start




const express = require('express');
const router = require('express').Router();


router.get('/', function(req, res, next) {
  res.end('api v5 appdalacom welcom ! ');
});


router.use('/bussiness', require('./bussiness/routers-bussiness-appdalacom'));
router.use('/products', require('./products/routers-products-appdalacom'));
router.use('/discount-program', require('./discount-program/routers-discount-program-api-appdalacom'));

router.use('/reviews', require('./reviews/routers-reviews-appdalacom-api.js'));
router.use('/stores', require('./stores/routers-stores-appdalacom.js'));
router.use('/coupons', require('./coupons/routers-coupon-api-appdalacom.js'));
router.use('/notes', require('./notes/routers-notes-api-appdalacom.js'));
router.use('/orders', require('./orders/routers-orders-appdalacom.js'));
router.use('/bo-cong-thuong', require('./bo-cong-thuong/routers-bo-cong-thuong.js'));
router.use('/users', require('./users/routers-users.js'));
router.use('/admin', require('./admin/routers-admin.js'));
router.use('/categorys', require('./categorys/routers-category.js'));
router.use('/options', require('./options/routers-option.js'));








//@
//@
//@
//@ export
module.exports = router;









//@
//@
//@
//@ fields end



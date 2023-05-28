
//@
//@
//@
//@ fields start




const express = require('express');
const router = require('express').Router();


router.get('/', function(req, res, next) {
  res.end('api v5 welcom ! ');
});


router.use('/bussiness', require('./bussiness/routers-bussiness'));
router.use('/products', require('./products/routers-products'));
router.use('/discount-program', require('./discount-program/routers-discount-program'));

router.use('/reviews', require('./reviews/routers-reviews'));
router.use('/stores', require('./stores/routers-stores'));
router.use('/coupons', require('./coupons/routers-coupon'));
router.use('/notes', require('./notes/routers-notes'));
router.use('/orders', require('./orders/routers-orders'));
router.use('/bo-cong-thuong', require('./bo-cong-thuong/routers-bo-cong-thuong.js'));
router.use('/users', require('./users/routers-users.js'));
router.use('/admin', require('./admin/routers-admin.js'));
router.use('/categorys', require('./categorys/routers-category.js'));
router.use('/options', require('./options/routers-option.js'));
router.use('/brands', require('./brands/routers-brand.js'));
router.use('/uploads', require('./uploads/routers-upload.js'));
router.use('/users-tracking', require('./users-tracking/routers-user-tracking.js'));

router.use('/trackings', require('./trackings/routers-tracking'));
router.use('/traffics', require('./traffics/routers-traffic'));




//@
//@
//@
//@ export
module.exports = router;









//@
//@
//@
//@ fields end



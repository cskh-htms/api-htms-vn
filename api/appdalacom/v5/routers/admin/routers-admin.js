
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







//@
//@
//@
//@ export
module.exports = router;









//@
//@
//@
//@ fields end



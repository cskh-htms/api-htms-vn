

const express = require('express');
const router = require('express').Router();


router.get('/', function(req, res, next) {
  res.end('api v5 appdalacom welcom ! ');
});


router.use('/bussiness', require('./bussiness/routers-bussiness-appdalacom'));
router.use('/products', require('./products/routers-products-appdalacom'));

module.exports = router;
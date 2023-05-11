


//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();
const config_api = require('../../configs/config');


//@
//@
//@

router.get('/', function(req, res, next) {
  res.end('App API reviews v5 welcom ');
});


router.use('/speciality', require('./routers-reviews-speciality-app'));


module.exports = router;
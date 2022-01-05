var express = require('express');
var router = express.Router();




router.use('/speciality', require('./routers-coupon-speciality'));





module.exports = router;

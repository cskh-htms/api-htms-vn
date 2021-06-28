var express = require('express');
var router = express.Router();




router.use('/speciality', require('./routers-reviews-speciality'));
router.use('/store-speciality', require('./routers-reviews-store-speciality'));
//router.use('/food-drink', require('./routers-reviews-food-drink'));





module.exports = router;

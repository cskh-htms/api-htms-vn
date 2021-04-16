var express = require('express');
var router = express.Router();




router.use('/speciality', require('./routers-products-speciality'));
//router.use('/food-drink', require('./routers-products-food-drink'));





module.exports = router;

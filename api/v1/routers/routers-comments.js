var express = require('express');
var router = express.Router();




router.use('/speciality', require('./routers-comments-speciality'));
//router.use('/food-drink', require('./routers-comments-food-drink'));





module.exports = router;

var express = require('express');
var router = express.Router();




router.use('/speciality', require('./routers-orders-speciality'));


router.use('/speciality-detail', require('./routers-orders-speciality-detail'));


module.exports = router;


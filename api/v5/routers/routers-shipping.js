var express = require('express');
var router = express.Router();




router.use('/speciality', require('./routers-shipping-speciality'));



module.exports = router;

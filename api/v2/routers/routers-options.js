var express = require('express');
var router = express.Router();




router.use('/speciality', require('./routers-option-speciality'));

router.use('/speciality-link', require('./routers-option-speciality-link'));



module.exports = router;

var express = require('express');
var router = express.Router();




router.use('/speciality', require('./routers-session-speciality'));



module.exports = router;


var express = require('express');
var router = express.Router();




router.use('/general', require('./routers-news-general'));



module.exports = router;

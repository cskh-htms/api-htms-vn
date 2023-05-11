var express = require('express');
var router = express.Router();
const app_config = require('../../configs/config');




router.get('/', function(req, res, next) {
	res.render('index', { title : "DALA welcome !!" });
});





module.exports = router;

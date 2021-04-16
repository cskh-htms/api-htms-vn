var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');



//lay danh sach danh muc
router.get('/', function(req, res, next) {
	//
	let token = req.session.token;
	res.send("welCom !!!");
});

//lay danh sach danh muc
router.get('/add', function(req, res, next) {
	//
	let token = req.session.token;
	res.send("welCom !!! add");
});


	
module.exports = router;
	
	
	

	
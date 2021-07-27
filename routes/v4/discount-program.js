var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');



//lay danh sach danh muc
router.get('/', function(req, res, next) {
	//
	let token = req.session.token;
	let data_send = "a";
	
	res.render('/v4/discount-program/speciality/admin-show-all', data_send );
});


/*------------------------------------------------
		sản phẩm đặc sản
---------------------------------------------- */

router.use('/speciality', require('../../routes/' + ojs_configs.router_version  + '/discount-program-speciality'));
    

	
module.exports = router;
	
	
	
	
	
	
	







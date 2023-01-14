const express = require('express');
const router = express.Router();


const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');



//lay danh sach danh muc
router.get('/', function(req, res, next) {
	//
	let token = req.session.token;
	res.send("welCom !!!");
});


/*------------------------------------------------
		sản phẩm đặc sản
---------------------------------------------- */
router.use('/speciality', require('../../routes/' + ojs_configs.router_version  + '/coupon-speciality'));
    

	
module.exports = router;
	
	
	
	
	
	
	







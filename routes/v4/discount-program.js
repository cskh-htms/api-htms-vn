const express = require('express');
const router = express.Router();


const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');



//lay danh sach danh muc
router.get('/', function(req, res, next) {
	res.end("welcom");
	return;
});


/*------------------------------------------------
		sản phẩm đặc sản
---------------------------------------------- */

router.use('/speciality', require('../../routes/' + ojs_configs.router_version  + '/discount-program-speciality'));
    

	
module.exports = router;
	
	
	
	
	
	
	







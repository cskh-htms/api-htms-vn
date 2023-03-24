const express = require('express');
const router = express.Router();


const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');



//lay danh sach danh muc
router.get('/', function(req, res, next) {
	//
	let token = req.session.token;
	return res.send("welCom !!!");
});


/*------------------------------------------------
		sản phẩm đặc sản
---------------------------------------------- */
router.use('/speciality', require('../../routes/' + ojs_configs.router_version + '/products-speciality'));
	
    

/*------------------------------------------------
		sản phẩm ăn uống
---------------------------------------------- */
//router.use('/food-drink', require('../routes/products-food-drink'));
	
    
	
module.exports = router;
	
	
	
	
	
	
	


















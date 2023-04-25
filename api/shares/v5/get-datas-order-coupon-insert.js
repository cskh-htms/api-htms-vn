//@@
//@@
//@@
//@@
//@@
const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');

const ojs_shares_show_errors = 
require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');

const product_search = 
require('../../lib/' + config_api.API_LIB_VERSION + '/products/product-search.js');

const get_meta_product = 
require('../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-product-insert-order.js');



//@@
//@@
//@@
//@@
//@@
const function_export = async function(datas,user_id,res){
	
	
	//@
	//@
	//@ lấy thông tin và giá sản phẩm
	try{
		
		//@
		//@
		//@ lấy line product


		
		//@
		//@
		//@
		return user_id;
	}	
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi coupon_condition, Vui lòng liên hệ admin DALA" 
			);
		return res.send({ 
			"error" : "2",
			"position" : "api/shares/v5/get-data-order-coupon-insert",
			"message": error_send 
		}); 
						
	}



//@
//@
//@
//@
}//end of function	


module.exports = function_export;



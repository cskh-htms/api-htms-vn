
//const jwt = require('jsonwebtoken');
const ojs_configs = require('../../../../configs/config');
const config_api = require('../../../configs/config-api');
const ojs_shares_show_errors = 
	require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_all_api = 
	require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api.js');


const coupon_search_user_first_sale = 
	require('../../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search-user-first-sale.js');

//@@
//@@
//@@
//@@
//@@  [check qty]
const  function_export = async function(datas,value,user_id,res){
	try{
		var data_sum = 0;
		var data_return = 0;
		
		var user_first_sale_result = await coupon_search_user_first_sale(user_id,res);
		//return user_first_sale_result;
		
		
		if(user_first_sale_result.length > 0){
			return res.send({ 
				"error" : "3",
				"position" : "api/shares/v5/coupon-function/check-first-sale",
				"message": "Mã giàm giá không đủ điều kiện, Khách hàng này đã từng mua hàng rồi"
			}); 
		}else{
			data_return = 1
		}
		
		return data_return;
	}	
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check_first_sale, Vui lòng liên hệ admin DALA" 
			);
		return res.send({ 
			"error" : "4",
			"position" : "api/shares/v5/coupon-function/check-first-sale",
			"message": error_send 
		}); 
						
	}			
}	


//@
//@
//@
//@
//@ 
module.exports = function_export;


//@
//@
//@
//@
//@ end
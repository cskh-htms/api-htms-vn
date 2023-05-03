
//const jwt = require('jsonwebtoken');
const ojs_configs = require('../../../../configs/config');
const config_api = require('../../../configs/config-api');
const ojs_shares_show_errors = 
	require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_all_api = 
	require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api.js');


const coupon_search_limit_user = 
	require('../../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search-limit-user.js');

//@@
//@@
//@@
//@@
//@@  [check_limit_user]
const  function_export = async function(coupon_id,number,user_id,res){	
	//return res.send([coupon_id,number,user_id]);
	try{
		var data_sum = 0;
		var data_return = 0;
		if(number <= 0){
			data_return = 1;
		}else{
			var limit_user_result = await coupon_search_limit_user(coupon_id,user_id,res);
			//return res.send({ 
				//"error" : "0000",
				//"position" : "api/shares/v5/coupon-function/check-limit user",
				//"message": limit_user_result
			//});			
			
			if(limit_user_result.length > 0){
				if( limit_user_result.length  < number){
					data_return = 0;
				}else{
					data_return = 1;
					return res.send({ 
						"error" : "1",
						"position" : "api/shares/v5/coupon-function/check-limit user",
						"message": "Số lượng dùng của user này đã hết, Tối da chỉ dùng được [ " + number + " ] mã" 
					});
				}
			}
		}
		return limit_user_result;
	}	
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check_limit_user, Vui lòng liên hệ admin DALA" 
			);
		return res.send({ 
			"error" : "2",
			"position" : "api/shares/v5/coupon-function/check-limit user",
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
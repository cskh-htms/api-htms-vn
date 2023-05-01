
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
const  function_export = async function(limit_data,coupon_id,number,user_id,res){	
	//return res.send([limit_data,coupon_id,number,user_id]);
	try{
		var data_sum = 0;
		var data_return = 0;
		if(limit_data <= 0){
			data_return = 1;
		}else{
			var limit_user_result = await coupon_search_limit_user(coupon_id,user_id,res);
			//return res.send([limit_user_result]);
			
			if(limit_user_result.length > 0){
				if(parseInt(limit_user_result[0].user_sum) < number){
					data_return = 1;
				}
			}
		}
		return data_return;
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
			"error" : "1",
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

//const jwt = require('jsonwebtoken');
const config_api = require('../configs/config');



const ojs_shares_show_errors = 
	require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_all_api = 
	require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api.js');


const coupon_search_limit_number = 
	require('../../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search-limit-number.js');

//@@
//@@
//@@
//@@
//@@  [check_limit_number]
const function_export = async function(coupon_id,number,res){
	
	//return res.send([coupon_id,number]); 
	try{
		var data_sum = 0;
		var data_return = {};

		if(number <= 0){
			data_return.error = "";
		}else{	
			var limit_number_result = await coupon_search_limit_number(coupon_id,res);
			//return res.send({ 
				//"error" : "00000",
				//"position" : "api/shares/v5/coupon-function/checked-limit-number",
				//"message": limit_number_result
			//}); 
			
			
			if(limit_number_result.length > 0){
				if(limit_number_result.length  <  number){
					data_return.error = ""
				}else{
					data_return.error = "01";
					return res.send({ 
						"error" : "5",
						"position" : "api/shares/v5/coupon-function/checked-limit-number",
						"message": "Số lượng đã hết, Tối da chỉ dùng được [ " + number + " ] mã" 
					}); 
				}
			}	
		}
		
		return limit_number_result;
	}	
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check_limit_number, Vui lòng liên hệ admin DALA" 
			);
		return res.send({ 
			"error" : "5",
			"position" : "api/shares/v5/coupon-function/checked-limit-number",
			"message": error_send 
		}); 
		return;				
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
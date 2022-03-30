
//const jwt = require('jsonwebtoken');
const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const ojs_shares_show_errors = require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const coupon_search_limit_user = require('../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search-limit-user.js');
const coupon_search_limit_number = require('../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search-limit-number.js');
const coupon_search_user_first_sale = require('../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search-user-first-sale.js');



//@@
//@@[coupon_condition]
const coupon_condition = async function(datas,coupon_list,user_id,res){
	//return datas;
	try{
		var date_return = {};	
		//@
		if(coupon_list[0].coupon_speciality_condition == 0){
			//return datas;
			//@store check
			if(datas.store_id == coupon_list[0].stores_ID){
				date_return.store_check = 1;
			}else{
				date_return.store_check = 0;
			}
			
			//@limit number
			let coupon_limit_result =  await check_limit_number(
				coupon_list[0].coupon_speciality_ID,
				coupon_list[0].coupon_speciality_limit_number,
				res
			);
	
			if(coupon_limit_result.error == ""){
				date_return.coupon_limit = "ok";
			}else{
				date_return.coupon_limit = coupon_limit_result.message;
			}


		}	
		
		return date_return;
	}	
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi coupon_condition, Vui lòng liên hệ admin DALA" 
			);
		res.send({ 
			"error" : "1",
			"position" : "api/shares/v5/checked-coupon-condition-code",
			"message": error_send 
		}); 
		return;				
	}		
}	


//@@
//@@  [check_limit_number]
const check_limit_number = async function(coupon_id,number,res){
	
	
	try{
		var data_sum = 0;
		var data_return = {};

		if(number <= 0){
			data_return.error = "";
		}else{	
			var limit_number_result = await coupon_search_limit_number(coupon_id,res);
			//return limit_number_result;
			
			if(limit_number_result.length > 0){
				if(parseInt(limit_number_result[0].coupons_sum) < number){
					data_return.error = ""
				}else{
					data_return.error = "01",
					data_return.message = "Số lượng đã hết, Tối da chỉ dùng được [ " + number + " ] mã";
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
				"Lỗi check_limit_number, Vui lòng liên hệ admin DALA" 
			);
		res.send({ 
			"error" : "5",
			"position" : "api/shares/v5/checked-coupon-condition",
			"message": error_send 
		}); 
		return;				
	}			
}	



/* --------------------------------------
shares
----------------------------------------*/




module.exports = {
	coupon_condition
}



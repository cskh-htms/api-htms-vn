//@
//@
//@ require
const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const ojs_shares_show_errors = 
	require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_all_api = 
	require('../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api.js');





//@
//@
//@ coupon function
const check_limit_number = 
	require('../../shares/' + config_api.API_SHARES_VERSION + '/coupon-function/check-limit-number.js');
const check_limit_user = 
	require('../../shares/' + config_api.API_SHARES_VERSION + '/coupon-function/check-limit-user.js');

const check_price_percen = 
	require('../../shares/' + config_api.API_SHARES_VERSION + '/coupon-function/check-price-percen.js');

const check_first_buy = 
	require('../../shares/' + config_api.API_SHARES_VERSION + '/coupon-function/check-first-buy.js');

const get_price_coupon_caution = 
	require('../../shares/' + config_api.API_SHARES_VERSION + '/coupon-function/get-price-coupon-caution.js');
	
	
	
	
	
//@@
//@@
//@@
//@@
//@@function export
const function_export = async function(datas,coupon_list,user_id,res){	

	//@
	//@
	//@
	//@
	//@ kiem tra neu coupon het han thì thong báo
	if(coupon_list[0].check_expired_coupon != 1){
		return res.send({ 
			"error" : "1",
			"position" : "api/shares/v5/checked-coupon-condition-code",
			"message": "Mã coupon đã hêt hạn" 
		}); 
	}		
	
	


	//@
	//@
	//@
	//@
	//@ kiểm tra limit number ( số lượng coupon đã hết )
	var coupon_limit_result =  await check_limit_number(
		coupon_list[0].coupon_speciality_ID,
		coupon_list[0].coupon_speciality_limit_number,
		res
	);
	

	
	
	
	//@
	//@
	//@
	//@
	//@ kiểm tra limit user
	var user_limit_result =  await check_limit_user(
		coupon_list[0].coupon_speciality_ID,
		coupon_list[0].coupon_speciality_limit_user,
		user_id,
		res
	);	
	



	//@
	//@
	//@
	//@
	//@ kiểm tra coupon có đủ điền kiện áp dụng hay không
	var check = 0;
	if(coupon_list[0].coupon_speciality_condition == 0){
		//return datas;
		check = "1";
	//@
	//@
	//@ tổng tiền lớn hơn 
	}else if(coupon_list[0].coupon_speciality_condition == 1){		
		check =  await check_price_percen(datas,coupon_list[0].coupon_speciality_condition_value,res);
		
	//@
	//@
	//@ tổng số lượng lớn hơn 		
	}else if(coupon_list[0].coupon_speciality_condition == 2){	
		check =  await check_qty(datas,coupon_list[0].coupon_speciality_condition_value,res);
		
	//@
	//@
	//@ mua hàng lần đầu
	}else if(coupon_list[0].coupon_speciality_condition == 3){	
		check =  await check_first_buy(datas,coupon_list[0].coupon_speciality_condition_value,user_id,res);		
		
	}else{
		return res.send({ 
			"error" : "7",
			"position" : "api/shares/v5/checked-coupon-condition-code",
			"message": "Lỗi, Không tìm thấy điều kiện app dụng coupon, chúng tôi không thể so sánh điều kiện áp dụng"
		});
	}	
	
	if(check != 1){
		return res.send({ 
			"error" : "8",
			"position" : "api/shares/v5/checked-coupon-condition-code-master-insert-order",
			"message": "Lỗi, Mã coupon không thể áp dụng do khong đủ điều kiện"
		});
	}		
	


	return check;


	//@
	//@
	//@
	//@
	//@@[caution_price]
	//const get_price_coupon_caution_result = await get_price_coupon_caution(datas,coupon_list,res);
	//return get_price_coupon_caution_result;
	
//@
//@	
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
//@
//@
//@ require
const config_api = require('./configs/config');


const ojs_shares_show_errors = 
	require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_all_api = 
	require('../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api.js');



//@
//@
//@ model
const coupon_search = 
	require('../../lib/' + config_api.API_LIB_VERSION + 
	'/coupons/coupon-search.js');


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
const function_export = async function(datas,coupon_code,store_id,user_id,res){	

	//return datas;	
	//@
	//@
	//@ lấy data coupon
	try{	
		var datas_coupon = 
		{
			"select_field" :
			[ 
				"coupon_speciality_ID",
				"coupon_speciality_code",
				"coupon_speciality_featured_image",
				"coupon_speciality_stores_id_created",
				"coupon_speciality_info",
				"coupon_speciality_type",
				"coupon_speciality_formula_price",
				"coupon_speciality_formula_price_value",
				"coupon_speciality_condition",
				"coupon_speciality_condition_value",
				"coupon_speciality_price_max",
				"coupon_speciality_date_star",
				"coupon_speciality_date_end",
				"coupon_speciality_multiple",
				"coupon_speciality_show_hide",
				"coupon_speciality_status_admin",
				"coupon_speciality_limit_user",
				"coupon_speciality_limit_number",
				"coupon_speciality_qoute",
				"stores_ID",
				"stores_name",
				"check_expired_coupon"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
						{   
							"field"     :"coupon_speciality_code",
							"value"     : coupon_code,
							"compare" : "="
						}		
					]    
				}         
			],
		}
		//return datas;		
		
		var coupon_list = await coupon_search(datas_coupon,res);	
		//return res.send(coupon_list);
	
		if(coupon_list.length <= 0){
			return res.send({ 
				"error" : "1",
				"position" : "api/shares/v5/checked-coupon-condition-code-store-insert-order",
				"message": "Mã coupon không có trên hệ thống DALA" 
			}); 							
		}	
	}	
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi coupon_condition, Vui lòng liên hệ admin DALA" 
			);
		return res.send({ 
			"error" : "2",
			"position" : "api/shares/v5/checked-coupon-condition-code-store-insert-order",
			"message": error_send 
		}); 
	}	
	
	
	
	
	
	//@
	//@
	//@
	//@
	//@ kiem tra neu coupon het han thì thong báo
	if(coupon_list[0].check_expired_coupon != 1){
		return res.send({ 
			"error" : "0003",
			"position" : "api/shares/v5/checked-coupon-condition-code-store-insert-order",
			"message": "Mã coupon đã hêt hạn" 
		}); 
	}		
	
	
	
	
	//@
	//@
	//@
	//@
	//@ kiem tra neu coupon ko thuoc cua hàng thì báo lỗi
	if(store_id != coupon_list[0].stores_ID){
		return res.send({ 
			"error" : "3",
			"position" : "api/shares/v5/checked-coupon-condition-code-store-insert-order",
			"message": "Mã coupon không do cửa hàng tạo ra" 
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
			"position" : "api/shares/v5/checked-coupon-condition-code-store-insert-order",
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
	





	//@
	//@
	//@
	//@
	//@@[caution_price]
	const get_price_coupon_caution_result = await get_price_coupon_caution(datas,coupon_list,res);
	return get_price_coupon_caution_result;
	
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
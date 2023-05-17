const express = require('express');
const router = express.Router();




const config_api = require('../../configs/config');




const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_order_customer = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-order-customer.js');

const product_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search.js');
const coupon_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search.js');
const check_coupon_condition = require('../../../../shares/' + config_api.API_LIB_VERSION + '/check-coupon-condition');

//@
async  function function_export(req, res, next) {
	return res.send("Api đã ngưng hoạt động, Chuyển qua dùng api check-cupon-code");
	try {
		var token = req.headers['token'];
		var datas = req.body.datas;
		var user_id = req.body.user_id;	
		var store_id = 17;		
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3", 
			"position" : "api/app/v5/coupons/checked-coupon-dala",
			"message": error_send 
		}); 
			
	}

	//return res.send([datas,user_id,store_id]);
	//





	//@
	//@
	//@ lấy danh sách coupon con hạn theo cửa hàng
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
				"stores_name"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
						{   
							"field"     :"check_expired_coupon",
							"value"     : 1,
							"compare" : "="
						},
						{   
							"field"     :"coupon_speciality_stores_id_created",
							"value"     : store_id,
							"compare" : "="
						},
						{   
							"field"     :"coupon_speciality_status_admin",
							"value"     : 4,
							"compare" : "="
						},
						{   
							"field"     :"coupon_speciality_show_hide",
							"value"     : 1,
							"compare" : "="
						},
						{   
							"field"     :"coupon_speciality_type",
							"value"     : 1,
							"compare" : "="
						},						
					]    
				}         
			],
		}
		//return datas;		
		
		var coupon_list_result = await coupon_search(datas_coupon,res);		
		//return res.send(coupon_list_result);
		//
			
		var coupon_list = coupon_list_result;			

	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get coupon, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "444",
			"position" : "api/app/v5/coupons/checked-coupon-dala",
			"message": error_send 
		}); 
						
	}





		//@
		//@
		//@
		//@
		//@ check điều kiện áp dụng
	try{	
	
		var coupon_ok = [];
		for( var  x in coupon_list ) { 
			var datas_check = {
				datas : datas,				
				coupon_id : coupon_list[x].coupon_speciality_ID,
				condition : coupon_list[x].coupon_speciality_condition,
				value : coupon_list[x].coupon_speciality_condition_value,
				user_limit : coupon_list[x].coupon_speciality_limit_user,
				limit_number : coupon_list[x].coupon_speciality_limit_number,
				show_hide : coupon_list[x].coupon_speciality_show_hide,
				user_id : user_id,
				formula : coupon_list[x].coupon_speciality_formula_price,
				price : coupon_list[x].coupon_speciality_formula_price_value,
				price_max : coupon_list[x].coupon_speciality_price_max				
			}

			var check_condition = await check_coupon_condition.coupon_condition(datas_check,res);
	
			//coupon_ok.push(check_condition);

			//@ tính tiền giảm giá
			if(check_condition > 0){
				var caution_price = await check_coupon_condition.caution_price(datas_check);
				
				let line_data = {
					"coupon_speciality_ID": coupon_list[x].coupon_speciality_ID,
					"coupon_speciality_code": coupon_list[x].coupon_speciality_code,
					"coupon_price_caution": caution_price,
					"store_id":store_id,
					"store_name":"DALA",
					"coupon_speciality_multiple":coupon_list[x].coupon_speciality_multiple,
					"coupon_speciality_limit_number":coupon_list[x].coupon_speciality_limit_number,
					"coupon_speciality_limit_user":coupon_list[x].coupon_speciality_limit_user,
					"coupon_speciality_formula_price":coupon_list[x].coupon_speciality_formula_price
				}
				coupon_ok.push(line_data);
			}
			
		}//end of for
		
		return res.send({"error":"","datas":coupon_ok});
			

	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get condition, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "414",
			"position" : "api/app/v5/coupons/checked-coupon-dala",
			"message": error_send 
		}); 
						
	}




	//@
	return res.send({"error":"","datas":coupon_search_result});
	
}

module.exports = function_export;
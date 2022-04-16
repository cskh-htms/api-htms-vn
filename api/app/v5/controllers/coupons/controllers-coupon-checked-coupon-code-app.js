const express = require('express');
const router = express.Router();


const ojs_configs = require('../../../../../configs/config');


const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_order_customer = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-order-customer.js');

const product_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search.js');
const coupon_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search.js');
const check_coupon_condition_code = require('../../../../shares/' + config_api.API_LIB_VERSION + '/check-coupon-condition-code');
const check_coupon_condition_code_all = require('../../../../shares/' + config_api.API_LIB_VERSION + '/check-coupon-condition-code-all');
//@
async  function function_export(req, res, next) {

	try {
		var token = req.headers['token'];
		var datas = req.body.datas;
		var user_id = req.body.user_id;	
		var coupon_code = req.body.coupon_code;
		var coupon_selected_by_store = req.body.coupon_selected_by_store;
		var coupon_selected_by_dala = req.body.coupon_selected_by_dala;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request , Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "3", 
			"position" : "api/app/v5/coupons/checked-coupon-code",
			"message": error_send 
		}); 
		return;	
	}

	//res.send([datas,user_id,coupon_code,coupon_selected]);
	//return;



	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);
	if(
	check_role_result == "default" 
	|| 
	check_role_result == "customer" 
	){
		//go
	}
	else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				check_role_result, 
				"Lỗi phân quyền, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "4",
			"position" : "api/app/v5/coupons/checked-coupon-code",
			"message": error_send 
		}); 
		return;			
	}
	
	
	//res.send(check_role_result);
	//return;	







	//@
	//@
	//@ lấy thong tin coupon
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
		
		var coupon_list_result = await coupon_search(datas_coupon,res);		

		if(coupon_list_result.length > 0){
			var coupon_list = coupon_list_result;
			if(coupon_list_result[0].check_expired_coupon == "0"){
				res.send({ 
					"error" : "100",
					"position" : "api/app/v5/coupons/checked-coupon-code",
					"message": "Mã code đã hết hạn" 
				}); 
				return;	
			}			
		}else{
			res.send({ 
				"error" : "021",
				"position" : "api/app/v5/coupons/checked-coupon-code",
				"message": "Mã coupon không có trên hệ thống DALA" 
			}); 
			return;				
		}
		//res.send(coupon_list);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get coupon, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "444",
			"position" : "api/app/v5/coupons/checked-coupon-code",
			"message": error_send 
		}); 
		return;				
	}



	//@
	//@
	//@
	//@
	//@ check điều kiện áp dụng
	try{	
		var check_resuilt = {};
		//@
		//@
		if(coupon_list_result[0].coupon_speciality_type == "0"){
			
			//res.send(["code"]);
			//return;			
			
			var check_resuilt_store = 0;
			for( var  x in datas ) { 
				var check_condition = await check_coupon_condition_code.coupon_condition(datas[x],coupon_list,user_id,res);		
				//res.send([check_condition]);
				//return;
				if(
				check_condition.store_check == 1
				&& check_condition.coupon_limit == 1 
				&& check_condition.user_limit == 1 
				&& check_condition.check == 1 
				){
					
					var caution_price = await check_coupon_condition_code.caution_price(datas[x].line_order,coupon_list,res);	
					//res.send([caution_price]);
					//return;						
					
					let data_push = {
							"coupon_speciality_ID": coupon_list_result[0].coupon_speciality_ID,
							"coupon_speciality_code": coupon_list_result[0].coupon_speciality_code,
							"coupon_price_caution": caution_price,
							"coupon_speciality_multiple":coupon_list_result[0].coupon_speciality_multiple,
							"store_id":coupon_list_result[0].stores_ID,
							"store_name":coupon_list_result[0].stores_name,
							"dung_chung":coupon_list_result[0].coupon_speciality_type
						}  

					coupon_selected_by_store.push(data_push);
					check_resuilt.coupon_selected_store = coupon_selected_by_store;
					check_resuilt.coupon_selected_dala = coupon_selected_by_dala;
					check_resuilt.coupon_new = data_push;
	
					res.send({"error":"","datas":check_resuilt});
					return;		

					
				}
				
			}//end of for	
		
			res.send({ 
				"error" : "1021",
				"position" : "api/app/v5/coupons/checked-coupon-code",
				"message": "Mã giảm giá không đủ điều kiện áp dụng với đơn hàng của bạn"
			}); 
		}
		
		
		//@
		//@
		if(coupon_list_result[0].coupon_speciality_type == "1"){
			//res.send(["code-all"]);
			//return;
			var check_all = await check_coupon_condition_code_all.coupon_condition(datas,coupon_list,user_id,res);	
			var caution_price = await check_coupon_condition_code_all.caution_price(datas,coupon_list,res);

			//res.send([caution_price]);
			//return;

			
			let data_push = {
					"coupon_speciality_ID": coupon_list_result[0].coupon_speciality_ID,
					"coupon_speciality_code": coupon_list_result[0].coupon_speciality_code,
					"coupon_price_caution": caution_price,
					"coupon_speciality_multiple":coupon_list_result[0].coupon_speciality_multiple,
					"store_id":17,
					"store_name":"DALA",
					"dung_chung":coupon_list_result[0].coupon_speciality_type
				}  

			coupon_selected_by_dala.push(data_push);
			check_resuilt.coupon_selected_store = coupon_selected_by_store;
			check_resuilt.coupon_selected_dala = coupon_selected_by_dala;
			check_resuilt.coupon_new = data_push;
		}		


		res.send({"error":"","datas":check_resuilt});
		return;			


	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get condition, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "241",
			"position" : "api/app/v5/coupons/checked-coupon-code",
			"message": error_send 
		}); 
		return;				
	}

	//@
	res.send({"error":"","datas":coupon_search_result});
	return;
}

module.exports = function_export;
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
const check_coupon_condition = require('../../../../shares/' + config_api.API_LIB_VERSION + '/check-coupon-condition');

//@
async  function function_export(req, res, next) {

	try {
		var token = req.headers['token'];
		var datas = req.body.datas;
		var user_id = req.body.user_id;		
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
			"position" : "api/app/v5/coupons/checked-coupon",
			"message": error_send 
		}); 
		return;	
	}

	//res.send([datas]);
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
			"position" : "api/app/v5/coupons/checked-coupon",
			"message": error_send 
		}); 
		return;			
	}
	
	
	//res.send(check_role_result);
	//return;	






	//@
	//@ 
	//@ nếu có data
	if(datas.length > 0){
		var product_id = 0;
		for(let x  in datas){
			if(datas[x].orders_details_speciality_line_order == "product"){
				product_id = datas[x].orders_details_speciality_product_id
			}		
		}
			
		if(product_id == 0){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					"Không tìm thấy sản phẩm đã mua", 
					"Không tìm thấy sản phẩm đã mua" 
				);
			res.send({ 
				"error" : "44",
				"position" : "api/app/v5/coupons/checked-coupon",
				"message": error_send 
			}); 
			return;	
		}

		//@
		//@
		//@ lấy id cửa hàng của đơn hàng
		try{
			var datas_store = 
			{
				"select_field" :
				[ 
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
								"field"     :"products_speciality_ID",
								"value"     : product_id,
								"compare" : "="
							}
						]    
					}         
				] 
			}
			//return datas;		
			
			var get_store_result = await product_search(datas_store,res);		
			//res.send(get_store_result);
			//return;
				
				
			if(get_store_result.length > 0){
				var store_id = get_store_result[0].stores_ID;
				var store_name = get_store_result[0].stores_name;
			}			
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					error, 
					"Lỗi get_store, Vui lòng liên hệ admin" 
				);
			res.send({ 
				"error" : "444",
				"position" : "api/app/v5/coupons/checked-coupon",
				"message": error_send 
			}); 
			return;				
		}
	}

	//res.send([store_id ,store_name]);
	//return;





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
					]    
				}         
			],
		}
		//return datas;		
		
		var coupon_list_result = await coupon_search(datas_coupon,res);		
		//res.send(coupon_list_result);
		//return;
			
		var coupon_list = coupon_list_result;			

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
			"position" : "api/app/v5/coupons/checked-coupon",
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
					"store_name":store_name,
					"coupon_speciality_multiple":coupon_list[x].coupon_speciality_multiple,
					"coupon_speciality_limit_number":coupon_list[x].coupon_speciality_limit_number,
					"coupon_speciality_limit_user":coupon_list[x].coupon_speciality_limit_user
				}
				coupon_ok.push(line_data);
			}

		}//end of for
		
		res.send(coupon_ok);
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
			"error" : "414",
			"position" : "api/app/v5/coupons/checked-coupon",
			"message": error_send 
		}); 
		return;				
	}




	//@
	res.send({"error":"","datas":coupon_search_result});
	return;
}

module.exports = function_export;
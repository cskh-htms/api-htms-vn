


//@
//@
//@
//@ file start



const express = require('express');
const router = express.Router();



const config_api = require('../../configs/config');




const ojs_shares_show_errors = 
	require('../../../../shares/' + 
		config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = 
	require('../../../../shares/' + 
		config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_date = 
	require('../../../../shares/' + 
		config_api.API_SHARES_VERSION + '/ojs-shares-date.js');


const check_role = 
	require('../../../../shares/' + 
		config_api.API_SHARES_VERSION + '/check-role');
const check_owner_user = 
	require('../../../../shares/' + 
		config_api.API_SHARES_VERSION + '/check-owner-user');


const store_search = 
	require('../../../../lib/' + 
		config_api.API_LIB_VERSION + '/stores/store-search');
const order_search = 
	require('../../../../lib/' + 
		config_api.API_LIB_VERSION + '/orders/orders-search.js');











//@
//@
//@
//@ function
async  function function_export(req, res, next) {
	
	
	//@ lấy req data
	try {

		var token = req.headers['token'];
		var user_id = 0;
		if(req.query.c1){
			user_id = req.query.c1;
		}else{
			return res.send({ 
				"error" : "01", 
				"position" : "api->controller->appdalacom->bussiness->show-all",
				"message": "vui lòng nhập id"
			}); 	
			
		}			
		
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api->controller->appdalacom->bussiness->show-all",
			"message": error_send 
		}); 
			
	}	
	//return res.send([user_id]);
	//
	
	
	
	
	
	
	
	
	
	
	
	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);
	if(
	check_role_result == "bussiness" 
	|| check_role_result == "admin" 
	){
		//go
	}
	else{
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				check_role_result, 
				"Lỗi phân quyền, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3",
			"position" : "api->controller->appdalacom->bussiness->show-all", 
			"message": error_send 
		}); 
					
	}


	
	//@ check owner user id
	const check_owner_user_resuilt = await check_owner_user.check_owner_user(token,user_id,res);
	if(	
	check_owner_user_resuilt == "1" 
	|| check_role_result == "admin" 
	){
		//go
	}
	else{
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				check_role_result, 
				"Lỗi phân quyền, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "333",
			"position" : "api->controller->appdalacom->bussiness->show-all", 
			"message": error_send 
		}); 
					
	}	


	/////////////////////
	////////////////////
	try{	
		var promise_all = [];
		promise_all.push(0);




		//@
		//@
		//@lấy order list
		var data_order_list =    
		{
		   "select_field" :
			[
				"orders_speciality_ID",
				"orders_speciality_master_adress",
				"orders_speciality_date_orders" ,
				"orders_speciality_master_notes",
				"orders_speciality_status_orders",
				"orders_speciality_status_payment",
				"orders_speciality_master_name",
				"orders_speciality_master_province",
				"orders_speciality_master_district",
				"orders_speciality_master_wards",
				"stores_ID" ,
				"stores_discount_price",
				"stores_name",
				"users_full_name",
				"payment_period_ID",
				"orders_speciality_total_qty",
				"orders_speciality_total_product",
				"orders_speciality_total_shipping",
				"orders_speciality_total_coupon_store",
				"orders_speciality_total_coupon_dala",
				"orders_speciality_total_fee",
				"orders_speciality_total_caution",
				"payment_period_payment"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"orders_speciality_date_orders",
						"value"     : ojs_shares_date.get_current_month_now(),
						"compare" : ">"
					},
					{   
						"field"     :"orders_speciality_date_orders",
						"value"     : ojs_shares_date.get_current_date_end(),
						"compare" : "<="
					},
					{   
						"field"     :"orders_speciality_status_orders",
						"value"     : [100,21],
						"compare" : "in"
					},
					{   
						"field"     :"stores_user_id",
						"value"     : user_id,
						"compare" : "="
					}  					
					] 				
				}         
			],	
			"order" :
			[		 
				{    
					"field"  :"orders_speciality_date_orders",
					"compare" : "DESC"
				}			
			]				
		 }
		
		var fn_get_order_list = new Promise((resolve, reject) => {
			let result = order_search(data_order_list,res);
			resolve(result);
		});	
		promise_all.push(fn_get_order_list);	




		//@
		//@
		//@ store list
		var data_store_list =    
		{
		   "select_field" :
			[
				"stores_ID",
				"stores_name",
				"stores_phone"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"stores_user_id",
						"value"     : user_id,
						"compare" : "="
					}  					
					] 				
				}         
			]						
		 }
		
		var fn_get_store_list = new Promise((resolve, reject) => {
			let result = store_search(data_store_list,res);
			resolve(result);
		});	
		promise_all.push(fn_get_store_list);	
		
		
		
		
		



		//@
		//@
		//@
		//@ promise go	
		var promise_result = await Promise.all(promise_all);
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data bussiness, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "api/appdalacom/contriller/bussiness/controllers-bussiness-by-user-id-appdalacom-api.js",
			"message": error_send 
		}); 
			
	}	
	
	let notes = {
		"0":"no", 
		"1":"order_list",
		"2":"store_list"			
	}
	promise_result.push(notes);

	return res.send(promise_result);
	
}






//@
//@
//@
//@ export
module.exports = function_export;












//@
//@
//@
//@ file end











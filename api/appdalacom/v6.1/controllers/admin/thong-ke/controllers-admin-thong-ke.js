//@
//@
//@
//@
//@ file start


const express = require('express');
const router = express.Router();




const config_api = require('../../../configs/config');




const ojs_shares_show_errors = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-fetch-data.js');
const ojs_shares_date = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-date.js');



const fields_insert = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-fields-insert');
const check_role = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_user = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-user');

const get_data_news_admin = require('../../../shares/get-data-news-admin-appdalacom-api.js');

const user_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-search');
const order_search = 
	require('../../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search');
const store_search = 
	require('../../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-search');

//@
//@
//@
//@
//@ function export
async  function function_export(req, res, next) {

	//@ lấy req data
	try {
		var token = req.headers['token'];
		//return res.send([store_id]);
		//	
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
			"position" : "api/appdalacom/controller/admin/thong-ke/controllers-admin-thong-ke.js",
			"message": error_send 
		}); 
			
	}	
	
	
	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);
	if(check_role_result == "admin" ){
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
			"position" : "api/appdalacom/controller/admin/thong-ke/controllers-admin-thong-ke.js",
			"message": error_send 
		}); 
					
	}

	//return res.send(["adasdasdasd 1"]);
	//
	


	
	//@
	//@
	//@
	//@ promise
	try{	
		var promise_all = [];
		promise_all.push(0);

		//@ 1. lấy news admin
		var fn_get_data_news_admin = new Promise((resolve, reject) => {
			let result = get_data_news_admin(res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_news_admin);



		
		
		//@
		//@
		//@lấy order list
		var data_order_list =    
		{
		   "select_field" :
			[
				"orders_speciality_ID",
				"orders_speciality_adress",
				"orders_speciality_date_orders" ,
				"orders_speciality_notes",
				"orders_speciality_status_orders",
				"orders_speciality_status_payment",
				"orders_speciality_name",
				"orders_speciality_province",
				"orders_speciality_district",
				"orders_speciality_wards",
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
						"value"     : [21,100],
						"compare" : "in"
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
			]						
		 }
		
		var fn_get_store_list = new Promise((resolve, reject) => {
			let result = store_search(data_store_list,res);
			resolve(result);
		});	
		promise_all.push(fn_get_store_list);	








		//@
		//@
		//@lấy order list
		var data_order_list =    
		{
		   "select_field" :
			[
				"payment_period_ID",
				"orders_speciality_total_product",
				"orders_speciality_total_coupon_store",
				"orders_speciality_total_coupon_dala",
				"orders_speciality_total_fee",
				"orders_speciality_total_caution",
				"stores_discount_price",
				"orders_speciality_status_orders",	
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
						"value"     : [21,100],
						"compare" : "in"
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
		
		var fn_get_order_list2 = new Promise((resolve, reject) => {
			let result = order_search(data_order_list,res);
			resolve(result);
		});	
		promise_all.push(fn_get_order_list2);	







		//@
		//@
		//@
		//@ promise go 
		var promise_result = await Promise.all(promise_all);
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "api/appdalacom/controller/admin/thong-ke/controllers-admin-thong-ke.js",
			"message": error_send 
		}); 
			
	}	

	
	

	
	
	let notes = {
		"0":"no", 
		"1":"news admin",
	}
	
	promise_result.push(notes);
	return res.send(promise_result);
	
}



//@
//@
//@
//@
//@ export
module.exports = function_export;











//@
//@
//@
//@
//@ file end








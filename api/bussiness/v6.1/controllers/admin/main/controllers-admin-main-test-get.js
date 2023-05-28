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





const store_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-search');
const product_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search');
const order_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search');
const order_detail_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/order-details/order-detail-search.js');
const traffic_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/traffic/traffic-search');

const user_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-search');



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
			"position" : "api/appdalacom/controller/admin/stores/controllers-admin-store-add.js",
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
			"position" : "api/appdalacom/controller/admin/stores/controllers-admin-store-add.js",
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
		//@ tong cửa hàng 
		var count_store_all_data =    
		{
		   "select_field" :
			[
				"count(stores_ID)"					
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"stores_status_admin",
						"value"     : 1,
						"compare" : "="
					}         
					]    
				}         
			]   
		}
		
		var fn_get_count_store_all = new Promise((resolve, reject) => {
			let result = store_search(count_store_all_data,res);
			resolve(result);
		});	
		promise_all.push(fn_get_count_store_all);	



		//@
		//@ tong cửa hàng mới
		var count_store_new_data =    
		{
		   "select_field" :
			[
				"count(stores_ID)"					
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"stores_status_admin",
						"value"     : 1,
						"compare" : "="
					},    
					{   
						"field"     :"stores_date_created",
						"value"     : ojs_shares_date.get_current_month_now(),
						"compare" : ">="
					} 
					]    
				}         
			]   
		}
		
		var fn_get_count_store_new = new Promise((resolve, reject) => {
			let result = store_search(count_store_new_data,res);
			resolve(result);
		});	
		promise_all.push(fn_get_count_store_new);	




		//@
		//@ tổng sản phẩm
		var count_product_all_data =    
		{
		   "select_field" :
			[
				"count(products_speciality_ID)"					
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"products_speciality_status_admin",
						"value"     : 1,
						"compare" : "="
					}           
					]    
				}         
			]   
		}
		
		var fn_get_count_product_all = new Promise((resolve, reject) => {
			let result = product_search(count_product_all_data,res);
			resolve(result);
		});	
		promise_all.push(fn_get_count_product_all);	






		//@
		//@ tổng sản phẩm mới
		var count_product_new_data =    
		{
		   "select_field" :
			[
				"count(products_speciality_ID)"					
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"products_speciality_status_admin",
						"value"     : 1,
						"compare" : "="
					},    
					{   
						"field"     :"products_speciality_date_created",
						"value"     : ojs_shares_date.get_current_month_now(),
						"compare" : ">="
					} 					
					]    
				}         
			]   
		}
		
		var fn_get_count_product_new = new Promise((resolve, reject) => {
			let result = product_search(count_product_new_data,res);
			resolve(result);
		});	
		promise_all.push(fn_get_count_product_new);	




		//@
		//@ tổng đơn hàng
		var count_order_all_data =    
		{
		   "select_field" :
			[
				"count(orders_speciality_ID)"					
			]  
		}
		
		var fn_get_count_order_all = new Promise((resolve, reject) => {
			let result = order_search(count_order_all_data,res);
			resolve(result);
		});	
		promise_all.push(fn_get_count_order_all);	
		
		
		
		


		//@
		//@ tổng đơn hàng thanh cong
		var count_order_ok_data =    
		{
		   "select_field" :
			[
				"count(orders_speciality_ID)"					
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"orders_speciality_status_orders",
						"value"     : 100,
						"compare" : "="
					}         
					]    
				}         
			]   
		}
		
		var fn_get_count_order_ok = new Promise((resolve, reject) => {
			let result = order_search(count_order_ok_data,res);
			resolve(result);
		});	
		promise_all.push(fn_get_count_order_ok);	





		//@
		//@ tổng đơn hàng không thành công
		var count_order_no_all_data =    
		{
		   "select_field" :
			[
				"count(orders_speciality_ID)"					
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"orders_speciality_status_orders",
						"value"     : 100,
						"compare" : "<>"
					}	           
					]    
				}         
			]   
		}
		
		var fn_get_count_order_no_all = new Promise((resolve, reject) => {
			let result = order_search(count_order_no_all_data,res);
			resolve(result);
		});	
		promise_all.push(fn_get_count_order_no_all);	




		//@
		//@ tổng doanh thu
		var sum_order_data =    
		{
		   "select_field" :
			[
				"sum_price_caution"					
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"orders_speciality_status_orders",
						"value"     : 100,
						"compare" : "="
					}					
					]    
				}         
			]   
		}
		
		var fn_get_sum_order = new Promise((resolve, reject) => {
			let result = order_detail_search(sum_order_data,res);
			resolve(result);
		});	
		promise_all.push(fn_get_sum_order);	





		//@
		//@ faffic
		var traffic_app_data =    
		{
		   "select_field" :
			[
				"traffic_app",
				"traffic_web",
				"traffic_webapp"					
			]        
		}
		
		var fn_get_traffic_app = new Promise((resolve, reject) => {
			let result = traffic_search(traffic_app_data,res);
			resolve(result);
		});	
		promise_all.push(fn_get_traffic_app);	


	

		//@
		//@ user dang ky tren app
		var user_register_app =    
		{
		   "select_field" :
			[
				"count(users_ID)"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"users_service",
						"value"     : 1,
						"compare" : "="
					}					
					]    
				}         
			]         
		}
		
		var fn_get_user_register_app = new Promise((resolve, reject) => {
			let result = user_search(user_register_app,res);
			resolve(result);
		});	
		promise_all.push(fn_get_user_register_app);



		//@
		//@ user dang ky tren web
		var user_register_web =    
		{
		   "select_field" :
			[
				"count(users_ID)"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"users_service",
						"value"     : 2,
						"compare" : "="
					}					
					]    
				}         
			]         
		}
		
		var fn_get_user_register_web = new Promise((resolve, reject) => {
			let result = user_search(user_register_web,res);
			resolve(result);
		});	
		promise_all.push(fn_get_user_register_web);



		//@
		//@ user dang ky tren webapp
		var user_register_webapp =    
		{
		   "select_field" :
			[
				"count(users_ID)"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"users_service",
						"value"     : 3,
						"compare" : "="
					}					
					]    
				}         
			]         
		}
		
		var fn_get_user_register_webapp = new Promise((resolve, reject) => {
			let result = user_search(user_register_webapp,res);
			resolve(result);
		});	
		promise_all.push(fn_get_user_register_webapp);







		//@
		//@ tong don hang tren app
		var order_app_data =    
		{
		   "select_field" :
			[
				"count(orders_speciality_ID)"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"orders_speciality_service",
						"value"     : 1,
						"compare" : "="
					}					
					]    
				}         
			]         
		}
		
		var fn_get_order_app = new Promise((resolve, reject) => {
			let result = order_search(order_app_data,res);
			resolve(result);
		});	
		promise_all.push(fn_get_order_app);





		//@
		//@ tong don hang tren app trong thang
		var order_app_mon_data =    
		{
		   "select_field" :
			[
				"count(orders_speciality_ID)"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"orders_speciality_service",
						"value"     : 1,
						"compare" : "="
					},    
					{   
						"field"     :"orders_speciality_date_orders",
						"value"     : ojs_shares_date.get_current_month_now(),
						"compare" : ">="
					} 					
					]    
				}         
			]         
		}
		
		var fn_get_order_app_mon = new Promise((resolve, reject) => {
			let result = order_search(order_app_mon_data,res);
			resolve(result);
		});	
		promise_all.push(fn_get_order_app_mon);







		//@
		//@ tong don hang tren web
		var order_web_data =    
		{
		   "select_field" :
			[
				"count(orders_speciality_ID)"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"orders_speciality_service",
						"value"     : 2,
						"compare" : "="
					}					
					]    
				}         
			]         
		}
		
		var fn_get_order_web = new Promise((resolve, reject) => {
			let result = order_search(order_web_data,res);
			resolve(result);
		});	
		promise_all.push(fn_get_order_web);





		//@
		//@ tong don hang tren web trong thang
		var order_web_mon_data =    
		{
		   "select_field" :
			[
				"count(orders_speciality_ID)"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"orders_speciality_service",
						"value"     : 2,
						"compare" : "="
					},    
					{   
						"field"     :"orders_speciality_date_orders",
						"value"     : ojs_shares_date.get_current_month_now(),
						"compare" : ">="
					} 					
					]    
				}         
			]         
		}
		
		var fn_get_order_web_mon = new Promise((resolve, reject) => {
			let result = order_search(order_web_mon_data,res);
			resolve(result);
		});	
		promise_all.push(fn_get_order_web_mon);










		//@
		//@ tong don hang tren webapp
		var order_webapp_data =    
		{
		   "select_field" :
			[
				"count(orders_speciality_ID)"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"orders_speciality_service",
						"value"     : 3,
						"compare" : "="
					}					
					]    
				}         
			]         
		}
		
		var fn_get_order_webapp = new Promise((resolve, reject) => {
			let result = order_search(order_webapp_data,res);
			resolve(result);
		});	
		promise_all.push(fn_get_order_webapp);





		//@
		//@ tong don hang tren app trong thang
		var order_webapp_mon_data =    
		{
		   "select_field" :
			[
				"count(orders_speciality_ID)"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"orders_speciality_service",
						"value"     : 3,
						"compare" : "="
					},    
					{   
						"field"     :"orders_speciality_date_orders",
						"value"     : ojs_shares_date.get_current_month_now(),
						"compare" : ">="
					} 					
					]    
				}         
			]         
		}
		
		var fn_get_order_webapp_mon = new Promise((resolve, reject) => {
			let result = order_search(order_webapp_mon_data,res);
			resolve(result);
		});	
		promise_all.push(fn_get_order_webapp_mon);










		//@
		//@ 
		//@tổng số user
		var user_all =    
		{
		   "select_field" :
			[
				"count(users_ID)"				
			]        
		}
		
		var fn_get_user_all = new Promise((resolve, reject) => {
			let result = user_search(user_all,res);
			resolve(result);
		});	
		promise_all.push(fn_get_user_all);












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
				"Lỗi get data review, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "api/appdalacom/controller/admin/stores/controllers-admin-store-add.js",
			"message": error_send 
		}); 
			
	}	

	
	

	
	
	let notes = {
		"0":"no", 
		"1":"news admin",
		"2":"cua hang all",
		"3":"cua hang moi",
		"4":"san pham all",
		"5":"san pham moi",
		"6":"tong don hang",
		"7":"tong don hang da hoan thanh",
		"8":"tong don hang that bai",
		"9":"tong gia tri giao dich",
		"10":"traffic app",	
		
		"11":"user web",			
		"12":"user app",			
		"12":"user webapp",
		
		"13":"order_app",		
		"14":"order_app_mon",

		"15":"order_web",		
		"16":"order_web_mon",
		
		"15":"order_webapp",		
		"16":"order_webapp_mon",	
		"17":"user_all",
	}
	//promise_result.push(data_product);	
	//promise_result.push(category_resuilt);	
	

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








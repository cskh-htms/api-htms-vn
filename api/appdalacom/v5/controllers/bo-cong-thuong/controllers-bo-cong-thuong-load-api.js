const express = require('express');
const router = express.Router();

const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_date = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-date.js');





const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');
const store_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-search');
const product_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search');
const order_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search');

const order_detail_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/order-details/order-detail-search.js');

const traffic_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/traffic/traffic-search');

//@
async  function function_export(req, res, next) {
	//@ lấy req data
	try {
		var token = req.headers['token'];
		var datas  = req.body;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "controller->api-appdalacom->controller->bo-cong-thuong",
			"message": error_send 
		}); 
			
	}		
	//return res.send([datas]);
	//
	
	
	
	//@
	//@
	//@
	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);
	if(
	check_role_result == "bo-cong-thuong" 
	){
		//go
	}
	else{
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				check_role_result, 
				"Lỗi phân quyền, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3",
			"position" : "controller->api-appdalacom->controller->bo-cong-thuong",
			"message": error_send 
		}); 
					
	}
	//return res.send(["ok"]);
	//
	
	
	


	/////////////////////
	////////////////////
	try{	
		var promise_all = [];
		promise_all.push(0);


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
					},    
					{   
						"field"     :"stores_date_created",
						"value"     : datas.date_end,
						"compare" : "<="
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
						"value"     : datas.date_star,
						"compare" : ">="
					},    
					{   
						"field"     :"stores_date_created",
						"value"     : datas.date_end,
						"compare" : "<="
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
					},    
					{   
						"field"     :"products_speciality_date_created",
						"value"     : datas.date_end,
						"compare" : "<="
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
						"value"     : datas.date_star,
						"compare" : ">="
					},    
					{   
						"field"     :"products_speciality_date_created",
						"value"     : datas.date_end,
						"compare" : "<="
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
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[    
					{   
						"field"     :"orders_speciality_date_orders",
						"value"     : datas.date_end,
						"compare" : "<="
					}  	           
					]    
				}         
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
					},    
					{   
						"field"     :"orders_speciality_date_orders",
						"value"     : datas.date_end,
						"compare" : "<="
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
					},    
					{   
						"field"     :"orders_speciality_date_orders",
						"value"     : datas.date_end,
						"compare" : "<="
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
					},    
					{   
						"field"     :"orders_speciality_date_orders",
						"value"     : datas.date_end,
						"compare" : "<="
					},
					{   
						"field"     :"orders_details_speciality_line_order",
						"value"     : "product",
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
		var traffic_data =    
		{
		   "select_field" :
			[
				"traffic_app"					
			]        
		}
		
		var fn_get_traffic = new Promise((resolve, reject) => {
			let result = traffic_search(traffic_data,res);
			resolve(result);
		});	
		promise_all.push(fn_get_traffic);	







		
		var promise_result = await Promise.all(promise_all);
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data bussiness, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "controller->api-appdalacom->controller->bo-cong-thuong",
			"message": error_send 
		}); 
			
	}	
	
	let notes = {
		"0":"no", 
		"1":"news bussiness",
		"2":"count item", 
		"3":"store taget",	
	}
	promise_result.push(notes);

	return res.send([promise_result]);
	
}

module.exports = function_export;
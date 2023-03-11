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


const user_login_bo_cong_thuong = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-login-bo-cong-thuong.js');


//@
async  function function_export(req, res, next) {
	//@ lấy req data
	try {
		var token = req.headers['token'];
		var datas  = req.body.datas;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1", 
			"position" : "controller->api-appdalacom->controller->bo-cong-thuong",
			"message": error_send 
		}); 
		return;	
	}		
	//res.send(datas);
	//return;
	
	
	
	
	
	
	
	var login_bo_cong_thuong = await user_login_bo_cong_thuong(datas,res);
	
	if(login_bo_cong_thuong.length <= 0){
		res.send({ 
			"error" : "1", 
			"position" : "ctl->api->bo-cong-thuong",
			"message": "User hoặc mật khẩu không đúng.",
			"notes" : "Lỗi này do user hoặc mật khẩu không đúng -> hay liên hệ HTKT DALA."			
		}); 		
	}



	//res.send(login_bo_cong_thuong);
	//return;






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

		var result = {
			"soLuongTruyCap":promise_result[9][0].traffic_app,
			"soNguoiBan":promise_result[1][0].count_stores_ID,
			"soNguoiBanMoi":promise_result[2][0].count_stores_ID,
			"TongSoSanPham":promise_result[3][0].count_products_speciality_ID,
			"soSanPhamMoi":promise_result[4][0].count_products_speciality_ID,
			
			"soLuongGiaoDich":promise_result[5][0].count_orders_speciality_ID,
			"tongSoDonHangThanhCong":promise_result[6][0].count_orders_speciality_ID,			
			"tongSoDonHangKhongThanhCong":promise_result[7][0].count_orders_speciality_ID,	
			"tongGiaTriGiaoDich":promise_result[8][0].count_orders_speciality_ID,			
		}
		res.send(result);
		return;		
		
		
		
		
		
		
		
		
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data bussiness, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "100", 
			"position" : "controller->api-appdalacom->controller->bo-cong-thuong",
			"message": error_send 
		}); 
		return;	
	}	
	

}

module.exports = function_export;
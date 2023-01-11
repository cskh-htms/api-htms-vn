//@
//@
//@
//@
//@ file start




//@
//@
//@
//@
//@ reqiure
const express = require('express');
const router = express.Router();




//@
//@
//@
//@
//@ configs
const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');






//@
//@
//@
//@
//@ share
const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-fetch-data.js');




//@
//@
//@
//@
//@ model database
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');
const order_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/order-details/order-detail-search-by-store.js');
const order_get_one = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-get-one.js');
const order_detail_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/order-details/order-detail-search-by-product.js');
const shipping_tracking_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/shipping-tracking/shipping-tracking-search.js');
const order_detail_coupon = require('../../../../lib/' + config_api.API_LIB_VERSION + '/order-details/order-detail-search-by-coupon.js');





//@
//@
//@
//@
//@ function export
async  function function_export(req, res, next) {
	//@
	//@
	//@ error all
	try{

		//@
		//@
		//@ lấy req data
		try {
			var token = req.headers['token'];
			var datas  = req.body;
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
				"position" : "api->appdalacom->controller->order->manage->ajax-load-detail",
				"message": error_send 
			}); 
			return;	
		}	
		//res.send([datas]);
		//return;	


	
		
	
	
	
		//@
		//@
		//@
		//@ check role phân quyền
		const check_role_result = await check_role.check_role(token,res);
		if(
		check_role_result == "bussiness" 
		|| check_role_result == "admin" 
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
				"error" : "3",
				"position" : "api->appdalacom->controller->order->manage->show all",
				"message": error_send 
			}); 
			return;			
		}









		
		//@
		//@
		//@
		//@ promise
		try{	
			var promise_all = [];
			promise_all.push(0);
			
				
			var fn_get_order_taget = new Promise((resolve, reject) => {
				let result = order_get_one(datas.order_id,res);
				resolve(result);
			});	
			promise_all.push(fn_get_order_taget);				
				
				
				
				
				
				
	
			//@
			//@
			//@
			//@ order detail
			let data_order_detail =    
			{
			   "select_field" :
				[
					"orders_details_medium_text",
					"orders_details_speciality_ID",
					"orders_details_speciality_line_order",
					"orders_details_speciality_price",
					"orders_details_speciality_product_id",
					"orders_details_speciality_qty",
					"price_caution",
					"products_speciality_name"			
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   
							"field"     :"orders_details_speciality_order_id",
							"value"     : datas.order_id,
							"compare" : "="
						},	
						{   
							"field"     :"orders_details_speciality_line_order",
							"value"     : 'product',
							"compare" : "="
						}							
						] 				
					}         
				]				
			 }
			
			var fn_get_order_detail = new Promise((resolve, reject) => {
				let result = order_detail_search(data_order_detail,res);
				resolve(result);
			});	
			promise_all.push(fn_get_order_detail);
			
			
	
			
	




			//@
			//@
			//@
			//@ shipping tracking
			let data_tracking_list =    
			{
			   "select_field" :
				[
				"shipping_tracking_users_id",
				"shipping_tracking_date_created",				
				"shipping_tracking_orders_id",
				"shipping_tracking_infomation",
				"shipping_tracking_orders_status",		
				"shipping_tracking_qoute",
				"users_full_name",
				"users_phone"				
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   
							"field"     :"shipping_tracking_orders_id",
							"value"     : datas.order_id,
							"compare" : "="
						}			
						] 				
					}         
				]				
			 }
			
			var fn_get_tracking_list = new Promise((resolve, reject) => {
				let result = shipping_tracking_search(data_tracking_list,res);
				resolve(result);
			});	
			promise_all.push(fn_get_tracking_list);







			//@
			//@
			//@
			//@ order coupon_detail
			let data_coupon_detail =    
			{
			   "select_field" :
				[
					"orders_details_medium_text",
					"orders_details_speciality_ID",
					"orders_details_speciality_line_order",
					"orders_details_speciality_price",
					"orders_details_speciality_product_id",
					"orders_details_speciality_qty",
					"price_caution"		
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   
							"field"     :"orders_details_speciality_order_id",
							"value"     : datas.order_id,
							"compare" : "="
						},	
						{   
							"field"     :"orders_details_speciality_line_order",
							"value"     : 'coupon',
							"compare" : "="
						},	
						{   
							"field"     :"coupon_speciality_stores_id_created",
							"value"     : datas.order_id,
							"compare" : "="
						}						
						] 				
					}         
				]				
			 }
			
			var fn_get_coupon_detail = new Promise((resolve, reject) => {
				let result = order_detail_coupon(data_coupon_detail,res);
				resolve(result);
			});	
			promise_all.push(fn_get_coupon_detail);
			
			
			
			
			
	
			


			//@
			//@
			//@
			//@ promise go 
			var promise_result = await Promise.all(promise_all);
			
			
			
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					error, 
					"Lỗi get data review, Vui lòng liên hệ admin" 
				);
			res.send({ 
				"error" : "100", 
				"position" : "api->appdalacom->controller->order->manage->ajax-load-detail",
				"message": error_send 
			}); 
			return;	
		}	

		
		
		

		//@
		//@
		//@ add notes
		let notes = {
			"0":"no", 
			"1":"order_taget",
			"2":"order_list",
			"3":"shipping_tracking_list",
			"4":"coupon_list",			
			"5":"notes"
		}
		//promise_result.push(data_product);	
		//promise_result.push(category_resuilt);
		promise_result.push(notes);
		
		
		
		
		
		
		//@
		//@
		//@ send data result
		res.send(promise_result);
		return;
		
		
		
		
		
	//@
	//@
	//@ catch all error	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi không xác định. Vui lòng liên hệ bộ phận kỹ thuật hoặc  thao tác lại" 
			);
		res.send({ 
			"error" : "1000", 
			"position" : "api->appdalacom->controller->order->manage->ajax-load-detail",
			"message": error_send 
		}); 
		return;	
	}	
	
	
	
	//@
	//@
	//@ send error when not return data
	res.send({ 
		"error" : "2000", 
		"position":"api->appdalacom->controller->order->manage->ajax-load-detail",
		"message": "Lỗi không có data return, Lỗi này khi không có dữ liệu return, Vui lòng liên hệ bộ phận kỹ thuật, hoặc thao tác lại" 
	}); 
	return;		
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







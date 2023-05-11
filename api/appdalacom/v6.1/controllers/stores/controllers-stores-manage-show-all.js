

//@
//@
//@
//@ file start

const express = require('express');
const router = express.Router();

const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');

const get_data_news_bussiness = require('../../shares/get-data-news-bussiness-appdalacom-api.js');
const get_data_count_bussiness = require('../../shares/get-data-count-bussiness-appdalacom-api.js');

const store_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-search');
const product_sale = require('../../../../lib/' + config_api.API_LIB_VERSION + '/order-details/order-detail-search-by-store.js');

const order_detail_coupon = require('../../../../lib/' + config_api.API_LIB_VERSION + '/order-details/order-detail-search-by-coupon.js');




//@
//@
//@
//@ export
async  function function_export(req, res, next) {

	//@ lấy req data
	try {
		var token = req.headers['token'];
		
		//@
		//@
		var store_id = 0;
		if(req.query.c1){
			store_id = req.query.c1;
		}else{
			return res.send({ 
				"error" : "1", 
				"position" : "api->appdalacom->controller->stores->manage-show-all",
				"message": "vui lòng nhập id"
			}); 	
			
		}		
		
		//@
		//@
		var user_id = 0;
		if(req.query.c2){
			user_id = req.query.c2;
		}else{
			return res.send({ 
				"error" : "1", 
				"position" : "api->appdalacom->controller->stores->manage-show-all",
				"message": "vui lòng nhập id"
			}); 	
			
		}	
	
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
			"position" : "api->appdalacom->controller->stores->manage-show-all",
			"message": error_send 
		}); 
			
	}	
	
	
	//return res.send([store_id ,user_id]);
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
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				check_role_result, 
				"Lỗi phân quyền, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3",
			"position" : "api->appdalacom->controller->stores->manage-show-all",
			"message": error_send 
		}); 
					
	}


	
	//@ check owner store
	try{		
		//@ check owner store
		var check_owner_store_resuilt = await check_owner_store(token,store_id,res);
		if(	
		check_owner_store_resuilt == "1" 
		|| check_role_result == "admin" 
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
				"error" : "333",
				"position" : "api->appdalacom->controller->stores->manage-show-all",
				"message": error_send 
			}); 
						
		}	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check ownwr store, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "150", 
			"position" : "api->appdalacom->controller->stores->manage-show-all",
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



		//@ 1. lấy news bussiness
		var fn_get_data_news_bussiness = new Promise((resolve, reject) => {
			let result = get_data_news_bussiness(store_id,res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_news_bussiness);


		//@ 2. lấy count datas
		var fn_get_data_count_bussiness = new Promise((resolve, reject) => {
			let result = get_data_count_bussiness(store_id,res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_count_bussiness);


		
		//@
		//@
		//@lấy store taget
		var data_store =    
		{
		   "select_field" :
			[
				"stores_ID",
				"stores_user_id",
				"stores_name" ,
				"stores_adress",
				"stores_province",
				"stores_district",
				"stores_wards" ,
				"stores_payment_limit",
				"stores_discount_price",
				"service_type_name"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"stores_ID",
						"value"     : store_id,
						"compare" : "="
					}           
					]    
				}         
			]   
		}
		
		var fn_get_store_taget = new Promise((resolve, reject) => {
			let result = store_search(data_store,res);
			resolve(result);
		});	
		promise_all.push(fn_get_store_taget);			
		
		
		
		//@
		//@
		//@
		//@ product sale
		let data_product_sale = 	
			{
				"select_field" :
				[ 
					"products_speciality_ID",
					"products_speciality_name",
					"products_speciality_featured_image",
					"sum_price_caution",
					"sum(orders_details_speciality_qty)"
				],
				"condition" : 
				[
					{	"relation": "and",
						"where" : 
						[
						{	"field"		:"orders_speciality_store_id",
							"value" 	: store_id,
							"compare" : "="
						},
						{	"field"		:"orders_details_speciality_line_order",
							"value" 	: "product",
							"compare" : "="
						},						
						{	"field"		:"orders_speciality_status_pull_money",
							"value" 	: 0,
							"compare" : "="
						}
						]	
					}				
				],
				"group_by":
				[
					"products_speciality_ID"
				]				
			}	
		var fn_get_product_sale = new Promise((resolve, reject) => {
			let result = product_sale(data_product_sale,res);
			resolve(result);
		});	
		promise_all.push(fn_get_product_sale);			
		
		
		
		//@
		//@
		//@
		//@ order sale
		let data_order_sale = 	
			{
				"select_field" :
				[ 
					"orders_speciality_ID",
					"orders_speciality_date_orders",
					"orders_speciality_status_orders",
					"sum_price_caution",
					"sum(orders_details_speciality_qty)"
				],
				"condition" : 
				[
					{	"relation": "and",
						"where" : 
						[
						{	"field"		:"orders_speciality_store_id",
							"value" 	: store_id,
							"compare" : "="
						},
						{	"field"		:"orders_details_speciality_line_order",
							"value" 	: "product",
							"compare" : "="
						},						
						{	"field"		:"orders_speciality_status_pull_money",
							"value" 	: 0,
							"compare" : "="
						}
						]	
					}				
				],
				"group_by":
				[
					"orders_speciality_ID"
				]				
			}	
		var fn_get_order_sale = new Promise((resolve, reject) => {
			let result = product_sale(data_order_sale,res);
			resolve(result);
		});	
		promise_all.push(fn_get_order_sale);				
		
		
		
		
		
		//@
		//@
		//@
		//@ order detail coupon
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
				"products_speciality_name",
				"coupon_speciality_stores_id_created",
				"orders_speciality_ID",
				"orders_speciality_total_product",
				"orders_speciality_date_orders",
				"orders_speciality_status_orders",				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
						{	"field"		:"coupon_speciality_stores_id_created",
							"value" 	: store_id,
							"compare" : "="
						},
						{	"field"		:"orders_details_speciality_line_order",
							"value" 	: "coupon",
							"compare" : "="
						},						
						{	"field"		:"orders_speciality_status_pull_money",
							"value" 	: 0,
							"compare" : "="
						}							
					] 				
				}         
			]				
		 }
		
		var fn_get_order_detail = new Promise((resolve, reject) => {
			let result = order_detail_coupon(data_order_detail,res);
			resolve(result);
		});	
		promise_all.push(fn_get_order_detail);
		
		
		
		
		
		
		
		
		
		
		
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
				"Lỗi get data bussiness, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "api->appdalacom->controller->stores->manage-show-all",
			"message": error_send 
		}); 
			
	}	
	
	let notes = {
		"0":"no", 
		"1":"news bussiness",
		"2":"count data new", 
		"3":"store taget",	
		"4":"product_sale",
		"5":"order_sale",
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













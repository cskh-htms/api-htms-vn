const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const multer = require('multer');
const WPAPI = require( 'wpapi' );

const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-fields-insert');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_user = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-user');

const get_data_news_bussiness = require('../../shares/get-data-news-bussiness-appdalacom-api.js');
const get_data_count_bussiness = require('../../shares/get-data-count-bussiness-appdalacom-api.js');

const store_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-search');
const product_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search');
const order_search_by_store = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search-by-store.js');
const order_search_sale_by_store = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search-sale-by-store.js');


const coupon_search_by_store = require('../../../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search-sale-by-store.js');

//@
async  function controllers_bussiness_by_user_id(req, res, next) {
	
	//@ lấy req data
	try {
		var user_id = req.params.user_id;
		var token = req.headers['token'];
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
			"position" : "ctroller->api-appdalacom->controllers-bussiness-by-user-id-appdalacom-api.js",
			"message": error_send 
		}); 
		return;	
	}	
	
	
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
			"position" : "ctroller->api-appdalacom->controllers-bussiness-by-user-id-appdalacom-api.js", 
			"message": error_send 
		}); 
		return;			
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
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				check_role_result, 
				"Lỗi phân quyền, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "333",
			"position" : "ctroller->api-appdalacom->controllers-bussiness-by-user-id-appdalacom-api.js", 
			"message": error_send 
		}); 
		return;			
	}	


	/////////////////////
	////////////////////
	try{	
		var promise_all = [];
		promise_all.push(0);

		//@ 1. lấy news bussiness
		var fn_get_data_news_bussiness = new Promise((resolve, reject) => {
			let result = get_data_news_bussiness(user_id,res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_news_bussiness);


		//@ 2. lấy count datas
		var fn_get_data_count_bussiness = new Promise((resolve, reject) => {
			let result = get_data_count_bussiness(user_id,res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_count_bussiness);

		
		//@ 3. lấy store taget
		let data_store =    
		{
		   "select_field" :
			[
				"stores_ID",
				"stores_name" ,
				"stores_adress",
				"stores_province",
				"stores_district",
				"stores_wards" ,
				"stores_payment_limit",
				"stores_discount_price"						
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
		
		var fn_get_store_taget = new Promise((resolve, reject) => {
			let result = store_search(data_store,res);
			resolve(result);
		});	
		promise_all.push(fn_get_store_taget);	
		
		
		
		//@ 4. lấy product sale
		let data_product_sale = 		
		{
			"select_type": "DISTINCT",
			"select_field": [
			  "products_speciality_ID",
			  "products_speciality_name",
			  "products_speciality_price",
			  "products_speciality_sale_of_price",
			  "products_speciality_featured_image"
			],
			"condition": [
			  {
				"relation": "and",
				"where": [
				  {
					"field": "users_ID",
					"value": user_id,
					"compare": "="
				  },
				  {
					"field": "products_speciality_sale_of_price",
					"value": 0,
					"compare": ">"
				  }          
				]
			  }
			]
		}
		
		var fn_get_product_sale = new Promise((resolve, reject) => {
			let result = product_search(data_product_sale,res);
			resolve(result);
		});	
		promise_all.push(fn_get_product_sale);		
		
		
		

		//@ 5. lấy product sale max
		let data_product_sale_max = 	
		  {
			"select_field": [
			  "orders_details_speciality_product_id",
			  "orders_details_speciality_qty"
			],
			"condition": [
			  {
				"relation": "and",
				"where": [
				  {
					"field": "users_ID",
					"value": user_id,
					"compare": "="
				  }         
				]
			  }
			]
		  }
		var fn_get_product_sale_max = new Promise((resolve, reject) => {
			let result = order_search_sale_by_store(data_product_sale_max,res);
			resolve(result);
		});	
		promise_all.push(fn_get_product_sale_max);	
		
		
		
		//@ 6. product_max_detail	
		let data_product_sale_max_detail = 
		{
			"select_type": "DISTINCT",
			"select_field": [
			  "products_speciality_ID",
			  "products_speciality_name",
			  "products_speciality_price",
			  "products_speciality_sale_of_price",
			  "products_speciality_featured_image",
			  "products_speciality_price_caution"
			],
			"condition": [
			  {
				"relation": "and",
				"where": [
				  {
					"field": "users_ID",
					"value": user_id,
					"compare": "="
				  }         
				]
			  }
			]
		  }
		var fn_get_product_sale_max_detail = new Promise((resolve, reject) => {
			let result = product_search(data_product_sale_max_detail,res);
			resolve(result);
		});	
		promise_all.push(fn_get_product_sale_max_detail);	
		
			
		
		
		//@ 7. orders_list	
		let data_orders_list = 	
			{
				"select_field" :
				[ 
					"stores_ID",
					"orders_speciality_ID",
					"orders_details_speciality_line_order",
					"orders_details_speciality_qty" ,
					"orders_details_speciality_price",
					"price_caution",
					"orders_speciality_status_pull_money"
				],
				"condition" : 
				[
					{	"relation": "and",
						"where" : 
						[
						{	"field"		:"users_ID",
							"value" 	: user_id,
							"compare" : "="
						},
						{	"field"		:"orders_speciality_status_orders",
							"value" 	: 100,
							"compare" : "="
						},
						{	"field"		:"orders_speciality_status_pull_money",
							"value" 	: 1,
							"compare" : "<>"
						}
						]	
					}				
				]					
			}	
		var fn_get_orders_list = new Promise((resolve, reject) => {
			let result = order_search_by_store(data_orders_list,res);
			resolve(result);
		});	
		promise_all.push(fn_get_orders_list);	
		
		
		
		
		//@ 8. coupon
		let data_coupon = 	
			{
				"select_field": [
					"coupon_speciality_ID",
					"orders_speciality_ID",
					"coupon_speciality_type",
					"sum(orders_details_speciality_price)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   
							"field"     :"users_ID",
							"value"     : user_id,
							"compare" : "="
						}                                      
						]    
					}         
				],
				"group_by" :
				 [
					"coupon_speciality_ID",
					"orders_speciality_ID",
					"coupon_speciality_type"
				 ] 
			}	
		var fn_get_coupon = new Promise((resolve, reject) => {
			let result = coupon_search_by_store(data_coupon,res);
			resolve(result);
		});	
		promise_all.push(fn_get_coupon);		


		
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
		res.send({ 
			"error" : "100", 
			"position" : "api/appdalacom/contriller/bussiness/controllers-bussiness-by-user-id-appdalacom-api.js",
			"message": error_send 
		}); 
		return;	
	}	
	
	let notes = {
		"0":"no", 
		"1":"news bussiness",
		"2":"count item", 
		"3":"store taget",
		"4":"product sale", 
		"5":"product max",
		"6":"product max detail", 
		"7":"order list",	
		"8":"coupon",		
	}
	promise_result.push(notes);

	res.send(promise_result);
	return;
}

module.exports = controllers_bussiness_by_user_id;
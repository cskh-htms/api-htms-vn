const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-fields-insert');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');

const get_data_news_bussiness = require('../../shares/get-data-news-bussiness-appdalacom-api.js');
const get_data_count_bussiness = require('../../shares/get-data-count-bussiness-appdalacom-api.js');


const store_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-search');
const product_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search');
const product_search_by_discount_product_add = require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search-by-discount-product-add');
const discount_detail_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts-details/discount-detail-search');
const get_meta_product = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-product.js');


//@
async  function controllers_discount_program_product_add_list(req, res, next) {
	//@ lấy req data
	try {
		var store_id = req.params.store_id;
		var user_id = req.params.user_id;
		var discount_program_details_id = req.params.discount_program_details_id;
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
			"position" : "controller->api-appdalacom->discount_program_product_add_list-appdalacom-api.js",
			"message": error_send 
		}); 
		return;	
	}	
	


	//res.send([discount_program_details_id] );
	//return;



	// check role;
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
			"position" : "ctroller->api-appdalacom->discount_program_product_add_list-appdalacom-api.js", 
			"message": error_send 
		}); 
		return;			
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
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					check_role_result, 
					"Lỗi phân quyền, Vui lòng liên hệ admin" 
				);
			res.send({ 
				"error" : "333",
				"position" : "ctroller->api-appdalacom->discount_program_product_add_list-appdalacom-api.js", 
				"message": error_send 
			}); 
			return;			
		}	
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check ownwr store, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "150", 
			"position" : "ctroller->api-appdalacom->discount_program_product_add_list-appdalacom-api.js", 
			"message": error_send 
		}); 
		return;	
	}	


	//res.send(["owner ok"] );
	//return;


	//@ product_list
	var limit_data = [];
	try {
		let data_product_list =    
		{
		   "select_field" :
			[
				"products_speciality_ID",
				"products_speciality_featured_image",
				"products_speciality_name",
				"products_speciality_price",
				"products_speciality_price_caution",
				"products_speciality_sale_of_price",
				"products_speciality_sale_of_price_time_check",
				"products_speciality_stock_status",
				"products_speciality_stock",
				"products_speciality_sku",
				"products_speciality_type",	
				"products_speciality_status_store",
				"products_speciality_status_admin",	
				"products_speciality_sort_by_percen",				
				"stores_name",
				"stores_ID"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"products_speciality_store_id",
						"value"     : store_id,
						"compare" : "="
					},				
					{   
						"field"     :"products_speciality_sale_of_price",
						"value"     : "",
						"compare" : "null"
					},
					{   
						"field"     :"products_speciality_status_admin",
						"value"     : "1",
						"compare" : "="
					},
					{   
						"field"     :"products_speciality_type",
						"value"     : "2",
						"compare" : "<>"
					},
					{   
						"field"     :"discount_program_product_link_status",
						"value"     : "",
						"compare" : "null"
					}					
					] 				
				}         
			],
			"order" :
			 [		 
				{    
					"field"  :"products_speciality_date_created",
					"compare" : "DESC"
				}			
			],
			"limit" :limit_data			
		}
	
		//@ get datas
		var data_product = await product_search_by_discount_product_add(data_product_list,res);
		
		//@ create arr ID product
		var model_product_arr = [0];
		if(data_product.length > 0){
			for(x in data_product){
				if(data_product[x].products_speciality_ID){
					model_product_arr.push(data_product[x].products_speciality_ID);
				}
			}
		}	

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data product, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "3", 
			"position" : "api/app/v5/ctroller/controllers-product-by-store-app",
			"message": error_send 
		}); 
		return;	
	}		

	//@ lấy meta
	try {
		var get_meta_product_resuilt = await get_meta_product(data_product,model_product_arr,res);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data product, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "4", 
			"position" : "api/app/v5/ctroller/controllers-product-by-store-app",
			"message": error_send 
		}); 
		return;	
	}


	//res.send(data_product);
	//return;



	//@ product_list gift
	try {
		let data_product_list_gift =    
		{
		   "select_field" :
			[
				"products_speciality_ID",
				"products_speciality_featured_image",
				"products_speciality_name",
				"products_speciality_price",
				"products_speciality_price_caution",
				"products_speciality_sale_of_price",
				"products_speciality_sale_of_price_time_check",
				"products_speciality_stock_status",
				"products_speciality_stock",
				"products_speciality_sku",
				"products_speciality_type",	
				"products_speciality_status_store",
				"products_speciality_status_admin",	
				"products_speciality_sort_by_percen",				
				"stores_name",
				"stores_ID"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"products_speciality_store_id",
						"value"     : store_id,
						"compare" : "="
					},	
					{   
						"field"     :"products_speciality_status_admin",
						"value"     : "1",
						"compare" : "="
					},
					{   
						"field"     :"products_speciality_type",
						"value"     : "2",
						"compare" : "="
					}
					] 				
				}         
			],
			"order" :
			 [		 
				{    
					"field"  :"products_speciality_date_created",
					"compare" : "DESC"
				}			
			]	
		}
	
		//@ get datas
		var data_product_gift = await product_search(data_product_list_gift,res);

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data product gift, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "33", 
			"position" : "api/app/v5/ctroller/controllers-product-by-store-app",
			"message": error_send 
		}); 
		return;	
	}	


	//res.send(data_product_gift);
	//return;
	
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
		let data_store_taget =    
		{
		   "select_field" :
			[
				"stores_ID",
				"stores_user_id",
				"stores_name",
				"stores_date_created",
				"stores_adress",
				"service_type_name",
				"users_first_name",
				"users_last_name",
				"users_full_name",					
				"stores_payment_limit",
				"stores_status_update",
				"stores_status_admin",
				"stores_status_stores",
				"stores_wards",
				"stores_district",
				"stores_province"				
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
			let result = store_search(data_store_taget,res);
			resolve(result);
		});	
		promise_all.push(fn_get_store_taget);			
		
		
		
		//@ 3. discount program details taget
		let data_discount_program_details_taget =    
			{
				"select_field" :
				[
				"discount_program_details_ID",
				"discount_program_details_discount_program_id",
				"discount_program_details_store_id",
				"discount_program_details_status_admin",
				"discount_program_details_price",
				"discount_program_details_limit_day",
				"discount_program_details_limit_product",
				"discount_program_details_qoute",
				"discount_program_details_date_created",
				"discount_program_ID",
				"discount_program_gift_type",
				"discount_program_name",
				"check_date"
				],
				"condition" :
				[				
					{    
						"relation": "and",
						"where" :
						[  
							{   
								"field"     :"discount_program_details_ID",
								"value"     : discount_program_details_id,
								"compare" 	: '='
							}								
						]    
					}
				]
			}
		
		var fn_get_discount_program_details_taget = new Promise((resolve, reject) => {
			let result = discount_detail_search(data_discount_program_details_taget,res);
			resolve(result);
		});	
		promise_all.push(fn_get_discount_program_details_taget);			
		
		
		
		//@ gogo
		var promise_result = await Promise.all(promise_all);
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data bussiness, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "100", 
			"position" : "ctroller->api-appdalacom->discount_program_product_add_list-appdalacom-api.js", 
			"message": error_send 
		}); 
		return;	
	}	
	
	let notes = {
		"0":"no", 
		"1":"news bussiness",
		"2":"count item",
		"3":"data_store_taget",
		"4":"discount taget",
		"5":"product_list",
		"6":"product_list gift",		
	}
	promise_result.push(data_product);
	promise_result.push(data_product_gift);
	promise_result.push(notes);
	

	res.send(promise_result);
	return;
}

module.exports = controllers_discount_program_product_add_list;
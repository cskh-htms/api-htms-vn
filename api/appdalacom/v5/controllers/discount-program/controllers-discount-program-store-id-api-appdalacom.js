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
const discount_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts/discount-search');
const discount_detail_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts-details/discount-detail-search');
const discount_product_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts-products/discount-product-search');
const discount_product_gift_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts-products-gift/discount-product-gift-search.js');
const get_meta_product = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-product.js');


//@
async  function controllers_discount_program_product_add_list(req, res, next) {
	//@ lấy req data
	try {
		var token = req.headers['token'];
		//@
		//@
		var store_id = 0;
		if(req.query.c1){
			store_id = req.query.c1;
		}else{
			res.send({ 
				"error" : "01", 
				"position" : "controller->api-appdalacom->discount_program_product_add_list-appdalacom-api.js",
				"message": "vui lòng nhập id"
			}); 	
			return;
		}			
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
	

	//res.send([token,store_id]);
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
			"position" : "ctroller->api-appdalacom->discount_program_store-id-appdalacom-api.js", 
			"message": error_send 
		}); 
		return;			
	}
	
	//res.send(["check owner ok"]);
	//return;	



	//@
	//@
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
				"position" : "ctroller->api-appdalacom->discount_program_store-id-appdalacom-api.js", 
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
			"position" : "ctroller->api-appdalacom->discount_program_store-id-appdalacom-api.js", 
			"message": error_send 
		}); 
		return;	
	}	


	//res.send(["check owner store ok"]);
	//return;	

	
	
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

		

		//@ 3. lấy store taget
		let data_store_taget =    
		{
		   "select_field" :
			[
				"stores_ID",
				"stores_user_id",
				"stores_name" ,
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
						"field"     :"stores_ID",
						"value"     : store_id,
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
		
		
		
		//@
		//@ 4. discount program list
		let data_discount_program_list =    
			{
				"select_field" :
				[
				"discount_program_ID",
				"discount_program_price_created",
				"discount_program_featured_image",
				"discount_program_information",
				"discount_program_name",
				"discount_program_position",
				"discount_program_status_admin",
				"discount_program_status_update",
				"discount_program_store_id_created",
				"discount_program_type",
				"discount_program_gift_type",
				"discount_program_time_type",
				"discount_program_date_star",
				"discount_program_date_end",
				"check_expired",
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
								"field"     :"discount_program_status_admin",
								"value"     : 4,
								"compare" 	: '='
							},
							{   
								"field"     :"check_expired",
								"value"     : 1,
								"compare" : "="
							}								
						]    
					}
				]
			}
		
		var fn_get_discount_program_list = new Promise((resolve, reject) => {
			let result = discount_search(data_discount_program_list,res);
			resolve(result);
		});	
		promise_all.push(fn_get_discount_program_list);			
	


		//@
		//@
		//@ 4. discount program product
		let data_discount_program_product =    
			{
				"select_field" :
				[
				"discount_program_product_link_discount_program_id",
				"discount_program_product_link_product_speciality_id",
				"discount_program_product_link_status",
				"discount_program_ID",
				"products_speciality_ID",
				"products_speciality_name",
				"products_speciality_price",
				"discount_program_product_link_sale_of_price",
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
								"field"     :"stores_ID",
								"value"     : store_id,
								"compare" 	: '='
							}							
						]    
					}
				],
				"order" :
				 [		 
					{    
						"field"  :"discount_program_product_link_date_created",
						"compare" : "DESC"
					}			
				]			
			}
		
		var fn_get_discount_program_product = new Promise((resolve, reject) => {
			let result = discount_product_search(data_discount_program_product,res);
			resolve(result);
		});	
		promise_all.push(fn_get_discount_program_product);					
		
		
		
		
		
		
		
		//@ gogo
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
			"position" : "ctroller->api-appdalacom->discount_program_store-id-appdalacom-api.js", 
			"message": error_send 
		}); 
		return;	
	}	
	
	let notes = {
		"0":"no", 
		"1":"news bussiness",
		"2":"count item",
		"3":"data_store_taget",
		"4":"discount list",
		"5":"discount-product-list",		
	}
	promise_result.push(notes);
	

	res.send(promise_result);
	return;
}

module.exports = controllers_discount_program_product_add_list;
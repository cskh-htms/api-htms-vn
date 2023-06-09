const express = require('express');
const router = express.Router();




const config_api = require('../../../configs/config');




const ojs_shares_show_errors = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const check_role = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_user = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-user');

const get_data_news_admin = require('../../../shares/get-data-news-admin-appdalacom-api.js');

const discount_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/discounts/discount-search');
const discount_detail_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/discounts-details/discount-detail-search');
const discount_product_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/discounts-products/discount-product-search');


const product_search_gift_in = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/discounts-products-gift/discount-product-gift-search.js');
const price_meta_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/product-speciality-price-meta/product-speciality-price-meta-search.js');




//@
async  function function_export(req, res, next) {
	
	
	//@ lấy req data
	try {
		var token = req.headers['token'];
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
			"position" : "api/appdalacom/contriller/admin/discount-programs/controllers-discount-program-admin-quan-ly-show-all",
			"message": error_send 
		}); 
			
	}	
	
	
	//return res.send(["req ok"]);
	//	
	
	
	//@
	//@
	//@	
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
			"position" : "api/appdalacom/contriller/admin/discount-programs/controllers-discount-program-admin-quan-ly-show-all",
			"message": error_send 
		}); 
					
	}

	//return res.send(["check role ok"]);
	//
	
	
	
	
	
	
	
	//@
	//@
	//@		
	/////////////////////
	////////////////////
	try{	
		var promise_all = [];
		promise_all.push(0);


		
		//@ 1. lấy news admin
		var fn_get_data_news_admin = new Promise((resolve, reject) => {
			let result = get_data_news_admin(res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_news_admin);
		
		
		

		//@ 2. discunt list
		var data_discount = 		
		{
			"select_field" :
			[
			"discount_program_ID",
			"discount_program_date_created",
			"discount_program_name",
			"discount_program_store_id_created",
			"discount_program_featured_image",
			"discount_program_position",
			"discount_program_status_admin",
			"discount_program_status_update",
			"discount_program_information",
			"discount_program_type",
			"check_expired",
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
						"field"     :"discount_program_status_admin",
						"value"     : 3,
						"compare" 	: '<>'
					}
					] 				
				}         
			],
			"order" :
			 [		 
				{    
					"field"  :"discount_program_date_created",
					"compare" : "DESC"
				}			
			]	

		}

		var fn_get_data_discount = new Promise((resolve, reject) => {
			let result = discount_search(data_discount,res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_discount);		
		
		


		//@
		//@
		//@ 4. discount program product
		let data_discount_program_product =    
			{
				"select_field" :
				[
				"products_speciality_ID",
				"discount_program_product_link_ID",
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
				"stores_ID",
				"discount_program_product_link_status",
				"discount_program_product_link_discount_program_id",
				"check_expired"
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


		
		
		//@
		//@
		//@ 4. product_gift_in
		let data_product_gift_in =    
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
				"stores_ID",
				"discount_program_gift_link_product_speciality_id",
				"discount_program_ID"
				]			
			}
		
		var fn_get_product_gift_in = new Promise((resolve, reject) => {
			let result = product_search_gift_in(data_product_gift_in,res);
			resolve(result);
		});	
		promise_all.push(fn_get_product_gift_in);		
		
		
	
	
		
		
		
		//@
		//@
		//@ 4. price_meta_search
		let data_price_meta_search =    
			{
				"select_field" :
				[
				"products_speciality_ID",
				"discount_program_product_link_ID",
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
				"stores_ID",
				"products_speciality_price_meta_discount_product_link_id",
				"products_speciality_price_meta_from",
				"products_speciality_price_meta_to",
				"products_speciality_price_meta_price"
				],
				"order" :
				 [		 
					{    
						"field"  :"discount_program_product_link_date_created",
						"compare" : "DESC"
					}			
				]			
			}
		
		var fn_get_price_meta_search = new Promise((resolve, reject) => {
			let result = price_meta_search(data_price_meta_search,res);
			resolve(result);
		});	
		promise_all.push(fn_get_price_meta_search);			
	
	
	
	
	
	
	
	
	
		
		//@
		//@
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
			"position" : "api/appdalacom/contriller/admin/discount-programs/controllers-discount-program-admin-quan-ly-show-all",
			"message": error_send 
		}); 
			
	}	
	
	let notes = {
		"0":"no", 
		"1":"news admin",
		"2":"discount list",
		"3":"discount-product-list",
	}
	promise_result.push(notes);

	return res.send(promise_result);
	
}

module.exports = function_export;
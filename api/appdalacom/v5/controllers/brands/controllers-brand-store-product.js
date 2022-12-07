

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
const product_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search-by-option.js');
const brand_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/brands/brand-search');

const get_meta_product = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-product.js');
const option_search_by_link = require('../../../../lib/' + config_api.API_LIB_VERSION + '/option-links/option-link-search-by-product-store.js');


const category_search_by_link = require('../../../../lib/' + config_api.API_LIB_VERSION + '/categorys/category-search-by-link');



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
		var brand_id = 0;
		if(req.query.c1){
			brand_id = req.query.c1;
		}else{
			res.send({ 
				"error" : "1", 
				"position" : "api/appdalacom/v5/controller/brands/controllers-brand-store-product",
				"message": "vui lòng nhập id"
			}); 	
			return;
		}		
		//@
		//@
		var store_id = 0;
		if(req.query.c2){
			store_id = req.query.c2;
		}else{
			res.send({ 
				"error" : "101", 
				"position" : "api/appdalacom/v5/controller/brands/controllers-brand-store-product",
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
			"error" : "1001", 
			"position" : "api/appdalacom/v5/controller/brands/controllers-brand-store-product",
			"message": error_send 
		}); 
		return;	
	}	
	
	
	//res.send([store_id]);
	//return;
	
	
	
	
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
			"position" : "api/appdalacom/v5/controller/brands/controllers-brand-store-product",
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
				"position" : "api/appdalacom/v5/controller/brands/controllers-brand-store-product",
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
			"position" : "api/appdalacom/v5/controller/brands/controllers-brand-store-product",
			"message": error_send 
		}); 
		return;	
	}	
	
	
	//res.send(["ok"]);
	//return;	
	
	

	//@
	//@			
	//@
	//@
	//@ product_list
	try {
		let data_get =    
		{
		   "select_type"  : "DISTINCT",
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
						"field"     :"stores_ID",
						"value"     : store_id,
						"compare" 	: "="
					},
					{
						"field"     :"products_speciality_brand",
						"value"     : brand_id,
						"compare" 	: "="						
					}
					]    
				}         
			]
		}
	
		//@ get datas
		var data_product = await product_search(data_get,res);
		
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
			"position" : "api/appdalacom/v5/controller/brands/controllers-brand-store-product",
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
			"position" : "api/appdalacom/v5/controller/brands/controllers-brand-store-product",
			"message": error_send 
		}); 
		return;	
	}	
	
	
	
	//res.send([data_product]);
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
		//@
		//@Category list
		let data_category_list =    
		  {
			  "select_type" : "DISTINCT",
			"select_field": [
				"category_general_speciality_link_ID",
				"category_general_speciality_link_product_id",
				"category_general_speciality_link_category_general_id",
				"category_general_speciality_ID",
				"category_general_speciality_name"
			],
			"condition": [
			  {
				"relation": "and",
				"where": [
				  {
					"field": "category_general_speciality_admin_status",
					"value": "1",
					"compare": "="
				  }         
				]
			  }
			]
		  }
		
		var fn_get_category_list = new Promise((resolve, reject) => {
			let result = category_search_by_link(data_category_list,res);
			resolve(result);
		});	
		promise_all.push(fn_get_category_list);			
		
		
		
		

		//@
		//@
		//@
		//@
		//@brand_taget
		let data_brand_taget =    
		  {
			  "select_type" : "DISTINCT",
			"select_field": [
				"brands_ID",
				"brands_name"
			],
			"condition": [
			  {
				"relation": "and",
				"where": [
				  {
					"field": "brands_ID",
					"value": brand_id,
					"compare": "="
				  }         
				]
			  }
			]
		  }
		
		var fn_get_brand_taget = new Promise((resolve, reject) => {
			let result = brand_search(data_brand_taget,res);
			resolve(result);
		});	
		promise_all.push(fn_get_brand_taget);			





	
		
		//@
		//@
		//@
		//@ promise go
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
			"position" : "api/appdalacom/v5/controller/brands/controllers-brand-store-product",
			"message": error_send 
		}); 
		return;	
	}	
	
	let notes = {
		"0":"no", 
		"1":"news bussiness",
		"2":"count data new",
		"3":"store_list",
		"4":"category_list",
		"5":"option_taget",
		"6":"product_list",
	}
	
	
	
	promise_result.push(data_product);
	promise_result.push(notes);

	res.send(promise_result);
	return;
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













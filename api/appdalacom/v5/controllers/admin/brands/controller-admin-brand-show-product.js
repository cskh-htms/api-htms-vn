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
const ojs_configs = require('../../../../../../configs/config');
const config_database = require('../../../../../configs/config-database');
const config_api = require('../../../../../configs/config-api');






//@
//@
//@
//@
//@ share
const ojs_shares_show_errors = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-fetch-data.js');




//@
//@
//@
//@
//@ model database
const fields_insert = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-fields-insert');
const check_role = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_user = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-user');

const get_data_news_admin = require('../../../shares/get-data-news-admin-appdalacom-api.js');



		
const brand_get_one = require('../../../../../lib/' + 
		config_api.API_LIB_VERSION + '/brands/brand-get-one');		
		
const category_search = require('../../../../../lib/' + 
		config_api.API_LIB_VERSION + '/categorys/categorys-search');

const category_link_search = require('../../../../../lib/' + 
		config_api.API_LIB_VERSION + 	'/categorys/category-search-by-link.js'
);


const product_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search-by-brand.js');
const get_meta_product = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-product.js');





//@
//@
//@
//@
//@ 
async  function store_order_get_all(req, res, next) {

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
				"error" : "01", 
				"position" : "api->appdalacom->controller->admin->brands->show-product",
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
			"position" : "api->appdalacom->controller->admin->brands->show-product",
			"message": error_send 
		}); 
		return;	
	}		
	//res.send([brand_id]);
	//return;
	
	
	
	
	
	
	
	//@
	//@
	//@ check phân quyền
	const check_role_result = await check_role.check_role(token,res);
	if(check_role_result == "admin" ){
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
			"position" : "api->appdalacom->controller->admin->users->show-all",
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
						"field"     :"brands_ID",
						"value"     : brand_id,
						"compare" : "="						
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
			"position" : "api/appdalacom/v5/controller/categorys/controllers-category-store",
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
			"position" : "api/appdalacom/v5/controller/categorys/controllers-category-store",
			"message": error_send 
		}); 
		return;	
	}	





	//@
	//@			
	//@
	//@	
	//@ 6. category list by store
	var brand_taget = await brand_get_one(brand_id,res);








	
	

	

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
		
		
		
		//@ 4. category list
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
				  },
				  {
					"field": "products_speciality_ID",
					"value": model_product_arr,
					"compare": "in"
				  }  				  
				]
			  }
			]
		  }
		
		var fn_get_category_list = new Promise((resolve, reject) => {
			let result = category_link_search(data_category_list,res);
			resolve(result);
		});	
		promise_all.push(fn_get_category_list);		
		
		
		
		
		
		
		
		
		var promise_result = await Promise.all(promise_all);
		
		
		
	//@
	//@
	//@	
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
			"position" : "api->appdalacom->controller->admin->brands->show-product",
			"message": error_send 
		}); 
		return;	
	}	
	
	let notes = {
		"0":"no", 
		"1":"news bussiness",
		"2":"count item", 
		"3":"store taget",	
		"4":"category_list",
		"5":"product_count_all",
	}
	promise_result.push(brand_taget);
	promise_result.push(data_product);
	promise_result.push(notes);
	
	
	
	res.send(promise_result);
	return;
	
}


//@
//@
//@
//@
//@ 
module.exports = store_order_get_all;












//@
//@
//@
//@
//@ 









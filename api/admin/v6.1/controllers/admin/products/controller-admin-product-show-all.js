const express = require('express');
const router = express.Router();




const config_api = require('../../../configs/config');




const ojs_shares_show_errors = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const fields_insert = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-fields-insert');
const check_role = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_user = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-user');

const get_data_news_admin = require('../../../shares/get-data-news-admin-appdalacom-api.js');

const product_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search');

const get_meta_product = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-product.js');
const category_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/categorys/category-search');
const category_search_by_link = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/categorys/category-search-by-link');


const discount_product_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/discounts-products/discount-product-search.js');
const category_search_by_store = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/category-links/category-link-search-by-product-store.js');


//@
//@
//@
//@ exort function
async  function function_export(req, res, next) {
	//@
	//@
	//@ any thing error
	try {	
		//@
		//@
		//@ lấy data req
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
				"position" : "api->appdalacom->controller->admin->products->show-all",
				"message": error_send 
			}); 
				
		}	
		
		
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
				"position" : "api->appdalacom->controller->admin->products->show-all",
				"message": error_send 
			}); 
						
		}

		//return res.send(["adasdasdasd 1"]);
		//
		
		
		var limit_data = [];
		limit_data.push({"limit_number" : 20});
		
		//@ product_list
		try {
			let data_get =    
			{
				"select_type" : "DISTINCT",
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
								"field" : "products_speciality_status_admin",
								"value" : [1,2,4],
								"compare" : "in"
							}								
						]    
					}         
				],
				"order" :
				 [
					{    "field"  :"products_speciality_date_created",
						"compare" : "DESC"
					}   
				], 
				"limit" :limit_data	
			}
		
			//@ get datas
			var data_product = await product_search(data_get,res);
			//return res.send(data_product);
			//			
			
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
			var evn = config_api.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					error, 
					"Lỗi get data product, Vui lòng liên hệ admin" 
				);
			return res.send({ 
				"error" : "3", 
				"position" : "api->appdalacom->controller->admin->products->show-all",
				"message": error_send 
			}); 
				
		}		
			
		//return res.send([data_product]);
		//







		//@ lấy meta
		try {
			var get_meta_product_resuilt = await get_meta_product(data_product,model_product_arr,res);
			//return res.send([get_meta_product_resuilt]);
			//
			
			
		}
		catch(error){
			var evn = config_api.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					error, 
					"Lỗi get data product, Vui lòng liên hệ admin" 
				);
			return res.send({ 
				"error" : "4", 
				"position" : "api->appdalacom->controller->admin->products->show-all",
				"message": error_send 
			}); 
				
		}	

		



		
		//@
		//@
		//@
		//@ 6. category list by store
		try{		
			let data_category_list_by_store =    
			  {
				"select_field": [
					"category_general_speciality_ID",
					"category_general_speciality_name",
					"count(category_general_speciality_name)"
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
						"field": "category_general_speciality_category_parent_id	",
						"value": "0",
						"compare": "<>"
					  }				  
					]
				  }
				],
				"group_by":
					[
					"category_general_speciality_ID"
					]
			  }
			//@ get datas
			var category_by_store_resuilt = await category_search_by_store(data_category_list_by_store,res);
		}
		catch(error){
			var evn = config_api.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					error, 
					"Lỗi get data product, Vui lòng liên hệ admin" 
				);
			return res.send({ 
				"error" : "44", 
				"position" : "api->appdalacom->controller->admin->products->show-all",
				"message": error_send 
			}); 
				
		}		
		
		
		
		
		
	
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


			
			
			
			
			//@ 5.product count all
			let data_product_count_all =    
			  {
				"select_field": [
					"products_speciality_ID"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
							
							{   
								"field"     :"products_speciality_status_store",
								"value"     : "1",
								"compare" : "="
							},					
							{   
								"field"     :"products_speciality_status_admin",
								"value"     : [1],
								"compare" : "in"
							}  						
						]    
					}         
				]  
			 }
			
			var fn_get_product_count_all = new Promise((resolve, reject) => {
				let result = product_search(data_product_count_all,res);
				resolve(result);
			});	
			promise_all.push(fn_get_product_count_all);		






			//@
			//@
			//@
			//@ discount_list
			let data_discount_list =    
			  {
				"select_field": [
					"discount_program_ID",
					"discount_program_name",
					"count(discount_program_ID)"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
							{   
								"field"     :"discount_program_product_link_status",
								"value"     : "1",
								"compare" : "="
							},					
							{   
								"field"     :"check_expired",
								"value"     : 1,
								"compare" : "="
							},					
							{   
								"field"     :"discount_program_status_admin",
								"value"     : 4,
								"compare" : "="
							}  
							
						]    
					}         
				],
				"group_by": 
					[
						"discount_program_ID"
					]			
			 }
			
			var fn_get_discount_list = new Promise((resolve, reject) => {
				let result = discount_product_search(data_discount_list,res);
				resolve(result);
			});	
			promise_all.push(fn_get_discount_list);		





			//@
			//@
			//@
			//@ 5.store_list
			let data_store_list =    
			{
			   "select_field" :
				[
					"stores_ID",
					"stores_name",
					"count(stores_name)",
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"stores_status_admin",
						"value"     : "1",
						"compare" : "="
					},
					{   
						"field"     :"products_speciality_status_store",
						"value"     : "0",
						"compare" : "<>"
					}  				
					]    
				}         
			],
			"group_by":
				[
					"stores_ID"
				]
			}
			
			var fn_get_store_list = new Promise((resolve, reject) => {
				let result = product_search(data_store_list,res);
				resolve(result);
			});	
			promise_all.push(fn_get_store_list);	



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
				"position" : "api->appdalacom->controller->admin->products->show-all",
				"message": error_send 
			}); 
				
		}	

		
		

		
		
		let notes = {
			"0":"no", 
			"1":"news admin",
			"2":"category list",
			"3":"product count all",
			"4":"products list",
			"5":"category-link"
		}
		promise_result.push(data_product);	
		promise_result.push(category_by_store_resuilt);	
		
		
		
		promise_result.push(notes);

		return res.send(promise_result);
		

	//@
	//@
	//@ catch error all		
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"Lỗi không xác định. Vui lòng liên hệ bộ phận kỹ thuật hoặc  thao tác lại" 
		);
		return res.send({ 
			"error" : "1000", 
			"position":"asdasdasd",
			"message": error_send 
		}); 
					
	}
	
	
	
	//@
	//@
	//@ send error when not return data
	return res.send({ 
		"error" : "2000", 
		"position":"asdasdasd",
		"message": "Lỗi không có data return, Lỗi này khi không có dữ liệu return, Vui lòng liên hệ bộ phận kỹ thuật, hoặc thao tác lại" 
	}); 
		
	
};





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
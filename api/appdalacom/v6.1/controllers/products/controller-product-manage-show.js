const express = require('express');
const router = express.Router();



const config_api = require('../../configs/config');




const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');
const check_owner_product_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-product-store');



const get_data_news_bussiness = require('../../shares/get-data-news-bussiness-appdalacom-api.js');
const get_data_count_bussiness = require('../../shares/get-data-count-bussiness-appdalacom-api.js');

const get_meta_product = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-product.js');
const product_get_one = require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-get-one.js');
const category_link_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/category-links/category-link-search.js');
const brand_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/brands/brand-search.js');
const category_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/categorys/categorys-search.js');
const option_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/options/option-search.js');
const option_link_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/option-links/option-link-search.js');
const store_get_one = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-get-one.js');





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

		//@ lấy req data
		try {
			var token = req.headers['token'];

			//@
			//@
			var product_id = 0;
			if(req.query.c1){
				product_id = req.query.c1;
			}else{
				return res.send({ 
					"error" : "1", 
					"position" : "api->appdalacom->controller->product->manage->show",
					"message": "vui lòng nhập id"
				}); 	
				
			}	
			//@
			//@
			var store_id = 0;
			if(req.query.c2){
				store_id = req.query.c2;
			}else{
				return res.send({ 
					"error" : "1", 
					"position" : "api->appdalacom->controller->product->manage->show",
					"message": "vui lòng nhập id"
				}); 	
				
			}			
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
				"position" : "api->appdalacom->controller->product->manage->show",
				"message": error_send 
			}); 
				
		}		
		//return res.send([product_id,store_id]);
		//
		
		
		
		
		
		
		
		//@
		//@
		//@
		//@
		//@ check role phân quyền
		const check_role_result = await check_role.check_role(token,res);
		
		
		
		
		//@
		//@
		//@ 
		//@ check owner store		
		if(check_role_result == "bussiness"){			
			const check_owner_store_resuilt = await check_owner_store(token,store_id,res);
			if(	check_owner_store_resuilt == "1" ){
				//go
			}
			else{
				var evn = config_api.evn;
				////evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( 
						evn, 
						check_role_result, 
						"Lỗi phân quyền (Bạn không phải chủ cửa hàng), Vui lòng liên hệ admin" 
					);
				return res.send({ 
					"error" : "333",
					"position" : "api->appdalacom->controller->product->manage->show",
					"message": error_send 
				}); 
							
			}				
		}
		//return res.send([check_role_result,"store_ok"]);
		//
		
		
		
		
		//@
		//@
		//@ 
		//@ check owner store product	
		if(check_role_result == "bussiness"){			
			const check_owner_product_store_resuilt = await check_owner_product_store(product_id,store_id,res);
			if(	check_owner_product_store_resuilt == "1" ){
				//go
			}
			else{
				var evn = config_api.evn;
				////evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( 
						evn, 
						check_role_result, 
						"Lỗi phân quyền (Bạn không phải chủ sản phẩm này), Vui lòng liên hệ admin" 
					);
				return res.send({ 
					"error" : "345",
					"position" : "api->appdalacom->controller->product->manage->show",
					"message": error_send 
				}); 
							
			}				
		}
		//return res.send(["store_ok"]);
		//





		//@
		//@
		//@
		//@ product taget
		var data_product = await product_get_one(product_id,res);
		//return res.send([data_product]);
		//
		
		var model_product_arr = [0];
		if(data_product.length > 0){
			for(x in data_product){
				if(data_product[x].products_speciality_ID){
					model_product_arr.push(data_product[x].products_speciality_ID);
				}
			}
		}	

		var get_meta_product_resuilt = await get_meta_product(data_product,model_product_arr,res);		
		//return res.send(get_meta_product_resuilt);
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
			//@
			//@ store taget
			var fn_get_store_taget = new Promise((resolve, reject) => {
				let result = store_get_one(data_product[0].products_speciality_store_id,res);
				resolve(result);
			});	
			promise_all.push(fn_get_store_taget);
		

		
	


			//@
			//@
			//@
			//@ brand list
			let data_brand_list =    
			{
			   "select_field" :
				[
					"brands_ID",
					"brands_date_created",
					"brands_name",
					"brands_status_admin",
					"brands_status_stores",
					"brands_status_update",
					"brands_stores_id",
					"stores_ID",
					"users_ID"
				]
			}
			
			var fn_get_brand_list = new Promise((resolve, reject) => {
				let result = brand_search(data_brand_list,res);
				resolve(result);
			});	
			promise_all.push(fn_get_brand_list);	
			
			
			
			
			
			
			//@
			//@
			//@
			//@ category list
			let data_category_list =    
			{
			   "select_field" :
				[
					"category_general_speciality_ID",
					"category_general_speciality_admin_status",
					"category_general_speciality_category_parent_id",
					"category_general_speciality_date_created",
					"category_general_speciality_name",
					"category_general_speciality_show",
					"category_general_speciality_stores_id",
					"category_general_speciality_stores_status",
					"stores_ID",
					"users_ID",
					"category_general_speciality_update_status"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
							{   
								"field"     :"category_general_speciality_admin_status",
								"value"     : 1,
								"compare" : "="
							}  						
						]    
					}         
				] 
			}
			
			var fn_get_category_list = new Promise((resolve, reject) => {
				let result = category_search(data_category_list,res);
				resolve(result);
			});	
			promise_all.push(fn_get_category_list);




			
			
			//@
			//@
			//@
			//@ category link list
			let data_category_link =    
			{
			   "select_field" :
				[
					"category_general_speciality_link_ID",
					"category_general_speciality_link_category_general_id",
					"category_general_speciality_link_product_id"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"category_general_speciality_link_product_id",
						"value"     : product_id,
						"compare" : "="
					}           
					]    
				}         
			]
			}
			
			var fn_get_category_link = new Promise((resolve, reject) => {
				let result = category_link_search(data_category_link,res);
				resolve(result);
			});	
			promise_all.push(fn_get_category_link);		





			//@
			//@
			//@
			//@ option_list
			let data_option_list =    
			{
			   "select_field" :
				[
					"options_product_speciality_ID",
					"options_product_speciality_date_created",
					"options_product_speciality_name",
					"options_product_speciality_parent_id",
					"options_product_speciality_status_admin",
					"options_product_speciality_status_stores",
					"options_product_speciality_status_update",
					"options_product_speciality_stores_id",
					"stores_ID",
					"users_ID"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
							{   
								"field"     :"options_product_speciality_status_admin",
								"value"     : 1,
								"compare" : "="
							}  						
						]    
					}         
				]  
			}
			
			var fn_get_option_list = new Promise((resolve, reject) => {
				let result = option_search(data_option_list,res);
				resolve(result);
			});	
			promise_all.push(fn_get_option_list);
			
			
			
			
			//@
			//@
			//@
			//@ option link list
			let data_option_link_list =    
			{
			   "select_field" :
				[
					"options_product_speciality_link_ID",
					"options_product_speciality_link_product_id",
					"options_product_speciality_link_option_id"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"options_product_speciality_link_product_id",
						"value"     : product_id,
						"compare" : "="
					}           
					]    
				}         
			]
			}
			
			var fn_get_option_link_list = new Promise((resolve, reject) => {
				let result = option_link_search(data_option_link_list,res);
				resolve(result);
			});	
			promise_all.push(fn_get_option_link_list);				









	
		
		
			
			//@
			//@
			//@
			//@ promise go 
			var promise_result = await Promise.all(promise_all);
			
			
			
		}
		catch(error){
			var evn = config_api.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					error, 
					"Lỗi get data , Vui lòng liên hệ admin" 
				);
			return res.send({ 
				"error" : "100", 
				"position" : "api->appdalacom->controllers->admin->products->show",
				"message": error_send 
			}); 
				
		}	

		
		

		//@
		//@
		//@ add notes
		let notes = {
			"0":"no", 
			"1":"news admin",
			"2":"store-taget",
			"3":"brand-list",
			"4":"category list",
			"5":"category-link",
			"6":"option list",
			"7":"option-link",
			"8":"product taget",	
			"9":"notes",
		}
		promise_result.push(get_meta_product_resuilt);	
		//promise_result.push(category_resuilt);
		promise_result.push(notes);
		
		
		
		
		
		
		//@
		//@
		//@ send data result
		return res.send(promise_result);
		
		
		
		
		
		
	//@
	//@
	//@ catch all error	
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
			"position" : "api->appdalacom->controllers->admin->products->show",
			"message": error_send 
		}); 
			
	}	
	
	
	
	//@
	//@
	//@ send error when not return data
	return res.send({ 
		"error" : "2000", 
		"position":"api->appdalacom->controllers->admin->products->show",
		"message": "Lỗi không có data return, Lỗi này khi không có dữ liệu return, Vui lòng liên hệ bộ phận kỹ thuật, hoặc thao tác lại" 
	}); 
			
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








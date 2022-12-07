

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
const category_link_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/category-links/category-link-search-by-product-store.js');
const category_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/categorys/category-search.js');





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
			res.send({ 
				"error" : "1", 
				"position" : "api/appdalacom/v5/controller/categorys/controllers-category-store",
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
			"position" : "api/appdalacom/v5/controller/categorys/controllers-category-store",
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
			"position" : "api/appdalacom/v5/controller/categorys/controllers-category-store",
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
				"position" : "api/appdalacom/v5/controller/categorys/controllers-category-store",
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
			"position" : "api/appdalacom/v5/controller/categorys/controllers-category-store",
			"message": error_send 
		}); 
		return;	
	}	
	
	
	//res.send(["ok"]);
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
		//@lấy category_sale
		var data_category_sale =    
		{
		   "select_field" :
			[
				"category_general_speciality_ID",
				"category_general_speciality_name",
				"category_general_speciality_category_parent_id",
				"count(category_general_speciality_link_product_id)"		
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
					},
					{
						"field"     :"category_general_speciality_admin_status",
						"value"     : 1,
						"compare" : "="						
					}
					]    
				}         
			],
			"group_by":
			[
				"category_general_speciality_ID"
			]
		}
		
		var fn_get_category_sale = new Promise((resolve, reject) => {
			let result = category_link_search(data_category_sale,res);
			resolve(result);
		});	
		promise_all.push(fn_get_category_sale);				
				
		
		
		
		//@
		//@		
		//@
		//@
		//@lấy category_list
		var data_category_list =    
		{
		   "select_field" :
			[
				"category_general_speciality_ID",
				"category_general_speciality_name",
				"category_general_speciality_category_parent_id"							
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
			let result = category_search.search_category_spaciality(data_category_list,res);
			resolve(result);
		});	
		promise_all.push(fn_get_category_list);	

		
		
		
		//@
		//@		
		//@
		//@
		//@lấy category_list_create
		var data_category_list_create =    
		{
		   "select_field" :
			[
				"category_general_speciality_ID",
				"category_general_speciality_name",
				"category_general_speciality_category_parent_id",
				"category_general_speciality_admin_status",
				"stores_ID"					
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
						"compare" : "<>"						
					},
					{
						"field"     :"stores_ID",
						"value"     : store_id,
						"compare" : "="
					}
					]    
				}         
			]
		}
		
		var fn_get_category_list_create = new Promise((resolve, reject) => {
			let result = category_search.search_category_spaciality(data_category_list_create,res);
			resolve(result);
		});	
		promise_all.push(fn_get_category_list_create);			


		
		
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
			"position" : "api/appdalacom/v5/controller/categorys/controllers-category-store",
			"message": error_send 
		}); 
		return;	
	}	
	
	let notes = {
		"0":"no", 
		"1":"news bussiness",
		"2":"count data new",
		"3":"store_list",
		"4":"category_sale",
		"5":"category_list",
		"6":"category_list_create",
	}
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












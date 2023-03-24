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
const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');






//@
//@
//@
//@
//@ share
const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-fetch-data.js');




//@
//@
//@
//@
//@ model database
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');
const check_owner_category = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-category');




const get_data_news_bussiness = require('../../shares/get-data-news-bussiness-appdalacom-api.js');
const get_data_count_bussiness = require('../../shares/get-data-count-bussiness-appdalacom-api.js');


const store_get_one = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-get-one');
const category_get_one = require('../../../../lib/' + config_api.API_LIB_VERSION + '/categorys/category-get-one');
const category_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/categorys/categorys-search');



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

		//@
		//@
		//@ lấy req data
		try {
			var token = req.headers['token'];
			//@
			//@
			var category_id = 0;
			if(req.query.c1){
				category_id = req.query.c1;
			}else{
				return res.send({ 
					"error" : "01", 
					"position" : "api->appdalacom->controller->category->manage->show",
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
					"error" : "02", 
					"position" : "api->appdalacom->controller->category->manage->show",
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
				"position" : "api->appdalacom->controller->category->manage->show",
				"message": error_send 
			}); 
				
		}	
		//return res.send([category_id,store_id]);
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
				var evn = ojs_configs.evn;
				////evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( 
						evn, 
						check_role_result, 
						"Lỗi phân quyền (Bạn không phải chủ cửa hàng), Vui lòng liên hệ admin" 
					);
				return res.send({ 
					"error" : "333",
					"position" : "api->appdalacom->controller->category->manage->show",
					"message": error_send 
				}); 
							
			}				
		}
		//return res.send([check_role_result,"store_ok"]);
		//
		
		
		
		
		//@
		//@
		//@ 
		//@ check owner category		
		if(check_role_result == "bussiness"){			
			const check_owner_category_resuilt = await check_owner_category(token,category_id,res);
			if(	check_owner_category_resuilt == "1" ){
				//go
			}
			else{
				var evn = ojs_configs.evn;
				////evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( 
						evn, 
						check_role_result, 
						"Lỗi phân quyền (Bạn không phải chủ danh mục), Vui lòng liên hệ admin" 
					);
				return res.send({ 
					"error" : "345",
					"position" : "api->appdalacom->controller->category->manage->show",
					"message": error_send 
				}); 
							
			}				
		}
		//return res.send([check_role_result,"category_ok"]);
		//		
		
		
		
		
			

		
			//@
		//@
		//@
		//@ promise
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



			//@ 2. lấy count datas
			var fn_get_store_taget = new Promise((resolve, reject) => {
				let result = store_get_one(store_id,res);
				resolve(result);
			});	
			promise_all.push(fn_get_store_taget);



			//@
			//@
			//@
			//@ category taget
			var fn_get_category_taget = new Promise((resolve, reject) => {
				let result = category_get_one(category_id,res);
				resolve(result);
			});	
			promise_all.push(fn_get_category_taget);		





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
					"category_general_speciality_category_parent_id",
					"category_general_speciality_admin_status"		
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{
							"field"     :"category_general_speciality_admin_status",
							"value"     : [1,2,4],
							"compare" : "in"						
						}
						]    
					}         
				],
				"group_by":
				[
					"category_general_speciality_ID"
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
			//@ promise go 
			var promise_result = await Promise.all(promise_all);
			
			
			
		}
		catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					error, 
					"Lỗi get data review, Vui lòng liên hệ admin" 
				);
			return res.send({ 
				"error" : "100", 
				"position" : "api->appdalacom->controller->category->manage->show",
				"message": error_send 
			}); 
				
		}	

		
		

		//@
		//@
		//@ add notes
		let notes = {
			"0":"no", 
			"1":"news admin",
			"2":"category_taget",
			"3":"category-list",
			"3":"notes"
		}
		//promise_result.push(data_product);	
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
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi không xác định. Vui lòng liên hệ bộ phận kỹ thuật hoặc  thao tác lại" 
			);
		return res.send({ 
			"error" : "1000", 
			"position" : "api->appdalacom->controller->category->manage->show",
			"message": error_send 
		}); 
			
	}	
	
	
	
	//@
	//@
	//@ send error when not return data
	return res.send({ 
		"error" : "2000", 
		"position":"api->appdalacom->controller->category->manage->show",
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







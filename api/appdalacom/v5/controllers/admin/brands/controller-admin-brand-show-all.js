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


const brand_search = require('../../../../../lib/' + 
	config_api.API_LIB_VERSION + 
	'/brands/brand-search-product.js'
);


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
				"position" : "api->appdalacom->controller->admin->brand->show-all",
				"message": error_send 
			}); 
				
		}	
		
		
		
		
		
		//@
		//@
		//@ check phân quyền
		const check_role_result = await check_role.check_role(token,res);
		if(check_role_result == "admin" ){
			//go
		}
		else{
			var evn = ojs_configs.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					check_role_result, 
					"Lỗi phân quyền, Vui lòng liên hệ admin" 
				);
			return res.send({ 
				"error" : "3",
				"position" : "api->appdalacom->controller->admin->brand->show-all",
				"message": error_send 
			}); 
						
		}
		//return res.send(["ok"]);
		//
		
			

		
		//@
		//@
		//@
		//@ promise
		try{	
			var promise_all = [];
			promise_all.push(0);

			//@ 1. lấy news admin
			var fn_get_data_news_admin = new Promise((resolve, reject) => {
				let result = get_data_news_admin(res);
				resolve(result);
			});	
			promise_all.push(fn_get_data_news_admin);


			
			
			
			//@
			//@			
			//@
			//@
			//@lấy brand_list
			var data_brand_list =    
			{
			   "select_field" :
				[
					"brands_ID",
					"brands_name",
					"brands_status_admin",
					"count(brands_name)"		
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{
							"field"     :"brands_status_admin",
							"value"     : [1,2,4],
							"compare" : "in"						
						}						
						]    
					}         
				],
				"group_by":
				[
					"brands_name"
				],
				"order" :
				[
					 {    "field"  :"brands_date_created",
							"compare" : "DESC"
					 }   
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
				"position" : "api->appdalacom->controller->admin->brand->show-all",
				"message": error_send 
			}); 
				
		}	

		
		

		//@
		//@
		//@ add notes
		let notes = {
			"0":"no", 
			"1":"news admin",
			"2":"brand_list",
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
			"position" : "api->appdalacom->controller->admin->brand->show-all",
			"message": error_send 
		}); 
			
	}	
	
	
	
	//@
	//@
	//@ send error when not return data
	return res.send({ 
		"error" : "2000", 
		"position":"api->appdalacom->controller->admin->brand->show-all",
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







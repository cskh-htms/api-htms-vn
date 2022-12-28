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
const user_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-search');




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
			var user_id = 0;
			if(req.query.c1){
				user_id = req.query.c1;
			}else{
				res.send({ 
					"error" : "01", 
					"position" : "api/appdalacom/controller/admin/users/controllers-admin-users-show",
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
				"position" : "api/appdalacom/controller/admin/users/controllers-admin-users-show",
				"message": error_send 
			}); 
			return;	
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
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					check_role_result, 
					"Lỗi phân quyền, Vui lòng liên hệ admin" 
				);
			res.send({ 
				"error" : "3",
				"position" : "api/appdalacom/controller/admin/users/controllers-admin-users-show",
				"message": error_send 
			}); 
			return;			
		}
		//res.send([user_id]);
		//return;
		
			

		
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


			
			
			//@ 4. lấy coupon list
			let data_users_list =    
			{
			   "select_field" :
				[
					"users_ID",
					"users_adress",
					"users_date_created",
					"users_email",
					"users_full_name",
					"users_phone",
					"users_status",
					"users_type_ID",
					"users_type_name"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"users_ID",
						"value"     : user_id,
						"compare" : "="
					}           
					]    
				}         
			],  
			"order" :
				 [
					{
						"field"  :"users_date_created",
						"compare" : "DESC"
					}   
				] 
				
			}
			
			var fn_get_users_list = new Promise((resolve, reject) => {
				let result = user_search(data_users_list,res);
				resolve(result);
			});	
			promise_all.push(fn_get_users_list);		


			




			//@
			//@
			//@
			//@ promise go 
			var promise_result = await Promise.all(promise_all);
			
			
			
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					error, 
					"Lỗi get data review, Vui lòng liên hệ admin" 
				);
			res.send({ 
				"error" : "100", 
				"position" : "api/appdalacom/controller/admin/users/controllers-admin-users-show",
				"message": error_send 
			}); 
			return;	
		}	

		
		

		//@
		//@
		//@ add notes
		let notes = {
			"0":"no", 
			"1":"news admin",
			"2":"user_taget",
			"3":"notes"
		}
		//promise_result.push(data_product);	
		//promise_result.push(category_resuilt);
		promise_result.push(notes);
		
		
		
		
		
		
		//@
		//@
		//@ send data result
		res.send(promise_result);
		return;
		
		
		
		
		
	//@
	//@
	//@ catch all error	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi không xác định. Vui lòng liên hệ bộ phận kỹ thuật hoặc  thao tác lại" 
			);
		res.send({ 
			"error" : "1000", 
			"position" : "api/appdalacom/controller/admin/users/controllers-admin-users-show",
			"message": error_send 
		}); 
		return;	
	}	
	
	
	
	//@
	//@
	//@ send error when not return data
	res.send({ 
		"error" : "2000", 
		"position":"api/appdalacom/controller/admin/users/controllers-admin-users-show",
		"message": "Lỗi không có data return, Lỗi này khi không có dữ liệu return, Vui lòng liên hệ bộ phận kỹ thuật, hoặc thao tác lại" 
	}); 
	return;		
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







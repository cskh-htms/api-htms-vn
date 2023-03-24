const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');


const ojs_configs = require('../../../../../configs/config');


const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_date = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-date.js');

const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-fields-insert.js');
const fields_get = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-fields-get.js');

const user_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-search.js');
const user_update = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-update.js');
const user_check_lock = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-check-lock.js');

const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');

//const user_login_one = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-login-one.js');
//const user_login_lost = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-login-lost.js');
//const update_lost_password = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/update-lost-password.js');
//const token_insert_web = require('../../../../lib/' + config_api.API_LIB_VERSION + '/token/token-insert-web.js');



const ojs_shares_send_code_to_phone = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-send-code-to-phone.js');
const user_tracking_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users-trackings/user-tracking-insert.js');


//@
async  function function_export(req, res, next) {
	
	//@
	//@
	//@
	// lấy data request
	try {
		var phone = "";
		if(req.query.c1){
			phone = req.query.c1;
		}else{
			return res.send({ 
				"error" : "01", 
				"position" : "api/app/v5/ctronller/controllers-user-verification-code-lost-web",
				"message": "vui lòng nhập số điện thoại"
			}); 	
			
		}	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api/app/v5/ctronller/controllers-user-verification-code-lost-web",
			"message": error_send 
		}); 
			
	}	
	


		
	//return res.send([phone]);
	//


	//@
	//@
	//@lấy data users
	try {
		
		
		let data_get =    
		{
		   "select_field" : fields_get.fields_search_arr,
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"users_phone",
						"value"     : phone,
						"compare" : "="
					}	
					] 				
				}         
			]   
		}
		
		
		user_search(data_get,res).then( results => {
			//return res.send(results);
			//return ;
			//@
			//@
			//@ nếu có datas
			if(results.length > 0){
				
				//@
				//@

					//@
					//@
					var verification_code = Math.floor(1000 + Math.random() * 9000);
					//@
					//@
					//@
					// lưu code vào database
					try {
						
						var datas_verification = {
							"users_verification_code":verification_code,
							"users_verification_time":ojs_shares_date.get_current_date_now()
						}
						//return res.send(datas_verification);
						//	
						
						//@
						//@
						//@ lưu verification code
						user_update(datas_verification,results[0].users_ID,res).then( results2 => {
							//return res.send([results2]);
							//
							if(process.env.evn == "tester"){
								
							}else{
								ojs_shares_send_code_to_phone.send_code_to_phone(res,verification_code,phone);
							}
							

							
							return res.send( {"error" : "", "code" : verification_code} );
							
							
						}, error => {
							
							//let message_error = fields_insert.get_message_error(error);
							let message_error = "Lỗi update user";
							
							
							var evn = ojs_configs.evn;
							////evn = "dev";
							var error_send = ojs_shares_show_errors.show_error( evn, error, message_error );
							return res.send({ "error" : "7", "position":"api/app/v5/ctronller/controllers-user-verification-code-lost-web", "message": error_send } ); 
								
						});
					}
					catch(error){
						var evn = ojs_configs.evn;
						////evn = "dev";
						var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
						return res.send({ "error" : "8", "position":"api/app/v5/ctronller/controllers-user-verification-code-lost-web", "message": error_send } ); 
							
					}	
					
			//@
			//@
			//@ nếu không có datas
			}else{
					var evn = ojs_configs.evn;
					////evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, error, "Không tìm thấy users" );
					return res.send({ "error" : "10", "position":"api/app/v5/ctronller/controllers-user-verification-code-lost-web", "message": error_send } ); 
									
			}
			
		}, error => {
			var evn = ojs_configs.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data user, liên hệ bộ phận HTKT dala" );
			return res.send({ "error" : "11", "position":"api/app/v5/ctronller/controllers-user-verification-code-lost-web", "message": error_send } ); 
						
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data user, liên hệ bộ phận HTKT dala" );
			return res.send({ "error" : "12", "position":"api/app/v5/ctronller/controllers-user-verification-code-lost-web", "message": error_send } ); 
				
	}	
}

module.exports = function_export;
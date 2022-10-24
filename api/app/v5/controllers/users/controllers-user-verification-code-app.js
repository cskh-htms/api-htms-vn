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
		var token = req.headers['token'];
		var datas = req.body.datas;
		var user_id = datas.users_ID;
		
		//res.send([token,datas,user_id]);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request , Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1", 
			"position" : "api/app/v5/ctronller/controllers-user-verification-code-app",
			"message": error_send 
		}); 
		return;	
	}	
	


	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		res.send({ "error" : "2", "position":"ctl-users->get_verification_code", "message": error_send } ); 
		return;
	}	
		
	//res.send(de_token);
	//return;




	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);
	if(
	check_role_result == "customer"
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
			"error" : "22",
			"position" : "api/app/v5/ctronller/controllers-user-verification-code-app",
			"message": error_send 
		}); 
		return;			
	}


	//res.send(check_role_result);
	//return;




		
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
					"field"     :"users_ID",
					"value"     : user_id,
					"compare" : "="
				}	
				] 				
			}         
		]   
	}
	
	
	
	user_search(data_get,res).then( results => {
		//res.send(results);
		//return;
		
		//@
		//@
		//@ nếu có datas
		if(results.length > 0){
			//@
			//@
			//kiểm tra user đã xác thực số dt chưa
			//nếu xác thực rùi thì return
			//nếu chưa xác thực thì gữi max xác thực
			if(results[0].users_verification_status == "1"){
				res.send({ 
				"error" : "5", 
				"position":"api/app/v5/ctronller/controllers-user-verification-code-app", 
				"message": "User này đã xác thực rồi" } ); 
				return;						
			}
			
			//@
			//@
			// kiểm tra mã xác thực
			if(results[0].users_verification_code == datas.users_verification_code){
				//@
				//@
				//@
				//@
				//@
				//tinh htoi gian song cua code
				try {
					var date_now = Date.now();
					var date_database = Date.parse(results[0].users_verification_time);
					var date_live = date_now - date_database;
					var date_minute = Math.floor(date_live / ( 60 * 1000 ));
					//@
					//@
					// nếu quá hạn 10 phú thì là hết hạn
					if(date_minute > 10 ){
						res.send({ 
						"error" : "6", 
						"position":"api/app/v5/ctronller/controllers-user-verification-code-app", 
						"message": "hết thời gian"} ); 
						return;								
					}
					
				}
				catch(error){
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi tính thời gian code live, Liên hệ bộ phan HTKT dala" );
					res.send({ "error" : "7", "position":"api/app/v5/ctronller/controllers-user-verification-code-app", "message": error_send } );  
					return;	
				}		

				//@
				//@
				// update verification status
				try {
					
					var datas_verification = {
						"users_verification_code":"",
						"users_verification_status":1
					}
					//res.send(datas_verification);
					//return;	
					
					//@
					//@
					//@ lưu verification code
					user_update(datas_verification,user_id,res).then( results => {
						//@
						//@
						//send data
						res.send( {"error" : "", "message" : "verification ok "} );
						return;

					}, error => {
						
						let message_error = default_field.get_message_error(error);
						
						var evn = ojs_configs.evn;
						//evn = "dev";
						var error_send = ojs_shares_show_errors.show_error( evn, error, message_error );
						res.send({ "error" : "8", "position":"api/app/v5/ctronller/controllers-user-verification-code-app", "message": error_send } ); 
						return;	
					});
				}
				catch(error){
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
					res.send({ "error" : "9", "position":"api/app/v5/ctronller/controllers-user-verification-code-app", "message": error_send } ); 
					return;	
				}	
				
			}else{
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, 
				"Mã xác thực không đúng hoặc đã hết hạn", 
				"Mã xác thực không đúng hoặc đã hết hạn" );
				res.send({ "error" : "10", "position":"api/app/v5/ctronller/controllers-user-verification-code-app", "message": error_send } ); 
				return;					
			}
		//@
		//@
		//@ nếu không có datas
		}else{
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "Không tìm thấy users" );
				res.send({ "error" : "11", "position":"api/app/v5/ctronller/controllers-user-verification-code-app", "message": error_send } );  
				return;				
		}			

	}, error => {
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data user, liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "12", "position":"api/app/v5/ctronller/controllers-user-verification-code-app", "message": error_send } ); 
		return;			
	});



















}

module.exports = function_export;
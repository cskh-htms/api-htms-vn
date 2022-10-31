const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');


const ojs_configs = require('../../../../../configs/config');


const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const ojs_shares_send_code_to_phone = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-send-code-to-phone.js');
const ojs_shares_send_email = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-send-email.js');




const user_check_lock = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-check-lock.js');
const user_login_one = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-login-one.js');
const user_login_lost = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-login-lost.js');
const update_lost_password = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/update-lost-password.js');
const token_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/token/token-search-web.js');
const get_one_user = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-get-one.js');


const user_search_email_or_phone = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-search-by-email-or-phone');
const user_update_lost_password = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/update-lost-password.js');


const user_tracking_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users-trackings/user-tracking-insert.js');



//@
async  function function_export(req, res, next) {
	try {
		var datas = req.body.datas;

		//res.send(datas);
		//return;
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "2", "position":"ctl-users->lost-password-app-app", "message": error_send } );
		return;	
	}	
	
	
	//@
	//@
	//@
	//@ check login lock	
	var check_lock = await user_check_lock(datas,res);
	//res.send(check_lock);
	//return;
	//@
	//@
	//@
	if(check_lock.length > 0){
		if(check_lock[0].users_status == 1){
			res.send({ "error" : "2", "position":"ctl-users->lost-password-app", "message": "Tài khoản đang bị lock, vui lòng liên hệ CSKH DALA"} );
			return;					
		}			
	}else{
		res.send({ "error" : "3", "position":"ctl-users->lost-password-app", "message": "Không tìm thấy tài khoản trong hệ thống dala" } );
		return;				
	}



	//@
	//@
	//@
	//@ insert users tracking
	var datas_tracking = {
		"users_tracking_user_id": check_lock[0].users_ID,
		"users_tracking_action": "1",			
		"users_tracking_status": "1",
	}
	var user_tracking_insert_result = await user_tracking_insert(datas_tracking,res);	






	var regex = /^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$/;
	var name_check = datas.users_login_name;

	//res.send([name_check]);
	//return;
	
	
	//@ nếu là số điện thoại
	if (regex.test(name_check)) {
		//@
		//@
		//@ nếu là email
		//get user data
		try {
			user_search_email_or_phone( datas.users_login_name ).then( results => {
				
				//res.send([results]);
				//return;	
				
				
				if(results.length  > 0) {
					var users_role = ojs_shares_others.check_role(results[0].users_type_infomation);
					//@
					//@
					// chỉ có khách hàng với chủ cửa hàng mới dc thay đổi mật khẩu
					if(users_role == "customer"){
					}else{
						res.send({ 
						"error" : "5",
						"position":"ctl-users->lost_password", 
						"message": "chỉ có customer mới dc lost password" } ); 						
						return;					
					}
					
					
					//res.send([users_role]);
					//return;					
					//@
					//@
					//@ 
					//let txt_md5 = md5(results[0].users_ID + Math.random());
					//var txt_code = txt_md5.substring(1, 9);				
					var n_password = Math.floor(1000 + Math.random() * 9000);
					n_password = n_password.toString();
					
					
					//res.send([n_password]);
					//return;
					
					
					//@
					//@
					// update verification status
					try {
						
						var datas_verification = {
							"users_password_lost" : n_password,
							"users_login_name":datas.users_login_name
						}
						//@
						//@
						//@ lưu verification code
						user_update_lost_password(datas_verification,res).then( results2 => {
							//@
							//@
							//send data
							//res.send(results2);
							//return;


							var email_to = datas.users_login_name;
							var email_title = "DALA mật khẩu mới";
							var email_content = '<p> mật khẩu mới tại dala app : [' + n_password + ']</p>';
							
							
							//res.send([email_to,email_title,email_content]);
							//return;
							
							
							//@
							//@
							ojs_shares_send_email.send_email_lost_password(res,email_to,email_title,email_content);

						}, error => {
							
							let message_error = default_field.get_message_error(error);
							
							var evn = ojs_configs.evn;
							//evn = "dev";
							var error_send = ojs_shares_show_errors.show_error( evn, error, message_error );
							res.send({ "error" : "6", "position":"ctl-users->lost_password", "message": error_send } ); 
							return;	
						});
					}
					catch(error){
						var evn = ojs_configs.evn;
						//evn = "dev";
						var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
						res.send({ "error" : "7", "position":"ctl-users->lost_password", "message": error_send } );  
						return;	
					}					
				}else{
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
					evn, "Không tìm thấy email trong hệ thống DALA",
					"Không tìm thấy email trong hệ thống DALA" );
					res.send({ "error" : "8", "position":"ctl-users->lost_password", "message": error_send } ); 
					return;	
				}		
			}, error => {//enf model run
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
				res.send({ "error" : "9", "position":"ctl-users->lost_password", "message": error_send } );  
				return;		
			});
		}//enf of try cat
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
			res.send({ "error" : "10", "position":"ctl-users->lost_password", "message": error_send } ); 
			return;		
		}



	//@
	//@
	//@
	//@nếu data là số điện thoại
	//*
	//* 1. get all user theo phone
	//* 2. nếu có user thì update user password lost -> gữi tin nhắn về số DT
	//* 3. nếu ko có thì bào  user không tồn tại	
	}else{
		var datas_users =  await user_search_email_or_phone(datas.users_login_name,res);
		//@
		//nếu có users		
		if(datas_users.length > 0){
			
			var users_role = ojs_shares_others.check_role(datas_users[0].users_type_infomation);
			//@
			//@
			// chỉ có khách hàng với chủ cửa hàng mới dc thay đổi mật khẩu
			if(users_role == "customer"){
			}else{
				res.send({ 
				"error" : "12", 
				"position":"ctl-users->lost_password", 
				"message": "Chỉ có tài khoản customer hoặc mới được dùng chức năng quên mật khẩu"} ); 				
				return;					
			}						
			//res.send(users_role);
			//return;
			
			//@
			//@
			//@tạo mật khẩu mới
			var n_password = Math.floor(1000 + Math.random() * 9000);
			n_password = n_password.toString();
			var data_go = {
				"users_password_lost":n_password,
				"users_login_name":datas.users_login_name
			}
			
			//res.send( [data_go] ); 
			//return;				
			
			
			var datas_users_update =  await user_update_lost_password(data_go,res);
	

			//res.send( [n_password] ); 
			//return;					
			
			//@
			//@
			//@gữi đến số điện thoại	
			try{
				if(ojs_configs.domain == "http://localhost:2021"){
					res.send({ 
					"error" : "", 
					"datas":data_go
					}); 				
					return;						
				}else{
					ojs_shares_send_code_to_phone.send_code_to_phone_lost_pass(res,n_password,datas.users_login_name);
				}
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi gữi tin nhắn, Liên hệ bộ phan HTKT dala" );
				res.send({ "error" : "14", "position":"ctl-users->lost_password", "message": error_send } );  
				return;				
			}				
	
		}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "số Điện thoại không có trong hệ thống", "số Điện thoại không có trong hệ thống" );
			res.send({ "error" : "15", "position":"ctl-users->lost_password", "message": error_send } ); 
			return;					
		}
		
	}





}

module.exports = function_export;
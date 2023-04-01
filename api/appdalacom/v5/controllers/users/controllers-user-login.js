


//@
//@
//@
//@ fileds start

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');


const ojs_configs = require('../../../../../configs/config');


const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');




const user_check_lock = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-check-lock.js');
const user_login_one = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-login-one.js');
const user_login_lost = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-login-lost.js');
const update_lost_password = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/update-lost-password.js');
const update_lost_password_login = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/update-lost-password-login.js');


const token_insert_web = require('../../../../lib/' + config_api.API_LIB_VERSION + '/token/token-insert-web.js');
const user_tracking_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users-trackings/user-tracking-insert.js');

const token_delete_old = require('../../../../lib/' + config_api.API_LIB_VERSION + '/token/token-delete-old.js');
//@
//@
//@
//@ file export
async  function function_export(req, res, next) {
	
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		return res.send([req.ip]);
		//
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
			"position" : "api/appdalacom/v5/ctroller/controllers-user-login",
			"message": error_send 
		}); 
			
	}	
	

	//@
	//@
	//@
	//@ check login lock	
	var check_lock = await user_check_lock(datas,res);
	//return res.send(check_lock);
	//
	///@
	//@
	//@
	if(check_lock.length > 0){
		if(check_lock[0].users_status == 1){
			return res.send({ 
				"error" : "2", 
				"position":"api/appdalacom/v5/ctroller/controllers-user-login", 
				"message": "Tài khoản đang bị lock, vui lòng liên hệ CSKH DALA"
			});
								
		}			
	}else{
		return res.send({ 
			"error" : "3", 
			"position":"api/appdalacom/v5/ctroller/controllers-user-login", 
			"message": "Không tìm thấy tài khoản trong hệ thống dala" 
		});
						
	}


	//@
	//@
	//@
	//@ login
	var login_one = await user_login_one(datas,res);
	//return res.send(login_one);
	//

	var login_one_lost = await user_login_lost(datas,res);	
	//return res.send(login_one_lost);
	//



	//@
	//@
	//@
	//nếu pass word đúng
	if(login_one.length > 0 || login_one_lost.length > 0){
		//@
		//@
		//@
		var results;
		if(login_one.length > 0){
			results = login_one;
		}else{
			results = login_one_lost;
		}
		
		//return res.send(results);
		//
		
		try {	
		//@
			//@
			// lấy role text
			var token_type=0;
			var role_text = ojs_shares_others.check_role(results[0].users_type_infomation);
			
			//return res.send([role_text]);
			//
			
			if(role_text =="admin" 
			|| role_text == "bussiness"
			|| role_text == "bo-cong-thuong"		
			){
			}else{
				return res.send({ 
					"error" : "8", 
					"position":"api/appdalacom/v5/ctroller/controllers-user-login", 
					"message": "Lỗi phân quyền chỉ có ảun trị mới login ở đây, vui lòng đổi user login"
				}); 				
				
			}
			
			//@
			if(role_text =="admin" || role_text =="bo-cong-thuong"){
				token_type = 0;
			}
			if(role_text =="bussingess"){
				token_type = 1;
			}				
			if(role_text =="shipping"){
				token_type = 4;
			}				
			
			//@
			//@
			//tạo token send data
			var payload = { 
				"users_ID": results[0].users_ID, 
				"users_full_name" :  results[0].users_full_name, 
				"user_role":role_text
			};
			var token = jwt.sign(payload, ojs_configs.jwt_secret, {});
			
			//return res.send([token]);
			//
	
		}
		catch (error){
			var evn = ojs_configs.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi jwt, liên hệ CSKH DALA" );
			return res.send({ 
				"error" : "10", 
				"position":"api/appdalacom/v5/ctroller/controllers-user-login", 
				"message": error_send 
			});
				
		}		
		
		
		
		//@
		//@
		//@
		//@
		try {
	
			//@
			//@
			//tạo token database data				
			var payload_database = { 
				"users_ID": results[0].users_ID, 
				"users_full_name": results[0].users_full_name,
				"users_phone": results[0].users_phone,
				"users_email": results[0].users_email,
				"users_password":md5(datas.users_password),
				"user_role":role_text
			};
			
			var token_database = jwt.sign(payload_database, ojs_configs.jwt_secret, {});		
			
			//return res.send([payload_database,token_database]);
			//
			
			var data_insert = {
				"datas": {
					"token_key": token,
					'token_type':token_type,
					"token_value": token_database,
					"token_user_id": results[0].users_ID
				}
			}
			
			//return res.send(data_insert);
			//		
			
			
		}
		catch (error){
			var evn = ojs_configs.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
				evn,
				error, 
				"Lỗi jwt 2, liên hệ CSKH DALA" 
			);
			return res.send({ 
				"error" : "11", 
				"position":"api/appdalacom/v5/ctroller/controllers-user-login", 
				"message": error_send 
			});
				
		}		
		
		
		
		//@
		//@
		//@
		//update lost qua password
		if(login_one_lost.length > 0){
			var update_lost_password_result = await update_lost_password_login(datas,res);		
		}
		
		//@
		//@
		//@
		//update lost qua password
		var token_insert_web_result = await token_insert_web(data_insert,res);
		
		
		//@
		//@
		//@
		//@ delete token cũ
		var data_delete = {
			"token_key": token,
			'token_type':token_type,
			"token_value": token_database,
			"token_user_id": results[0].users_ID
		}			
		
		var token_delete_old_result = await token_delete_old(data_delete,res);		
		
		
		
		var payload_go = {
			"token":token
		}
		var datas_ob = Object.assign(payload, payload_go);

		let datas_return = { "error" : "","token":token,"datas" : datas_ob };
		
		
		var datas_tracking = {
			"users_tracking_user_id": check_lock[0].users_ID,
			"users_tracking_action": "0",			
			"users_tracking_status": "0",
		}
		//let user_tracking_insert_OK = await user_tracking_insert(datas_tracking,res);		
		
		
		
		return res.send( datas_return );
				
				
		
	//@
	//@ nếu mật khẩu không đúng
	}else{
		var datas_tracking = {
			"users_tracking_user_id": check_lock[0].users_ID,
			"users_tracking_action": "0",			
			"users_tracking_status": "1",
		}
		//let user_tracking_insert_result = await user_tracking_insert(datas_tracking,res);
		
		//return res.send(user_tracking_insert_result);
		//
		
		
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"user hoặc mật khẩu không đúng", 
			"user hoặc mật khẩu không đúng" 
		);
		return res.send({ 
			"error" : "15", 
			"position":"api/appdalacom/v5/ctroller/controllers-user-login", 
			"message": error_send 
		});
				
	}

	
}




//@
//@
//@
//@ export
module.exports = function_export;













//@
//@
//@
//@ fileds end







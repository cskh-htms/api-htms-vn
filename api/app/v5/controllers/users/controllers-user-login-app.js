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



//@
async  function function_export(req, res, next) {
	
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		//res.send(datas);
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
			"position" : "api/web/v5/ctroller/controllers-user-login-web",
			"message": error_send 
		}); 
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
			res.send({ "error" : "2", "position":"ctl-users->login_app", "message": "Tài khoản đang bị lock, vui lòng liên hệ CSKH DALA"} );
			return;					
		}			
	}else{
		res.send({ "error" : "3", "position":"ctl-users->login_app", "message": "Không tìm thấy tài khoản trong hệ thống dala" } );
		return;				
	}


	//@
	//@
	//@
	//@ login
	var login_one = await user_login_one(datas,res);
	//res.send(login_one);
	//return;

	var login_one_lost = await user_login_lost(datas,res);	
	//res.send(login_one_lost);
	//return;



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
		
		//res.send(results);
		//return;
		
		try {	
		//@
			//@
			// lấy role text
			var token_type=0;
			var role_text = ojs_shares_others.check_role(results[0].users_type_infomation);
			
			//res.send(role_text);
			//return;
			
			if(role_text =="customer" || role_text == "default"){
			}else{
				res.send({ "error" : "8", "position":"ctl-users->login_web", "message": "Lỗi phân quyền, vui lòng đổi user login"} ); 				
				return;
			}
			
			//@
			if(role_text =="customer"){
				token_type = 4;
			}
			if(role_text =="default"){
				token_type = 0;
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
			
			//res.send([token]);
			//return;
	
		}
		catch (error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi jwt, liên hệ CSKH DALA" );
			res.send({ "error" : "10", "position":"ctl-users->login_web", "message": error_send } );
			return;	
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
			
			//res.send([payload_database,token_database]);
			//return;
			
			var data_insert = {
				"datas": {
					"token_key": token,
					'token_type':token_type,
					"token_value": token_database,
					"token_user_id": results[0].users_ID
				}
			}
			
			//res.send(data_insert);
			//return;		
			
			
		}
		catch (error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi jwt 2, liên hệ CSKH DALA" );
			res.send({ "error" : "11", "position":"ctl-users->login_web", "message": error_send } );
			return;	
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
		
		var payload_go = {
			"token":token
		}
		var datas_ob = Object.assign(payload, payload_go);

		let datas_return = { "error" : "","token": token,"datas" : datas_ob };
		res.send( datas_return );
		return;		
				
		
	//@
	//@ nếu mật khẩu không đúng
	}else{
		var datas_tracking = {
			"users_tracking_user_id": check_lock[0].users_ID,
			"users_tracking_action": "0",			
			"users_tracking_status": "1",
		}
		let user_tracking_insert_result = await user_tracking_insert(datas_tracking,res);
		
		//res.send(user_tracking_insert_result);
		//return;
		
		
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "user hoặc mật khẩu không đúng", "user hoặc mật khẩu không đúng" );
		res.send({ "error" : "15", "position":"ctl-users->login_web", "message": error_send } );
		return;		
	}

	
}

module.exports = function_export;
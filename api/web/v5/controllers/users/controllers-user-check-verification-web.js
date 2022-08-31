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
		var newPayload = jwt.decode(token);
		var user_id = newPayload.users_ID
		//res.send([user_id]);
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
			"position" : "api/web/v5/ctronller/controllers-user-verification-code-web",
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
	if(	check_role_result == "customer"	){
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
			"position" : "api/web/v5/ctroller/ctl-users->get_verification_code",
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
	
	
	
	var user_search_result = await user_search(data_get,res);
	//res.send(user_search_result);
	//return;
	
	if(user_search_result.users_verification_status == 1){
		res.send({"error":"","datas":{"status":1,"message":"đã xác thực"}});
		return;
	}else{
		res.send({"error":"","datas":{"status":0,"message":"chưa xác thực"}});
		return;		
	}













}

module.exports = function_export;
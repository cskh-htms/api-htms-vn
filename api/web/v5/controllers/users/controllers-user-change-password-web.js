const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');


const ojs_configs = require('../../../../../configs/config');


const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');


const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const user_update = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-update.js');



//@
async  function function_export(req, res, next) {
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		var user_id = req.params.user_id;
		
		var de_token = jwt.decode(token);		
		if(user_id != de_token.users_ID){
			res.send({ 
				"error" : "01", 
				"position" : "api/web/v5/ctronller/controllers-user-change-password-web",
				"message": "user không khớp với phiên làm việc"
			}); 	
			return;			
		}		
		
		//res.send([datas,user_id,de_token]);
		//return;
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "2", "position":"ctl-users->change-password", "message": error_send } );
		return;	
	}	
	





	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		res.send({ "error" : "2", "position":"controllers-user-get-by-id-web", "message": error_send } ); 
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
			"position" : "api/web/v5/ctronller/controllers-user-change-password-web",
			"message": error_send 
		}); 
		return;			
	}


	//res.send(check_role_result);
	//return;



	//@ insert	
	var result = await user_update(datas,user_id,res);
	res.send({"error":"","datas":result});
	return;

}

module.exports = function_export;
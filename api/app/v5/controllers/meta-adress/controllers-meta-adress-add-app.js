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


const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/meta-adress/meta-adress-fields-insert.js');
const fields_get = require('../../../../lib/' + config_api.API_LIB_VERSION + '/meta-adress/meta-adress-fields-get.js');


const meta_adress_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/meta-adress/meta-adress-insert.js');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');





//@
async  function function_export(req, res, next) {
	
	//@
	//@
	//@
	// lấy data request
	try {
		var token = req.headers['token'];
		var datas  = req.body.datas;	
		var newPayload = jwt.decode(token);
		if(!datas.adress_meta_user_id){
			res.send({ 
				"error" : "01", 
				"position" : "api/app/v5/controller/controllers-meta-adress-add-app",
				"message": "vui lòng nhập id user" 
			}); 
			return;	
		}
		 
		//@
		//@
		if(datas.adress_meta_user_id != newPayload.users_ID){
			res.send({ 
				"error" : "02", 
				"position" : "api/app/v5/controller/controllers-meta-adress-add-app",
				"message": "Quyền thao tác không hợp lệ" 
			}); 
			return;	
		}		
		//res.send([datas ,token]);
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
			"position" : "api/app/v5/controller/controllers-meta-adress-add-app",
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
		res.send({ "error" : "2", "position":"api/app/v5/controller/controllers-meta-adress-add-app", "message": error_send } ); 
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
			"position" : "api/app/v5/controller/controllers-meta-adress-add-app",
			"message": error_send 
		}); 
		return;			
	}


	//res.send(check_role_result);
	//return;




	//@
	//@
	//@
	//@ check login lock	
	try{

		var meta_adress_insert_result= await meta_adress_insert(datas,res);
		
		res.send(meta_adress_insert_result);
		return ;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data  , Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "5", 
			"position" : "api/app/v5/controller/controllers-meta-adress-add-app",
			"message": error_send 
		}); 
		return;	
	}			
		

}

module.exports = function_export;
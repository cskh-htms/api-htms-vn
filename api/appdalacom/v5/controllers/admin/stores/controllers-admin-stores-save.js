


//@
//@
//@
//@
//@ file start
const express = require('express');
const router = express.Router();

const ojs_configs = require('../../../../../../configs/config');
const config_database = require('../../../../../configs/config-database');
const config_api = require('../../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');


const check_role = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');

const store_insert = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-insert');




//@
//@
//@
//@
//@ file start
async  function function_export(req, res, next) {
	
	
	//@ lấy req data
	try {
		var token = req.headers['token'];
		var datas = req.body.datas;
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
			"position" : "controller->api-appdalacom->controllers-admin/store-save",
			"message": error_send 
		}); 
		return;	
	}	
	
	//res.send(datas);
	//return;
	
	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);
	if(
		check_role_result == "admin" 
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
			"error" : "3",
			"position" : "controller->api-appdalacom->controllers-admin/store-save", 
			"message": error_send 
		}); 
		return;			
	}
	//res.send([check_role_result]);
	//return;

	
	
	
	
	
	//@
	//@
	//@
	//@go  
	var store_insert_result = await store_insert(datas,res);
	
	res.send({"error":"","datas":store_insert_result});
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












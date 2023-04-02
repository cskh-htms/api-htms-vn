const express = require('express');
const router = express.Router();



const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + 
	config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
	
const ojs_shares_others = require('../../../../shares/' + 
	config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const ojs_shares_fetch_data = require('../../../../shares/' + 
	config_api.API_SHARES_VERSION + '/ojs-shares-fetch-data');





//@
//@
//@
//@
//@ function export
async  function function_export(req, res, next) {
	
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body;
		if(datas.users_password == ""){
			return res.send({ 
				"error" : "01", 
				"position" : "api/app/v5/ctroller/controllers-user-login-app-clinet",
				"message": "Vui lòng nhập mật khẩu"
			}); 				
		}		
		//return res.send(datas);
		
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
			"position" : "api/app/v5/ctroller/controllers-user-login-app-clinet",
			"message": error_send 
		}); 
			
	}	
	
	
	
	//@
	//@
	//@ call api			
	var data_api_resuilt = await ojs_shares_fetch_data.get_data_no_token_post(
			ojs_configs.domain + '/api/app/' + 
			config_api.API_APPDALACOM_VERSION + 
			'/users/login', 
			datas
		);				
	return res.send( data_api_resuilt );	
	
}

module.exports = function_export;
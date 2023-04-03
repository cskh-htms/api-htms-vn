
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
//@ function-export
async  function function_export(req, res, next) {
	
	try {
		var datas = req.body;
		var token = req.headers['token'];

	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request insert order, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3", 
			"position" : "api/web/v5/controller/order/orders-insert-web",
			"message": error_send 
		}); 
			
	}


	//@
	//@
	//@ call api			
	var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/web/' + 
			config_api.API_APPDALACOM_VERSION + 
			'/orders/insert', 
			datas,
			token
		);				
	return res.send( data_api_resuilt );	
}



module.exports = function_export;


//@
//@	
//@	
//@ end
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
		var token = req.headers['token'];
		
		var url_c = "";
		

		if(req.query.c1){
			c1 = req.query.c1;
			url_c = url_c + '?c1=' + c1
			
		}	
	
		
		//@
		//@ limit
		if(req.query.c2){
			c2 = req.query.c2;
			url_c = url_c + '&c2=' + c2
		}	
		
		if(req.query.c3){
			c3 = req.query.c3;
			url_c = url_c + '&c3=' + c3
		}			
				
		
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
			"position" : "api/app/v5/ctroller/news/get-by-id-client",
			"message": error_send 
		}); 
			
	}

	//@
	//@
	//@ call api			
	var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_get(
			ojs_configs.domain + '/api/app/' + 
			config_api.API_APPDALACOM_VERSION + 
			'/news/get-by-id' + url_c, 
			token
		);				
	return res.send( data_api_resuilt );	
}



module.exports = function_export;


//@
//@	
//@	
//@ end
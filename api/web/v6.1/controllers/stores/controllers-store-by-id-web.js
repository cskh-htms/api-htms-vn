const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const multer = require('multer');
const WPAPI = require( 'wpapi' );



const config_api = require('../../configs/config');




const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_get = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-fields-get.js');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');

const store_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-search.js');

//@
async  function function_export(req, res, next) {
	
	//@ lấy req data
	try {
		var token = req.headers['token'];
		
		var store_id = 0;
		if(req.query.c1){
			store_id = req.query.c1;
		}else{
			return res.send({ 
				"error" : "1", 
				"position" : "api/web/v5/ctroller/stores/controllers-store-by-id-web",
				"message": "vui lòng nhập id"
			}); 	
			
		}
		//return res.send(store_id);
		//
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api/web/v5/ctroller/stores/controllers-store-by-id-web",
			"message": error_send 
		}); 
			
	}




	//@ lấy req data
	try {
		//@ 3. get model
		let data_get =    
		{
		   "select_field" :fields_get.fields_search_arr,
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"stores_ID",
						"value"     : store_id,
						"compare" : "="
					}
					]    
				}         
			]   
		}
	
	
		//@ get datas
		let result = await store_search(data_get,res);
		return res.send({"error":"","datas":result}); 
		


	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3", 
			"position" : "api/web/v5/ctroller/stores/controllers-store-by-id-web",
			"message": error_send 
		}); 
			
	}		
	
}

module.exports = function_export;
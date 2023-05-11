const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const multer = require('multer');
const WPAPI = require( 'wpapi' );

const ojs_configs = require('../../../../../configs/config');


const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts/discount-fields-insert');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');

const store_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-search.js');


//@
async  function controllers_store_app(req, res, next) {
	
	try {
		var token = req.headers['token'];	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data store, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api/app/v5/ctroller//store/controllers-store-app",
			"message": error_send 
		}); 
			
	}



	//@ lấy req data
	try {
		//@ 3. get model
		let data_get =    
		{
		   "select_field" :
			[
				"stores_ID",
				"stores_name",
				"stores_logo_image",
				"stores_date_created",
				"stores_sort_order"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"stores_status_admin",
						"value"     : "1",
						"compare" : "="
					}	
					] 				
				}         
			],
			"order" :
			 [		 
				{    
					"field"  :"stores_sort_order",
					"compare" : "ASC"
				}			
			]    
		}
	
		//@ get datas
		var data_store = await store_search(data_get,res);

	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data store, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3", 
			"position" : "api/app/v5/ctroller//store/controllers-store-app",
			"message": error_send 
		}); 
			
	}		
		





	return res.send({"error":"","datas":data_store}); 
	
	
}

module.exports = controllers_store_app;




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

const discount_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts/discount-search.js');



//@
async  function controllers_discount_by_position_app(req, res, next) {
	
	//@ lấy req data
	try {
		var token = req.headers['token'];
		var store_id = -1;
		if(req.query.c1){
			store_id = req.query.c1;
		}
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
			"position" : "api/app/v5/ctroller/discounts/controllers-discount-by-store-app",
			"message": error_send 
		}); 
		return;	
	}


	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);
	if(
	check_role_result == "customer" 
	|| check_role_result == "default" 
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
			"error" : "2",
			"position" : "api/app/v5/ctroller/discounts/controllers-discount-by-store-app",
			"message": error_send 
		}); 
		return;			
	}

	//@ lấy req data
	try {
		//@ 3. get model
		let data_get =    
		{
		   "select_field" :
			[
				"discount_program_ID",
				"discount_program_featured_image",
				"discount_program_name",
				"stores_ID",
				"stores_name"				
			],
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
					},
					{   
						"field"     :"discount_program_status_admin",
						"value"     : "4",
						"compare" : "="
					},
					{   
						"field"     :"check_expired",
						"value"     : 0,
						"compare" : ">"
					}, 
					{   
						"field"     :"stores_status_admin",
						"value"     : "1",
						"compare" : "="
					}, 
					{   
						"field"     :"discount_program_type",
						"value"     : "0",
						"compare" : "="
					}
					]    
				}         
			]   
		}
	
	
		//@ get datas
		let result = await discount_search(data_get,res);
		
		
		res.send({"error":"","datas":result}); 
		return;
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
			"error" : "3", 
			"position" : "api/app/v5/ctroller/discounts/controllers-discount-by-store-app",
			"message": error_send 
		}); 
		return;	
	}		
		

	res.send({"error":"","datas":result}); 
	return;
	
}

module.exports = controllers_discount_by_position_app;
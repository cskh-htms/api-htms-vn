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
		var position_number = 1000;
		if(req.query.c1){
			position_number = req.query.c1;
		}
		
		
		var condition_where = [];
		
		
		condition_where.push(
			{   
				"field"     :"discount_program_status_admin",
				"value"     : 4,
				"compare" : "="
			} 
		);	


		
		
		if(position_number == 0){
			condition_where.push(
				{   
					"field"     :"discount_program_position",
					"value"     : [position_number,6],
					"compare" : "in"
				} 
			);
		}else{
			condition_where.push(
				{   
					"field"     :"discount_program_position",
					"value"     : [position_number],
					"compare" : "in"
				} 
			);		
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
			"position" : "api/web/v5/ctroller/discounts/controllers-discount-by-position-app",
			"message": error_send 
		}); 
		return;	
	}




	//@ 3. get model
	let data_get =    
	{
	   "select_field" :
		[
			"discount_program_ID",
			"discount_program_featured_image",
			"discount_program_name"					
		],
		"condition" :
		[
			{    
			"relation": "and",
			"where" :condition_where   
			}         
		]   
	}
	
	//@ get datas
	let result = await discount_search(data_get,res);

	res.send({"error":"","datas":result}); 
	return;
	
}

module.exports = controllers_discount_by_position_app;
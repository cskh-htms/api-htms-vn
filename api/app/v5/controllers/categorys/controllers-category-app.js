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

const category_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/categorys/category-search.js');





//@
async  function controllers_category_app(req, res, next) {
	
	//@ lấy req data
	try {
		var token = req.headers['token'];
		/*
		var category_id = -1;
		if(req.query.c1){
			store_id = req.query.c1;
		}
		*/
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
			"position" : "api/app/v5/ctroller/category/controllers-category-app",
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
				"category_general_speciality_ID",
				"category_general_speciality_name",
				"category_general_speciality_featured_image",
				"category_general_speciality_sort_order"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"category_general_speciality_admin_status",
						"value"     : "1",
						"compare" : "="
					},
					{   
						"field"     :"category_general_speciality_category_parent_id",
						"value"     : "0",
						"compare" : "="
					},
					{   
						"field"     :"category_general_speciality_show",
						"value"     : "0",
						"compare" : "="
					}
					]    
				}         
			],
			"order" :
			 [		 
				{    
					"field"  :"category_general_speciality_sort_order",
					"compare" : "DESC"
				}, 
				{    
					"field"  :"category_general_speciality_ID",
					"compare" : "ASC"
				} 				
			]    
		}
	
	
		//@ get datas
		let result = await category_search.search_category_spaciality(data_get,res);
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
			"position" : "api/app/v5/ctroller/category/controllers-category-app",
			"message": error_send 
		}); 
		return;	
	}		
		

	res.send({"error":"","datas":result}); 
	return;
	
}

module.exports = controllers_category_app;
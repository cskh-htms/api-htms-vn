const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const multer = require('multer');
const WPAPI = require( 'wpapi' );

const config_api = require('../../configs/config');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts/discount-fields-insert');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');

const category_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/categorys/category-search.js');


const category_link_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/category-links/category-link-search-by-product-store.js');



//@
async  function function_export(req, res, next) {
	
	//@ lấy req data
	try {
		var token = req.headers['token'];
		
		var category_id = -1;
		if(req.query.c1){
			category_id = req.query.c1;
		}
		//return res.send(category_id);
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
			"position" : "api/web/v5/ctroller/category/controllers-category-by-parent-web",
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
				"category_general_speciality_ID",
				"category_general_speciality_name",
				"category_general_speciality_featured_image",
				"count(category_general_speciality_name)",				
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
						"value"     : category_id,
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
			"group_by": 
			[
			"category_general_speciality_ID"
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
		let result = await category_link_search(data_get,res);
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
			"position" : "api/web/v5/ctroller/category/controllers-category-by-parent-web",
			"message": error_send 
		}); 
			
	}		
	
}

module.exports = function_export;
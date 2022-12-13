const express = require('express');
const router = express.Router();

const ojs_configs = require('../../../../../configs/config');

const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts/discount-fields-insert');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');

const category_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/categorys/category-search-by-product.js');

const category_link_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/category-links/category-link-search-by-product-store.js');



//@
async  function function_export(req, res, next) {
	
	//@ lấy req data
	try {
		var token = req.headers['token'];
		
		var store_id = 0;
		if(req.query.c1){
			store_id = req.query.c1;
		}else{
			res.send({ 
				"error" : "1", 
				"position" : "api/web/v5/ctroller/category/controllers-category-by-store-id-web",
				"message": "vui lòng nhập id"
			}); 	
			return;
		}
		//res.send(store_id);
		//return;
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
			"position" : "api/web/v5/ctroller/category/controllers-category-by-store-id-web",
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
				"count(category_general_speciality_name)"				
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
						"field"     :"category_general_speciality_admin_status",
						"value"     : 1,
						"compare" : "="
					},
					{   
						"field"     :"category_general_speciality_category_parent_id",
						"value"     : 0,
						"compare" : "<>"
					}
					]    
				}         
				],
				"group_by": 
				[
				"category_general_speciality_ID"
				]			
			}
	
	
		//@ get datas
		let result = await category_link_search(data_get,res);
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
			"position" : "api/web/v5/ctroller/category/controllers-category-by-store-id-web",
			"message": error_send 
		}); 
		return;	
	}		
	
}

module.exports = function_export;
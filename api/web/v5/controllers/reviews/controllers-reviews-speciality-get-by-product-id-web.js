const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');


const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');


const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_date = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-date.js');


const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-fields-insert.js');
const fields_get = require('../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-fields-get.js');


const review_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-search.js');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');





async  function function_export(req, res, next) {
	
	//@ lấy req data
	try {
		var token = req.headers['token'];
		
		var product_id = 0;
		if(req.query.c1){
			product_id = req.query.c1;
		}else{
			res.send({ 
				"error" : "1", 
				"position" : "api/web/v5/ctroller/reviews/controllers-reviewr-get-by-product-id-web",
				"message": "vui lòng nhập id"
			}); 	
			return;
		}
		//res.send(product_id);
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
			"position" : "api/web/v5/ctroller/reviews/controllers-reviewr-get-by-product-id-web",
			"message": error_send 
		}); 
		return;	
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
						"field"     :"reviews_speciality_product_id",
						"value"     : product_id,
						"compare" : "="
					}
					]    
				}         
			]   
		}
	
		//res.send({"error":"","datas":data_get}); 
		//return;


	
		//@ get datas
		var result = await review_search.search_reviews_spaciality(data_get,res);
		
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
			"position" : "api/web/v5/ctroller/reviews/controllers-reviewr-get-by-product-id-web",
			"message": error_send 
		}); 
		return;	
	}

}

module.exports = function_export;
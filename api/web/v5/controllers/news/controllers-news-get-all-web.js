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
const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/news/news-fields-insert.js');
const fields_get = require('../../../../lib/' + config_api.API_LIB_VERSION + '/news/news-fields-get.js');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');

const news_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/news/news-search.js');



//@
async  function controllers_product_by_category_app(req, res, next) {
	
	try {
		var token = req.headers['token'];
		
		var limit_data = [];
		if(req.query.c2){
			  limit_data.push({"limit_number" : req.query.c2});
		}		
		if(req.query.c3){
			  limit_data.push({"limit_offset" : req.query.c3});
		}			
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request , Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1", 
			"position" : "api/web/v5/ctroller/controllers-news/get-all-web",
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
			"position" : "api/web/v5/ctroller/controllers-news/get-all-web",
			"message": error_send 
		}); 
		return;			
	}


	try{
		//@ 3. get model
			let data_get =    
			{
			   "select_type" : "DISTINCT",
			   "select_field" :
				[
					"news_ID",
					"news_title",
					"news_date_created",
					"news_featured_image",
					"news_excerpt",
					"news_contents",
					"news_status_admin"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[			
						{   
							"field"     :"news_status_admin",
							"value"     : "1",
							"compare" : "="
						}
						] 				
					}         
				],
				"order" :
				 [		 
					{    
						"field"  :"news_date_created",
						"compare" : "DESC"
					}			
				 ],
				 "limit" :limit_data
			}


		//res.send(data_get);
		//return;


		//@ get datas
		var data_return = await news_search(data_get,res);
		res.send(data_return);
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
			"position" : "api/web/v5/ctroller/news/get-all-web",
			"message": error_send 
		}); 
		return;	
	}		

}

module.exports = controllers_product_by_category_app;
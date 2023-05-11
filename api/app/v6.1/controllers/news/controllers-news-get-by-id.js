const express = require('express');
const router = express.Router();


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
		
		var news_id = -1;
		if(req.query.c1){
			news_id = req.query.c1;
		}			
		
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
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api/app/v5/ctroller/news/get-by-id",
			"message": error_send 
		}); 
			
	}



	//return res.send([news_id]);
	//



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
							"field"     : "news_ID",
							"value"     : news_id,
							"compare" : "="
						}
						] 				
					}         
				]
			}


		//return res.send(data_get);
		//


		//@ get datas
		var data_return = await news_search(data_get,res);
		return res.send({"error":"","datas":data_return});
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3", 
			"position" : "api/app/v5/ctroller/news/get-by-id",
			"message": error_send 
		}); 
			
	}		

}

module.exports = controllers_product_by_category_app;
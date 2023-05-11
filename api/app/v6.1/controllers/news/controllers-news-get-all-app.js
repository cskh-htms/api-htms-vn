const express = require('express');
const router = express.Router();


const config_api = require('../../configs/config');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts/discount-fields-insert');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');

const news_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/news/news-search.js');


//@
async  function controllers_store_app(req, res, next) {
	
	try {
		var token = req.headers['token'];	
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data store, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api/app/v5/controller/news/controllers-news-app",
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
			]    
		}
	
		//@ get datas
		var data_store = await news_search(data_get,res);

	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data store, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3", 
			"position" : "api/app/v5/controller/news/controllers-news-app",
			"message": error_send 
		}); 
			
	}		
		





	return res.send({"error":"","datas":data_store}); 
	
	
}

module.exports = controllers_store_app;
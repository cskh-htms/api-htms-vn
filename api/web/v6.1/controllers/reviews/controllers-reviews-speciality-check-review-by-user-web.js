const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');




const config_api = require('../../configs/config');





const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_date = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-date.js');


const fields_get = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-fields-get.js');


const order_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search-by-customer.js');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');





async  function function_export(req, res, next) {
	
	//@ lấy req data
	try {
		var token = req.headers['token'];
		
		var user_id = 0;
		if(req.query.c1){
			user_id = req.query.c1;
		}else{
			return res.send({ 
				"error" : "1", 
				"position" : "api/web/v5/ctroller/reviews/controllers-reviewr-check-review-by-user-web",
				"message": "vui lòng nhập user id"
			}); 	
			
		}
		
		var product_id = 0;
		if(req.query.c2){
			product_id = req.query.c2;
		}else{
			return res.send({ 
				"error" : "11", 
				"position" : "api/web/v5/ctroller/reviews/controllers-reviewr-check-review-by-user-web",
				"message": "vui lòng nhập product id"
			}); 	
			
		}		
		
		//return res.send([user_id,product_id]);
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
			"error" : "111", 
			"position" : "api/web/v5/ctroller/reviews/controllers-reviewr-check-review-by-user-web",
			"message": error_send 
		}); 
			
	}



	
	
	//return res.send([check_role_result]);
	//	
	

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
						"field"     :"orders_speciality_user_id",
						"value"     : user_id,
						"compare" : "="
					},
					{   
						"field"     :"products_speciality_ID",
						"value"     : product_id,
						"compare" : "="
					},
					{   
						"field"     :"orders_speciality_status_orders",
						"value"     : 100,
						"compare" : "="
					}						
					]    
				}         
			]   
		}
	
		//return res.send({"error":"","datas":data_get}); 
		//


	
		//@ get datas
		var result = await order_search(data_get,res);
		
		if(result.length > 0){
			return res.send({"error":"","datas":1}); 
			
		}else{
			return res.send({"error":"","datas":0}); 
						
		}
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
			"position" : "api/web/v5/ctroller/reviews/controllers-reviewr-check-review-by-user-web",
			"message": error_send 
		}); 
			
	}

}

module.exports = function_export;
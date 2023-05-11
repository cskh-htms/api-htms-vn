const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const multer = require('multer');
const WPAPI = require( 'wpapi' );



const config_api = require('../../configs/config');




const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_get = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-fields-get.js');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');

const order_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search-by-customer.js');
const get_meta_order = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-orders.js');
//@
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
				"position" : "api/web/v5/ctroller/orders/controllers-order-get-by-user-id-web",
				"message": "vui lòng nhập id"
			}); 	
			
		}
		//return res.send(user_id);
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
			"position" : "api/web/v5/ctroller/orders/controllers-order-get-by-user-id-web",
			"message": error_send 
		}); 
			
	}




	//@ lấy req data
	try {
		//@ 3. get model
		let data_get =    
		{
			"select_type":"DISTINCT",
		   "select_field" :fields_get.fields_search_arr,
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"orders_speciality_master_user_id",
						"value"     : user_id,
						"compare" : "="
					}
					]    
				}         
			]   
		}
	
		//return res.send({"error":"","datas":data_get}); 
		//


	
		//@ get datas
		var order_result = await order_search(data_get,res);
		
		var order_arr = [];
		if(order_result.length > 0){
			for(x in order_result){
				if(order_result[x].orders_speciality_ID){
					order_arr.push(order_result[x].orders_speciality_ID);
				}
			}
		}			
		
		//return res.send({"error":"","datas":order_arr}); 
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
			"error" : "3", 
			"position" : "api/web/v5/ctroller/orders/controllers-order-get-by-user-id-web",
			"message": error_send 
		}); 
			
	}


	//get meta order
	var get_meta_order_resuilt = await get_meta_order(order_result,order_arr,res);

	return res.send({"error":"","datas":get_meta_order_resuilt}); 
	


}

module.exports = function_export;
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
const check_owner = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-order-customer.js');

const order_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search-by-customer.js');
const get_meta_order = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-orders.js');
//@
async  function function_export(req, res, next) {
	
	//@ lấy req data
	try {
		var token = req.headers['token'];
		
		var order_id = 0;
		if(req.query.c1){
			order_id = req.query.c1;
		}else{
			return res.send({ 
				"error" : "1", 
				"position" : "api/web/v5/ctroller/orders/controllers-order-get-by-id-web",
				"message": "vui lòng nhập id"
			}); 	
			
		}
		//es.send(order_id);
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
			"position" : "api/web/v5/ctroller/orders/controllers-order-get-by-id-web",
			"message": error_send 
		}); 
			
	}


	
	
	//@ check owner user
	const check_owner_result = await check_owner(token,order_id,res);
	if(check_owner_result != 1){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				"Lỗi phân quyền owner - đơn hàng không pahi3 của bạn, Vui lòng liên hệ admin" , 
				"Lỗi phân quyền owner - đơn hàng không pahi3 của bạn, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "55",
			"position" : "api/web/v5/ctroller/orders/controllers-order-get-by-id-web", 
			"message": error_send 
		}); 
					
	}	
	
	//return res.send(check_owner);
	//
	

	//@ lấy req data
	try {
		//@ 3. get model
		let data_get =    
		{
		   "select_type" : "DISTINCT",
		   "select_field" :fields_get.fields_search_arr,
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"orders_speciality_ID",
						"value"     : order_id,
						"compare" : "="
					}
					]    
				}         
			]   
		}
	
		///return res.send({"error":"","datas":data_get}); 
		//
	
		//@ get datas
		var order_result = await order_search(data_get,res);
		//return res.send({"error":"","datas":order_result}); 
		//		
		
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
			"position" : "api/web/v5/ctroller/orders/controllers-order-get-by-id-web",
			"message": error_send 
		}); 
			
	}


	//get meta order
	var get_meta_order_resuilt = await get_meta_order(order_result,order_arr,res);

	return res.send({"error":"","datas":get_meta_order_resuilt}); 
	


}

module.exports = function_export;
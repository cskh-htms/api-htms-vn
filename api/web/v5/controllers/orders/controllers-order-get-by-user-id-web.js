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
			res.send({ 
				"error" : "1", 
				"position" : "api/web/v5/ctroller/orders/controllers-order-get-by-user-id-web",
				"message": "vui lòng nhập id"
			}); 	
			return;
		}
		//res.send(user_id);
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
			"position" : "api/web/v5/ctroller/orders/controllers-order-get-by-user-id-web",
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
			"position" : "api/web/v5/ctroller/orders/controllers-order-get-by-user-id-web",
			"message": error_send 
		}); 
		return;			
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
						"field"     :"orders_speciality_user_id",
						"value"     : user_id,
						"compare" : "="
					}
					]    
				}         
			]   
		}
	
		//res.send({"error":"","datas":data_get}); 
		//return;


	
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
		
		//res.send({"error":"","datas":order_arr}); 
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
			"error" : "3", 
			"position" : "api/web/v5/ctroller/orders/controllers-order-get-by-user-id-web",
			"message": error_send 
		}); 
		return;	
	}


	//get meta order
	var get_meta_order_resuilt = await get_meta_order(order_result,order_arr,res);

	res.send({"error":"","datas":get_meta_order_resuilt}); 
	return;


}

module.exports = function_export;
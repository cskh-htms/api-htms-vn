const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');

const get_data_news_bussiness = require('../../shares/get-data-news-bussiness-appdalacom-api.js');
const get_data_count_bussiness = require('../../shares/get-data-count-bussiness-appdalacom-api.js');

const order_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search');
const order_update = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-update');

//@
async  function function_export(req, res, next) {

	//@ lấy req data
	try {
		var url = "";
		if(req.query.c1){
			url = req.query.c1;
		}else{
			res.send({ 
				"error" : "1", 
				"position" : "api/appdala.com/v5/ctroller/orders/controllers-order-xac-nhan-don-hang",
				"message": "vui lòng nhập id don hang"
			}); 	
			return;
		}
		//res.send([url]);
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
			"error" : "2", 
			"position" : "api/appdala.com/v5/ctroller/orders/controllers-order-xac-nhan-don-hang",
			"message": error_send 
		}); 
		return;	
	}		
	
	
	try {
		var decoded = jwt.verify(url, ojs_configs.jwt_secret);
	} catch(err) {
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi giai ma code url, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "22", 
			"position" : "api/appdala.com/v5/ctroller/orders/controllers-order-xac-nhan-don-hang",
			"message": error_send 
		}); 
		return;	
	}	
	
	
	
	
	//@
	//@
	//@
	//@ lấy thông tin đơn hàng
	var data_get =    
	{
	   "select_type" : "DISTINCT",
	   "select_field" :[
			"orders_speciality_status_orders"
	   ],
		"condition" :
		[
			{    
			"relation": "and",
			"where" :
				[
				{   
					"field"     :"orders_speciality_ID",
					"value"     : decoded.order_id,
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
	//res.send({"error":"","datas":order_result}); 
	//return;	
	
		
	if(order_result[0].orders_speciality_status_orders == "0"){
		
		var data_update = {
			orders_speciality_status_orders: 101
		}
		var order_update_result = await order_update(data_update,decoded.order_id,res);		
		res.send("Đã xác nhận đơn hàng rồi"); 
		return;
	}else if(order_result[0].orders_speciality_status_orders == "101"){
		res.send("Đơn hàng đã xác nhận  rồi"); 
		return;
	}else{
		res.send("Đơn hàng đã xác nhận  rồi, đang được xử lý rồi"); 
		return;
	}		
		

}

module.exports = function_export;



















//@
//@
//@
//@
//@ end of file

















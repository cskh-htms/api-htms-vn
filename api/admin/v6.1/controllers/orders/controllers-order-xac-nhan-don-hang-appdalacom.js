const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');




const config_api = require('../../configs/config');



const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');

const get_data_news_bussiness = require('../../shares/get-data-news-bussiness-appdalacom-api.js');
const get_data_count_bussiness = require('../../shares/get-data-count-bussiness-appdalacom-api.js');

const order_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search');
const order_update = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-update');

const ojs_shares_send_email = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-send-email.js');




//@
async  function function_export(req, res, next) {

	//@ lấy req data
	try {
		var url = "";
		if(req.query.c1){
			url = req.query.c1;
		}else{
			return res.send({ 
				"error" : "1", 
				"position" : "api/appdala.com/v5/ctroller/orders/controllers-order-xac-nhan-don-hang",
				"message": "vui lòng nhập id don hang"
			}); 	
			
		}
		//return res.send([url]);
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
			"error" : "2", 
			"position" : "api/appdala.com/v5/ctroller/orders/controllers-order-xac-nhan-don-hang",
			"message": error_send 
		}); 
			
	}		
	
	
	try {
		var decoded = jwt.verify(url, config_api.jwt_secret);
	} catch(err) {
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi giai ma code url, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "22", 
			"position" : "api/appdala.com/v5/ctroller/orders/controllers-order-xac-nhan-don-hang",
			"message": error_send 
		}); 
			
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

	//return res.send({"error":"","datas":data_get}); 
	//

	//@ get datas
	var order_result = await order_search(data_get,res);
	//return res.send({"error":"","datas":order_result}); 
	//	
	
		
	if(order_result[0].orders_speciality_status_orders == "0"){
		
		var data_update = {
			orders_speciality_status_orders: 101
		}
		var order_update_result = await order_update(data_update,decoded.order_id,res);		
		return res.send("Đã xác nhận đơn hàng rồi"); 
		
		
		
		var email_title = 'Cửa hàng đã xác nhận đơn [ ' + decoded.order_id + ' ] ';
		var email_content = 'Cửa hàng đã xác nhận đơn [ ' + decoded.order_id + ' ] ';		
		
		if(process.env.evn == "tester"){
			ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_04,email_title,email_content);
		}else{
			//@ send email to admin
			ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_01,email_title,email_content);
			ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_04,email_title,email_content);			
		}			
		
		
		
		
		
	}else if(order_result[0].orders_speciality_status_orders == "101"){
		return res.send("Đơn hàng đã xác nhận  rồi"); 
		
	}else{
		return res.send("Đơn hàng đã xác nhận  rồi, đang được xử lý rồi"); 
		
	}		
		

}

module.exports = function_export;



















//@
//@
//@
//@
//@ end of file

















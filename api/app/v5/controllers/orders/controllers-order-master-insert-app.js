const express = require('express');
const router = express.Router();

const ojs_configs = require('../../../../../configs/config');


const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-fields-insert');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_user = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-user');

const order_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-insert.js');
const get_store_id = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-get-store-id.js');
const meta_adress_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/meta-adress/meta-adress-insert.js');
const meta_adress_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/meta-adress/meta-adress-search.js');

const ojs_shares_send_code_to_phone = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-send-code-to-phone.js');
const ojs_shares_send_email = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-send-email.js');

const content_email_order = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/content-email-order.js');







//@
//@
//@
//@		
//@ function 
async  function controllers_order_insert_app(req, res, next) {
	
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];

		if(!datas.orders.orders_speciality_user_id){
			return res.send({ 
				"error" : "1", 
				"position" : "api/app/v5/controller/order/orders-master-insert",
				"message":  " Chưa nhập mã khách hàng "
			});
			
		}
		if(!datas.orders_detail){
			return res.send({ 
				"error" : "2", 
				"position" : "api/app/v5/controller/order/orders-master-insert",
				"message":  " Chưa có data order "
			});
			
		}			
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request insert order, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3", 
			"position" : "api/app/v5/controller/order/orders-master-insert",
			"message": error_send 
		}); 
			
	}

	//@ check owner user
	const check_owner_user_resuilt = await check_owner_user.check_owner_user(token,datas.orders.orders_speciality_user_id,res);
	if(check_owner_user_resuilt != 1){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				"Lỗi phân quyền , Vui lòng liên hệ admin" , 
				"Lỗi phân quyền , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "5",
			"position" : "api/app/v5/controller/order/orders-master-insert", 
			"message": error_send 
		}); 
					
	}
	
	
	
	//@
	//@
	//@
	//@		
	return res.send(["role ok"]);
	
	
	
	
	
//@
//@
//@
//@		
}







//@
//@
//@
//@		
//@ export
module.exports = controllers_order_insert_app;









//@
//@
//@
//@		
//@ end
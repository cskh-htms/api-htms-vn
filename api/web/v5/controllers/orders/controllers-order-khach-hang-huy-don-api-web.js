const express = require('express');
const router = express.Router();


const ojs_configs = require('../../../../../configs/config');


const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-fields-insert');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_order_customer = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-order-customer.js');

const orders_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search.js');
const orders_update = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-update.js');


const ojs_shares_send_code_to_phone = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-send-code-to-phone.js');
const ojs_shares_send_email = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-send-email.js');



//@
async  function controllers_order_khach_hang_huy_don(req, res, next) {
	//res.send(["sdasdas","sdasdasdasd"]);
	//return;
	try {
		var order_id = req.params.order_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request insert order, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "3", 
			"position" : "api/web/v5/ctroller/order/khach-hang-huy-don",
			"message": error_send 
		}); 
		return;	
	}

	//res.send([token,order_id]);
	//return;

	


	//@ check owner user
	const check_owner_order_customer_resuilt = await check_owner_order_customer(token,order_id,res);
	if(check_owner_order_customer_resuilt != 1){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				"Lỗi phân quyền , Vui lòng liên hệ admin" , 
				"Lỗi phân quyền , Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "5",
			"position" : "api/web/v5/ctroller/order/khach-hang-huy-don", 
			"message": error_send 
		}); 
		return;			
	}


	//res.send([check_owner_order_customer_resuilt]);
	//return;	





	//@ check status update
	try{
		var datas_order = 
		{
			"select_field" :
			[ 
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
							"value"     : order_id,
							"compare" : "="
						} 						
					]    
				}         
			]  
		}
		//return datas;		
		
		var orders_search_result = await orders_search(datas_order,res);
		
		if(orders_search_result[0].orders_speciality_status_orders != '0'){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				"Đơn hàng đã giao vận chuyển không thể hủy, Liên hệ DALA" ,
				"Đơn hàng đã giao vận chuyển không thể hủy, Liên hệ DALA" 
			);
			res.send({ 
				"error" : "88", 
				"position":"ctl-orders-speciality-insert", 
				"message": error_send 
			});
		}
			
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error,
			"Lổi tìm cửa hàng" 
		);
		res.send({ 
			"error" : "8", 
			"position":"ctl-orders-speciality-insert", 
			"message": error_send 
		});
		return;				
	}	



	//@ update hũy
	try{
		var datas_order_huy = 
		{
			"orders_speciality_status_orders":-1
		}
		//return datas;		
		
		var orders_update_result = await orders_update(datas_order_huy,order_id,res);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error,
			"Lổi tìm cửa hàng" 
		);
		res.send({ 
			"error" : "8", 
			"position":"ctl-orders-speciality-update huy", 
			"message": error_send 
		});
		return;				
	}	

	//@
	res.send({"error":"","datas":orders_update_result});
	return;
}

module.exports = controllers_order_khach_hang_huy_don;
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
const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-fields-insert');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_user = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-user');

const order_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-insert.js');
const get_store_id = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-get-store-id.js');
const meta_adress_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/meta-adress/meta-adress-insert.js');


const ojs_shares_send_code_to_phone = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-send-code-to-phone.js');
const ojs_shares_send_email = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-send-email.js');



//@
async  function controllers_order_insert_app(req, res, next) {
	
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];

		if(!datas.orders.orders_speciality_user_id){
			res.send({ 
				"error" : "1", 
				"position" : "api/app/v5/ctroller/order/orders-insert",
				"message":  " Chưa nhập mã khách hàng "
			});
			return;
		}
		if(!datas.orders_detail){
			res.send({ 
				"error" : "2", 
				"position" : "api/app/v5/ctroller/order/orders-insert",
				"message":  " Chưa có data order "
			});
			return;
		}			
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
			"position" : "api/app/v5/ctroller/order/orders-insert",
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
			"error" : "4",
			"position" : "api/app/v5/ctroller/order/orders-insert",
			"message": error_send 
		}); 
		return;			
	}


	//@ check owner user
	const check_owner_user_resuilt = await check_owner_user.check_owner_user(token,datas.orders.orders_speciality_user_id,res);
	if(check_owner_user_resuilt != 1){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				"Lỗi phân quyền , Vui lòng liên hệ admin" , 
				"Lỗi phân quyền , Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "5",
			"position" : "api/app/v5/ctroller/order/orders-insert", 
			"message": error_send 
		}); 
		return;			
	}


	//@ tìm cửa hàng
	try{
		var product_id = 0;
		for(let x  in datas.orders_detail){
			if(datas.orders_detail[x].orders_details_speciality_line_order == "product"){
				product_id = datas.orders_detail[x].orders_details_speciality_product_id
			}		
		}			
			
			
		if(product_id == 0){
			res.send({ 
				"error" : "6", 
				"position":"ctl-orders-spaciality->insert", 
				"message":  " không tìm thấy cửa hàng "
			});
			return;
		}		
		
		var get_store_id_resuilt = await get_store_id(product_id,res);
		
		if(get_store_id_resuilt.length > 0){
			var store_id = get_store_id_resuilt[0].products_speciality_store_id;
			var store_name = get_store_id_resuilt[0].stores_name;
		}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				"Không tìm thấy cửa hàng", 
				"Không tìm thấy cửa hàng" 
			);
			res.send({ 
				"error" : "7", 
				"position":"ctl-orders-spaciality->insert", 
				"message": error_send
			}); 
			return;	
		}
		
		datas.orders.orders_speciality_store_id = store_id;
		
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

	
	//@
	try {
		var datas_assign = Object.assign(fields_insert.default_fields, datas.orders);
		var meta_adress= {
			"adress_meta_user_id"		: datas.orders.orders_speciality_user_id,
			"adress_meta_name"			: datas.orders.orders_speciality_name,
			"adress_meta_phone"			: datas.orders.orders_speciality_phone,
			"adress_meta_province"		: datas.orders.orders_speciality_province,	
			"adress_meta_district"		: datas.orders.orders_speciality_district,
			"adress_meta_wards"			: datas.orders.orders_speciality_wards,
			"adress_meta_street"		: datas.orders.orders_speciality_adress
		}	
		order_insert(datas_assign,datas.orders_detail).then( results => {

			ojs_shares_send_code_to_phone.send_code_to_phone_order(res,results[0].insertId,datas.orders.orders_speciality_phone);
			
			var email_to = "dalavn.group@gmail.com";
			var email_title = "Có đơn hàng mới";
			var email_content = '<p> Có đơn hàng mới <b>[ ' + results[0].insertId + ' ] </b></p>';
			//@
			//@
			ojs_shares_send_email.send_email_lost_password(res,email_to,email_title,email_content);		

			var email_to2 = "lehongson.tc@gmail.com";
			var email_title2 = "Có đơn hàng mới";
			var email_content2 = '<p> Có đơn hàng mới <b>[ ' + results[0].insertId + ' ] </b></p>';

			ojs_shares_send_email.send_email_lost_password(res,email_to2,email_title2,email_content2);					

			meta_adress_insert.save_meta_adress(meta_adress);
						
			res.send( {"error" : "", "datas" : results} );
			return;
			//
		}, error => {
			var message_error = fields-insert.get_message_error(error);
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ 
				"error" : "9", 
				"position":"ctl-orders-speciality-insert", 
				"message": error_send 
			}); 
			return;	
		});
	}
	catch(error){
		env = ojs_configs.api_evn;
		//env = "dev";
		var error_send = ojs_shares_show_errors.show_error( env, error, "lỗi truy xuất database" );
		res.send({ 
			"error" : "10", 
			"position":"ctl-orders-speciality-insert", 
			"message": error_send 
		}); 
		return		
	}	
}

module.exports = controllers_order_insert_app;
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
//@ export
async  function controllers_order_insert_app(req, res, next) {
	
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];

		if(!datas.orders.orders_speciality_user_id){
			res.send({ 
				"error" : "1", 
				"position" : "api/web/v5/controller/order/orders-insert-web",
				"message":  " Chưa nhập mã khách hàng "
			});
			return;
		}
		if(!datas.orders_detail){
			res.send({ 
				"error" : "2", 
				"position" : "api/web/v5/controller/order/orders-insert-web",
				"message":  " Chưa có data order "
			});
			return;
		}		

		//res.send(datas);
		//return;
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
			"position" : "api/web/v5/controller/order/orders-insert-web",
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
			"position" : "api/web/v5/controller/order/orders-insert-web", 
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
			var store_email = get_store_id_resuilt[0].stores_email;
			var store_phone = get_store_id_resuilt[0].stores_phone;			
			
		}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				"Không tìm thấy cửa hàng bán sản phẩm này", 
				"Không tìm thấy cửa hàng bán sản phẩm này" 
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

	//res.send([datas]);
	//return;	

	
	//@ tạo meta data
	try {
		var datas_assign = Object.assign(fields_insert.default_fields, datas.orders);
		var order_insert_resuilt = await  order_insert(datas_assign,datas.orders_detail,res);
		

		//@
		//@
		//@ send email
		var email_title = 'DALA - Có đơn hàng mới [ ' + order_insert_resuilt[1].insertId + ' ]';
		//var email_content = '<strong> DALA - </strong><p> Có đơn hàng mới <b>[ ' + order_insert_resuilt[0].insertId + ' ] </b></p>';
		var email_content = await content_email_order(order_insert_resuilt[1].insertId,res);
		
		
		
		//res.send([order_insert_resuilt[1].insertId,store_phone]);
		//return;		
		
		
		
		
		if(ojs_configs.domain == "http://localhost:2021"){
			ojs_shares_send_email.send_email_to_admin(res,ojs_configs.email_admin_04,email_title,email_content);
			//ojs_shares_send_email.send_email_to_admin(res,ojs_configs.email_admin_01,email_title,email_content);
			//ojs_shares_send_email.send_email_to_admin(res,ojs_configs.email_admin_02,email_title,email_content);
			//ojs_shares_send_email.send_email_to_admin(res,ojs_configs.email_admin_04,email_title,email_content);
		}else{
			
			
			ojs_shares_send_email.send_email_to_admin(res,ojs_configs.email_admin_01,email_title,email_content);
			ojs_shares_send_email.send_email_to_admin(res,ojs_configs.email_admin_04,email_title,email_content);
		
			//@
			//@
			//gữi sms đặt hàng 		
			ojs_shares_send_code_to_phone.send_code_to_phone_order(res,order_insert_resuilt[1].insertId,store_phone);
			
			//@ send email to store
			ojs_shares_send_email.send_email_to_admin(res,store_email,email_title,email_content);
			
			//@ send email to admin			
		}

		
		res.send( {"error" : "", "datas" : order_insert_resuilt} );
		return;
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
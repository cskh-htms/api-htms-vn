const express = require('express');
const router = express.Router();



const config_api = require('../../configs/config');




const ojs_shares_show_errors = 
	require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_insert = 
	require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-fields-insert');
const check_role = 
	require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_user = 
	require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-user');


const ojs_shares_send_code_to_phone = 
	require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-send-code-to-phone.js');
const ojs_shares_send_email = 
	require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-send-email.js');
const content_email_order = 
	require('../../../../shares/' + config_api.API_SHARES_VERSION + '/content-email-order.js');
const get_datas_order_insert = 
	require('../../../../shares/' + config_api.API_SHARES_VERSION + '/get-datas-order-insert.js');
const get_datas_order_coupon_insert = 
	require('../../../../shares/' + config_api.API_SHARES_VERSION + '/get-datas-order-coupon-insert.js');	
const get_datas_order_coupon_master_insert = 
	require('../../../../shares/' + config_api.API_SHARES_VERSION + '/get-datas-order-coupon-master-insert.js');	
	
	

const order_master_insert = 
	require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders-master/orders-master-insert.js');









//@
//@
//@
//@		
//@ function 
async  function controllers_order_insert_app(req, res, next) {
	
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		//return res.send( datas  );

		if(!datas.orders_master.orders_speciality_master_user_id){
			return res.send({ 
				"error" : "1", 
				"position" : "api/app/v5/controller/order/orders-master-insert",
				"message":  " Chưa nhập mã khách hàng "
			});
			
		}
		if(!datas.orders_store){
			return res.send({ 
				"error" : "2", 
				"position" : "api/app/v5/controller/order/orders-master-insert",
				"message":  " Chưa có data order "
			});
			
		}	
		
	}
	catch(error){
		var evn = config_api.evn;
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
	
	
	
	
	
	
	
	
	//@
	//@	
	//@
	//@
	//@ check owner user
	const check_owner_user_resuilt = 
		await check_owner_user.check_owner_user(token,datas.orders_master.orders_speciality_master_user_id,res);
	if(check_owner_user_resuilt != 1){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				"Lỗi phân quyền, user đặt hàng và token không giống nhau , Vui lòng liên hệ admin" , 
				"Lỗi phân quyền , user đặt hàng và token không giống nhau, Vui lòng liên hệ admin" 
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
	//@ lấy giá mới cho sản phẩm
	var datas_order_store_price_caution_arr = [];
	for (x in datas.orders_store){
		var get_order_data = await  get_datas_order_insert(datas.orders_store[x],res);
		datas_order_store_price_caution_arr.push(get_order_data);
	}











	//@
	//@
	//@
	//@
	//@ check lai coupon store
	var datas_order_store_coupon_caution_arr = [];
	for (y in datas_order_store_price_caution_arr){
		var datas_order_store_coupon_caution = 
			await  get_datas_order_coupon_insert(
					datas_order_store_price_caution_arr[y],
					datas.orders_master.orders_speciality_master_user_id,
					res
				);
		datas_order_store_coupon_caution_arr.push(datas_order_store_coupon_caution);
	}
	//return res.send({"error":"", "datas":datas_order_store_coupon_caution_arr});
	
	
	
	
	
	
	
	
	//@
	//@	
	//@
	//@
	//@ check lai coupon master
	var datas_order_master_coupon_caution_arr = [...datas_order_store_coupon_caution_arr];
	for (z in datas.coupon_master){
		var datas_order_master_coupon_caution = 
			await  get_datas_order_coupon_master_insert(
					datas.coupon_master[z],
					datas_order_store_coupon_caution_arr,
					datas.orders_master.orders_speciality_master_user_id,
					res
				);
		if(
		datas.coupon_master[z].orders_details_speciality_price 
		!= datas_order_master_coupon_caution 
		){
			return res.send({ 
				"error" : "6",
				"position" : "api/app/v5/controller/order/orders-master-insert", 
				"message": "Giá coupon [ " + 
				datas.coupon_master[z].orders_details_medium_text + " ] " + 
				"đã thay đổi từ [ " + 
				datas.coupon_master[z].orders_details_speciality_price  + 
				" thành -> " + datas_order_master_coupon_caution + 
				"Vui lòng đặt hàng lại "				
			}); 			
		}else{
			//@ 
			//@ chia đều coupon cho các đơn hàng
			var order_number = datas.orders_store.length;
			var coupon_div = parseInt(datas_order_master_coupon_caution/order_number);
			
			for (s in datas_order_master_coupon_caution_arr){		
				var coupon_add = {
					"orders_details_speciality_line_order": "coupon",
					"orders_details_speciality_product_id": datas.coupon_master[z].orders_details_speciality_product_id,
					"orders_details_speciality_qty": 1,
					"orders_details_medium_text":datas.coupon_master[z].orders_details_medium_text,
					"orders_details_speciality_price": coupon_div
				}				
				datas_order_master_coupon_caution_arr[s].order_details.push(coupon_add);				
			}
		}
	}	
	//return res.send({"error":"", "datas":datas_order_master_coupon_caution_arr});
	
	
	
	//@
	//@
	//@
	//@ insert order
	
	datas.orders_master.orders_speciality_master_service = 2;
	var order_master_insert_result = 
		await order_master_insert(datas.orders_master,datas_order_master_coupon_caution_arr,res)

	//@
	//@
	//@
	//@		
	return res.send({"error":"","datas":order_master_insert_result});
	
	
	
	
	
	
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
//@
//@
//@
//@
//@ file start




//@
//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();




//@
//@
//@
//@
//@ configs
const ojs_configs = require('../../../../../../configs/config');
const config_database = require('../../../../../configs/config-database');
const config_api = require('../../../../../configs/config-api');




//@
//@
//@
//@
//@ share
const ojs_shares_show_errors = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-fetch-data.js');




//@
//@
//@
//@
//@ model
const check_role = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const order_push_ghtk = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-push-ghtk');
const order_detail_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/order-details/order-detail-search-by-store.js');
const orders_get_one = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-get-one');
const store_get_one = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-get-one');



//@
//@
//@
//@
//@ function export
async  function function_export(req, res, next) {
	//@
	//@
	//@ any thing error
	try {	

		//@
		//@
		//@ lấy data req	
		try {
			var token = req.headers['token'];
			var datas  = req.body.datas;
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
				"position" : "api->appdalacom->controller->admin->orders->push-ghtk",
				"message": error_send 
			}); 
			return;	
		}			
		//res.send(datas);
		//return;
		
		
		
		
		
		
		
		//@
		//@
		//@ check phan quyen
		const check_role_result = await check_role.check_role(token,res);
		if(
			check_role_result == "admin" 
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
				"error" : "3",
				"position" : "api->appdalacom->controller->admin->orders->push-ghtk", 
				"message": error_send 
			}); 
			return;			
		}
		///res.send([check_role_result]);
		//return;
		
		
		
		
		
		
		//@
		//@
		//@ order details
		//@ lấy danh sách sản phẩm cânnặng số lượng
		//@ để gữi lên ghtk		
		let data_order_detail =    
		{
		   "select_field" :
			[
				"orders_details_speciality_ID",
				"orders_details_speciality_order_id",
				"orders_details_medium_text",
				"orders_details_speciality_line_order",
				"orders_details_speciality_price",
				"orders_details_speciality_product_id",
				"orders_details_speciality_qty",
				"price_caution",
				"products_speciality_name",
				"products_speciality_weight",
				"products_speciality_ID"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"orders_details_speciality_order_id",
						"value"     : datas.shipping_tracking_orders_id,
						"compare" : "="
					}           
					]    
				}         
			]				
		}
		
		var orders_details = await order_detail_search(data_order_detail,res);
		var arr_product = [];
		if(orders_details.length > 0){			
			for(let x in orders_details){
				if(orders_details[x].orders_details_speciality_line_order == "product"){
					let x_ojb =  {
						"name":orders_details[x].products_speciality_name,
						"weight":orders_details[x].products_speciality_weight/ 1000,
						"quantity":orders_details[x].orders_details_speciality_qty,
						"product_code":orders_details[x].products_speciality_ID
					}
					arr_product.push(x_ojb);
				}
			}
		}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					check_role_result, 
					"đơn hàng không tìm thấy sản phẩm" 
				);
			res.send({ 
				"error" : "7",
				"position" : "api->appdalacom->controller->admin->orders->push-ghtk", 
				"message": error_send 
			}); 
			return;				
		}			
		//res.send({"error":"", "datas": arr_product});
		//return;			
		
		
		
		
		
		
		//@
		//@
		//@
		//@ tính tiền tổng đơn hàng
		var price_sum = 0;
		var add = 0;
		var add_fee = 0;
		var shipping = 0;
		var coupon = 0;
		var tax = 0;
		var reduce = 0;

		try{
			for(let x in orders_details){
				if(orders_details[x].orders_details_speciality_line_order == "product"){
					let price = orders_details[x].orders_details_speciality_price * orders_details[x].orders_details_speciality_qty;
					price_sum = price_sum + price;
				}else if(orders_details[x].orders_details_speciality_line_order == "shipping"){
					shipping = shipping + orders_details[x].orders_details_speciality_price; 
					
				}else if(orders_details[x].orders_details_speciality_line_order == "coupon"){
					coupon = coupon + orders_details[x].orders_details_speciality_price; 
					
				}else if(orders_details[x].orders_details_speciality_line_order == "add"){
					add = add + orders_details[x].orders_details_speciality_price; 	
					
				}else if(orders_details[x].orders_details_speciality_line_order == "add_fee"){
					add_fee = add_fee + orders_details[x].orders_details_speciality_price; 	
					
				}else if(orders_details[x].orders_details_speciality_line_order == "reduce"){
					reduce = reduce + orders_details[x].orders_details_speciality_price; 	

				}else if(orders_details[x].orders_details_speciality_line_order == "tax"){
					tax = tax + orders_details[x].orders_details_speciality_price; 				
				}
			}
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					check_role_result, 
					"lỗi code get chi tiết đơn hàng , vui lòng liên hệ admin" 
				);
			res.send({ 
				"error" : "11",
				"position" : "api->appdalacom->controller->admin->orders->push-ghtk", 
				"message": error_send 
			}); 
			return;				
				
		}
		var price_order = (price_sum + add + add_fee + tax + shipping) - coupon - reduce;		
		
		
		
		//@
		//@
		//@
		//@ lấy thông tin đơn hàng
		var  orders_info =  await orders_get_one(datas.shipping_tracking_orders_id,res);		
		
		
		
		//@
		//@
		//@
		//@ lấy thông tin cửa hàng			
		let stores_info = await store_get_one(orders_info[0].orders_speciality_store_id,res);		
		
		
		
		
		//@
		//@
		//@
		//@
		//@	push lên GHTK
		try {	

			//@
			//@
			var evn = ojs_configs.evn;
			evn = "dev";
			if(evn == "dev"){
				var url = "https://services-staging.ghtklab.com/services/shipment/order/?ver=1.6.3";
			}else{
				var url = ojs_configs.domain_ghtk_push_order;
			}
	
			let token = ojs_configs.token_ghtk;
			let ran = Math.random().toString(36).slice(-10);
			//@
			//@
			//@
			let order = 	    
				{
					"id": ran + "_" + datas.shipping_tracking_orders_id,
					//"id": ran + "_" + 1,
					"pick_name": stores_info[0].stores_name,
					"pick_address": stores_info[0].stores_adress,
					"pick_province": stores_info[0].stores_province,
					"pick_district": stores_info[0].stores_district,
					"pick_ward": stores_info[0].stores_wards,
					"pick_tel": stores_info[0].stores_phone,
					"tel": orders_info[0].orders_speciality_phone,
					"name": orders_info[0].orders_speciality_name,
					"address": orders_info[0].orders_speciality_adress,
					"province": orders_info[0].orders_speciality_province,
					"district": orders_info[0].orders_speciality_district,
					"ward": orders_info[0].orders_speciality_wards,
					"hamlet": "Khác",
					"is_freeship": "1",
					"pick_money": price_order,
					"note": orders_info[0].orders_speciality_notes,
					"value": price_order,
					"pick_option":"cod",
					"deliver_option" : "none"
			}			
			//res.send({"error":"", "datas": [order,url,token,ran]});
			//return;				
			


			//@
			//@
			//@ data send 
			let datas_send = 
				{
					"products": arr_product,
					"order": order
				}	

			//res.send({"error":"", "datas": datas_send });
			//return;	

			
			var result_ghtk = await ojs_shares_fetch_data.get_data_send_token_post_ghtk(url,datas_send,token);
		
		//@
		//@
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					check_role_result, 
					"Lỗi lưu data. liên hệ admin" 
				);
			res.send({ 
				"error" : "15",
				"position" : "api->appdalacom->controller->admin->orders->push-ghtk", 
				"message": error_send 
			}); 
			return;				

		}			
		
		
		
		

		
		
		//@
		//@
		//@
		//@ nếu push đơn thành công		
		if(result_ghtk.success){
			var tracking = "0";
			if(result_ghtk.order.label){ tracking  = result_ghtk.order.label};
			var result = await order_push_ghtk(datas,tracking,res);
			
		}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					check_role_result, 
					"push đơn hàng không thành công, vui lòng thao tác lại" 
				);
			res.send({ 
				"error" : "14",
				"position" : "api->appdalacom->controller->admin->orders->push-ghtk", 
				"message": error_send 
			}); 
			return;				
		}		
		

	
		
		//@
		//@	
		//@ send data result	
		res.send({"error":"", "datas": result });
		return;	
		
		
		
	//@
	//@
	//@ catch all error	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi không xác định. Vui lòng liên hệ bộ phận kỹ thuật hoặc  thao tác lại" 
			);
		res.send({ 
			"error" : "1000", 
			"position" : "api->appdalacom->controller->admin->orders->push-ghtk",
			"message": error_send 
		}); 
		return;	
	}	
	
	
	
	//@
	//@
	//@ send error when not return data
	res.send({ 
		"error" : "2000", 
		"position":"api->appdalacom->controller->admin->orders->push-ghtk",
		"message": "Lỗi không có data return, Lỗi này khi không có dữ liệu return, Vui lòng liên hệ bộ phận kỹ thuật, hoặc thao tác lại" 
	}); 
	return;		
}






//@
//@
//@
//@
//@ export
module.exports = function_export;







//@
//@
//@
//@
//@ file end






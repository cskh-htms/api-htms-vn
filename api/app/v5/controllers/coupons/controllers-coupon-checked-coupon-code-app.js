//@
//@
//@
//@
//@	
//@
const express = require('express');
const router = express.Router();




//@
//@	
//@
const ojs_configs = require('../../../../../configs/config');

const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');
const ojs_shares_show_errors = 
	require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const check_role = 
	require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_order_customer = 
	require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-order-customer.js');



//@
//@	
//@
const product_search = 
	require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search.js');
const coupon_search = 
	require('../../../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search.js');
const check_coupon_condition_code = 
	require('../../../../shares/' + config_api.API_LIB_VERSION + '/check-coupon-condition-code');
const check_coupon_condition_code_all = 
	require('../../../../shares/' + config_api.API_LIB_VERSION + '/check-coupon-condition-code-all');
	


const get_meta_product = 
require('../../../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-product-insert-order.js');	
	
	
	
	
	
//@
//@
//@
//@
//@	
//@
async  function function_export(req, res, next) {

	try {
		var token = req.headers['token'];
		var datas = req.body.datas;
		var user_id = req.body.user_id;	
		var coupon_code = req.body.coupon_code;
		var coupon_selected_by_store = req.body.coupon_selected_by_store;
		var coupon_selected_by_dala = req.body.coupon_selected_by_dala;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3", 
			"position" : "api/app/v5/coupons/checked-coupon-code",
			"message": error_send 
		}); 
			
	}

	//return res.send([datas]);
	//





	//@
	//@
	//@ lấy thong tin coupon
	try{
		var datas_coupon = 
		{
			"select_field" :
			[ 
				"coupon_speciality_ID",
				"coupon_speciality_code",
				"coupon_speciality_featured_image",
				"coupon_speciality_stores_id_created",
				"coupon_speciality_info",
				"coupon_speciality_type",
				"coupon_speciality_formula_price",
				"coupon_speciality_formula_price_value",
				"coupon_speciality_condition",
				"coupon_speciality_condition_value",
				"coupon_speciality_price_max",
				"coupon_speciality_date_star",
				"coupon_speciality_date_end",
				"coupon_speciality_multiple",
				"coupon_speciality_show_hide",
				"coupon_speciality_status_admin",
				"coupon_speciality_limit_user",
				"coupon_speciality_limit_number",
				"coupon_speciality_qoute",
				"stores_ID",
				"stores_name",
				"check_expired_coupon"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
						{   
							"field"     :"coupon_speciality_code",
							"value"     : coupon_code,
							"compare" : "="
						}		
					]    
				}         
			],
		}
		//return datas;		
		
		var coupon_list_result = await coupon_search(datas_coupon,res);		

		if(coupon_list_result.length > 0){
			var coupon_list = coupon_list_result;
			if(coupon_list_result[0].check_expired_coupon == "0"){
				return res.send({ 
					"error" : "100",
					"position" : "api/app/v5/coupons/checked-coupon-code",
					"message": "Mã code đã hết hạn" 
				}); 
					
			}			
		}else{
			return res.send({ 
				"error" : "021",
				"position" : "api/app/v5/coupons/checked-coupon-code",
				"message": "Mã coupon không có trên hệ thống DALA" 
			}); 
							
		}
		//return res.send(coupon_list);
		//
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get coupon, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "444",
			"position" : "api/app/v5/coupons/checked-coupon-code",
			"message": error_send 
		}); 
						
	}








	//@
	//@
	//@ lấy line product
	var product_data = [];
	var product_id_arr = [];
	for (x in datas){
		for (y in datas[x].line_order){
			if(datas[x].line_order[y].orders_details_speciality_line_order == 'product'){
				product_data.push(datas[x].line_order[y])
				product_id_arr.push(datas[x].line_order[y].orders_details_speciality_product_id)
			}
		}
	}
	//return res.send([product_data,product_id_arr]);


	//@
	//@
	//@ lấy thông tin product theo arr id
	try{
		//@
		//@
		//@ 			
		var data_get =    
		{
		   "select_field" :
			[
				"products_speciality_ID",
				"products_speciality_name",
				"products_speciality_price_caution",
				"products_speciality_sale_of_price",
				"products_speciality_sale_of_price_time_check",
				"products_speciality_stock_status",
				"products_speciality_stock",
				"products_speciality_sku",
				"products_speciality_type",				
				"stores_name",
				"stores_ID",
				"products_speciality_sort_by_percen"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" : 
					[
					{   
						"field"     :"products_speciality_ID",
						"value"     : product_id_arr,
						"compare" : "in"
					}
					]		
				}					
			]
		}		
		var data_product = await product_search(data_get,res);	
		var get_meta_product_resuilt = await get_meta_product(data_product,product_id_arr,res);		
		
		
		//@
		//@
		//@
		//return res.send(get_meta_product_resuilt);
	}	
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi coupon_condition, Vui lòng liên hệ admin DALA" 
			);
		return res.send({ 
			"error" : "001",
			"position" : "api/app/v5/coupons/checked-coupon-code",
			"message": error_send 
		}); 
						
	}		






	//@
	//@
	//@ kiểm tra giá sản phẩm
	try{		
		//@
		//@
		//@ loop qua data gốc
		for (x in product_data){
		if(	product_data[x].orders_details_speciality_line_order == 'product'				
		){			
			
			//@
			// loop qua datas product meta
			var price_return = 0;
			var product_name = "";
			for (y in get_meta_product_resuilt){
				//@
				//@ neu line order = product và id = nhau
				if(	
					product_data[x].orders_details_speciality_product_id == 
					get_meta_product_resuilt[y].products_speciality_ID						
				){
					product_name = get_meta_product_resuilt[y].products_speciality_name;
					//@				
					//@nếu có chương trình khuyến mãi 
					//@ và chương trình khuyến mãi là [2] (mua nhiều giảm nhiều)
					//@ thì so sánh giá theo số lượng và lấy giá
					if(	get_meta_product_resuilt[y].discount_program[0].type
					&& get_meta_product_resuilt[y].discount_program[0].type == 2 ){
						
						//@
						//@ lấy giá theo số lượng
						var from_max = 0;
						var check_price = 0;
						var price_max = 0;
						
						for (z in get_meta_product_resuilt[y].product_price){
							
							var from = parseInt(get_meta_product_resuilt[y].product_price[z].from);
							var to = parseInt(get_meta_product_resuilt[y].product_price[z].to);
							var qty = parseInt(product_data[x].orders_details_speciality_qty);
							
							if(	qty  >= from && qty <= to ){
								price_return = get_meta_product_resuilt[y].product_price[z].price;
								check_price = 1;								
								break; 							
							}else{
								if(from > from_max){
									from_max = from;
									price_max = get_meta_product_resuilt[y].product_price[z].price;					
								}
							}
						}						
						if(check_price == 0){
							price_return = price_max;							
						}
					}else{
						price_return = get_meta_product_resuilt[y].products_speciality_price_caution
					}						
				}
			}//end of for meta




			//return res.send([price_return])

			//@
			//@
			//@
			//@ nếu giá đã thay đỗi thì báo lỗi		
			if(parseInt(product_data[x].orders_details_speciality_price) 
			!= parseInt(price_return) ){
				return res.send({ 
					"error" : "0002",
					"position" : "api/app/v5/coupons/checked-coupon-code",
					"message": "Xin lỗi giá sản phẩm [" + 
					product_name + " ] đã thay đổi từ (" + 
					product_data[x].orders_details_speciality_price + " -> " + 
					price_return + " ) " + 
					" ] vui lòng đặt hàng lại" 
				}); 
			}
		}
		}//end of for details
	}	
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi coupon_condition, Vui lòng liên hệ admin DALA" 
			);
		return res.send({ 
			"error" : "003",
			"position" : "api/app/v5/coupons/checked-coupon-code",
			"message": error_send 
		}); 
						
	}
	//return res.send(["price ok"]);









	//@
	//@
	//@
	//@
	//@ check điều kiện áp dụng
	try{	
		var check_resuilt = {};
		//@
		//@
		if(coupon_list_result[0].coupon_speciality_type == "0"){
			
			//return res.send(["code"]);
			//			
			
			var check_resuilt_store = 0;
			for( var  x in datas ) { 
				var check_condition = await check_coupon_condition_code.coupon_condition(datas[x],coupon_list,user_id,res);		
				//return res.send([check_condition]);
				//
				if(
				check_condition.store_check == 1
				&& check_condition.coupon_limit == 1 
				&& check_condition.user_limit == 1 
				&& check_condition.check == 1 
				){
					
					var caution_price = await check_coupon_condition_code.caution_price(datas[x].line_order,coupon_list,res);	
					//return res.send([caution_price]);
					//						
					
					let data_push = {
							"coupon_speciality_ID": coupon_list_result[0].coupon_speciality_ID,
							"coupon_speciality_code": coupon_list_result[0].coupon_speciality_code,
							"coupon_price_caution": caution_price,
							"coupon_speciality_multiple":coupon_list_result[0].coupon_speciality_multiple,
							"store_id":coupon_list_result[0].stores_ID,
							"store_name":coupon_list_result[0].stores_name,
							"dung_chung":coupon_list_result[0].coupon_speciality_type,
							"coupon_speciality_formula_price":coupon_list_result[0].coupon_speciality_formula_price
						}  

					coupon_selected_by_store.push(data_push);
					check_resuilt.coupon_selected_store = coupon_selected_by_store;
					check_resuilt.coupon_selected_dala = coupon_selected_by_dala;
					check_resuilt.coupon_new = data_push;
	
					return res.send({"error":"","datas":check_resuilt});
							

					
				}
				
			}//end of for	
		
			return res.send({ 
				"error" : "1021",
				"position" : "api/app/v5/coupons/checked-coupon-code",
				"message": "Mã giảm giá không đủ điều kiện áp dụng với đơn hàng của bạn"
			}); 
		}
		
		
		//@
		//@
		if(coupon_list_result[0].coupon_speciality_type == "1"){
			//return res.send(["code-all"]);
			//
			var check_all = await check_coupon_condition_code_all.coupon_condition(datas,coupon_list,user_id,res);	
			var caution_price = await check_coupon_condition_code_all.caution_price(datas,coupon_list,res);

			//return res.send([caution_price]);
			//

			
			let data_push = {
					"coupon_speciality_ID": coupon_list_result[0].coupon_speciality_ID,
					"coupon_speciality_code": coupon_list_result[0].coupon_speciality_code,
					"coupon_price_caution": caution_price,
					"coupon_speciality_multiple":coupon_list_result[0].coupon_speciality_multiple,
					"store_id":17,
					"store_name":"DALA",
					"dung_chung":coupon_list_result[0].coupon_speciality_type,
					"coupon_speciality_formula_price":coupon_list_result[0].coupon_speciality_formula_price
				}  

			coupon_selected_by_dala.push(data_push);
			check_resuilt.coupon_selected_store = coupon_selected_by_store;
			check_resuilt.coupon_selected_dala = coupon_selected_by_dala;
			check_resuilt.coupon_new = data_push;
		}		


		return res.send({"error":"","datas":check_resuilt});
					


	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get condition, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "241",
			"position" : "api/app/v5/coupons/checked-coupon-code",
			"message": error_send 
		}); 
						
	}

	//@
	return res.send({"error":"","datas":coupon_search_result});
	
}

module.exports = function_export;
//@@
//@@
//@@
//@@
//@@
const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');

const ojs_shares_show_errors = 
require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');

const product_search = 
require('../../lib/' + config_api.API_LIB_VERSION + '/products/product-search.js');

const get_meta_product = 
require('../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-product-insert-order.js');



//@@
//@@
//@@
//@@
//@@
const function_export = async function(datas,res){
	
	
	//@
	//@
	//@ lấy thông tin và giá sản phẩm
	try{
		
		//@
		//@
		//@ lấy line product
		var product_id_arr = [];
		for (x in datas.order_details){
			if(datas.order_details[x].orders_details_speciality_line_order == 'product'){
				product_id_arr.push(datas.order_details[x].orders_details_speciality_product_id)
			}
		}
		
		
		//@
		//@
		//@ lấy thông tin product theo arr id			
		var data_get =    
		{
		   "select_field" :
			[
				"products_speciality_ID",
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
		datas.store_id = data_product[0].stores_ID;		
		var get_meta_product_resuilt = await get_meta_product(data_product,product_id_arr,res);		
		
		
		//@
		//@
		//@
		//return get_meta_product_resuilt;
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
			"error" : "1",
			"position" : "api/shares/v5/get-data-order-insert",
			"message": error_send 
		}); 
						
	}		




	//@
	//@
	//@ thêm giá vào data gốc
	try{		
		//@
		//@
		//@ loop qua data gốc
		for (x in datas.order_details){
			//@
			// loop qua datas product meta
			for (y in get_meta_product_resuilt){
				//@
				//@ neu line order = product và id = nhau
				if(	datas.order_details[x].orders_details_speciality_line_order == 'product'  
				&& 	datas.order_details[x].orders_details_speciality_product_id == 
					get_meta_product_resuilt[y].products_speciality_ID						
				){
					//@				
					//@nếu có chương trình khuyến mãi 
					//@ và chương trình khuyến mãi là [2] (mua nhiều giảm nhiều)
					//@ thì so sánh giá theo số lượng và lấy giá
					if(	get_meta_product_resuilt[y].discount_program[0].type
					&& get_meta_product_resuilt[y].discount_program[0].type == 2 ){
						
						//@
						//@ lấy giá theo số lượng
						for (z in get_meta_product_resuilt[y].product_price){
							var from = parseInt(get_meta_product_resuilt[y].product_price[z].from);
							var to = parseInt(get_meta_product_resuilt[y].product_price[z].to);
							var qty = parseInt(datas.order_details[x].orders_details_speciality_qty);
							if(	qty  >= from && qty <= to ){
								datas.order_details[x].orders_details_speciality_price = 
								get_meta_product_resuilt[y].product_price[z].price;
								break; 							
							}
						}
					}else{
						datas.order_details[x].orders_details_speciality_price = 
						get_meta_product_resuilt[y].products_speciality_price_caution
					}	
					

					//@
					//@ 
					//@ lấy danh sách sản phẩm tặng
					if(	get_meta_product_resuilt[y].discount_program[0].type
					&& get_meta_product_resuilt[y].discount_program[0].type == 1 ){
						
						//@
						//@ lấy giá theo số lượng

						var product_gift_add = {
							"orders_details_speciality_line_order": "gift",
							"orders_details_speciality_product_id": get_meta_product_resuilt[y].product_gift[0].product_gift_id,
							"orders_details_speciality_qty": datas.order_details[x].orders_details_speciality_qty,
							"orders_details_speciality_price": 0
						}

						datas.order_details.push(product_gift_add);
						break; 
					}				
				}					
			}
		}
		
		
		//@
		//@
		//@
		return datas;
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
			"error" : "2",
			"position" : "api/shares/v5/get-data-order-insert",
			"message": error_send 
		}); 
						
	}



//@
//@
//@
//@
}//end of function	


module.exports = function_export;



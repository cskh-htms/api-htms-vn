//@@
//@@
//@@
//@@
//@@
const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');

const ojs_shares_show_errors = 
require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');


const check_coupon_code_store_insert_order  = 
require('../../shares/' + config_api.API_SHARES_VERSION + '/check-coupon-code-store-insert-order.js');

//@@
//@@
//@@
//@@
//@@
const function_export = async function(datas,user_id,res){
	
	
	//@
	//@
	//@ lấy thông tin coupon
	try{
		
		//@
		//@
		//@ lấy datas line orfer product
		var data_product = {};
		data_product.line_order = [];
		for (x in datas.order_details){
			if(datas.order_details[x].orders_details_speciality_line_order == 'product'){
				data_product.line_order.push(datas.order_details[x]);
			}
		}		
		
		//return data_product;
		
		
		//@
		//@
		//@ call function tính giá coupon
		for (y in datas.order_details){
			if(datas.order_details[y].orders_details_speciality_line_order == 'coupon'){
				//var coupon_price = 123456;
				var coupon_price = await check_coupon_code_store_insert_order(
					data_product,
					datas.order_details[y].orders_details_medium_text,
					datas.store_id,
					user_id,
					res
				);
				/*
				if(datas.order_details[y].orders_details_speciality_price != coupon_price){
					return res.send({ 
						"error" : "0001",
						"position" : "api/shares/v5/get-data-order-coupon-insert",
						"message": "Xin lỗi mã giảm giá [" + 
						datas.order_details[y].orders_details_medium_text + " ] đã thay đổi " + 
						"vui lòng đặt hàng lại" 
					});
				}	
				*/				
				datas.order_details[y].orders_details_speciality_price = coupon_price
			}
		}		
		
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
			"position" : "api/shares/v5/get-data-order-coupon-insert",
			"message": error_send 
		}); 
						
	}



//@
//@
//@
//@
}//end of function	


module.exports = function_export;



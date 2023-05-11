//@@
//@@
//@@
//@@
//@@
const config_api = require('./configs/config');




const ojs_shares_show_errors = 
require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');


const check_coupon_code_master_insert_order  = 
require('../../shares/' + config_api.API_SHARES_VERSION + '/check-coupon-code-master-insert-order.js');

//@@
//@@
//@@
//@@
//@@
const function_export = async function(datas_coupon,datas_order,user_id,res){
	
	
	
	//@
	//@
	//@ lấy datas line orfer product
	try{		
		//@
		//@
		var data_product= [];
		for (x in datas_order){
			for (y in datas_order[x].order_details){				
				if(datas_order[x].order_details[y].orders_details_speciality_line_order == 'product'){
					data_product.push(datas_order[x].order_details[y]);
				}
			}				
		}		
		//return (data_product);
	}	
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi coupon_condition, Vui lòng liên hệ admin DALA" 
			);
		return res.send({ 
			"error" : "1",
			"position" : "api/shares/v5/get-data-order-coupon-master-insert-order",
			"message": error_send 
		}); 
						
	}





	//@
	//@
	//@
	//@
	//@ check coupon
	try{		
		//@
		//@
		//@ call function tính giá coupon
		//return res.send([data_product,datas_coupon.orders_details_medium_text,user_id]);
		var coupon_check = await check_coupon_code_master_insert_order(
			data_product,
			datas_coupon.orders_details_medium_text,
			user_id,
			res
		)			
		return coupon_check;
	}	
	catch(error){
		var evn = config_api.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi coupon_condition, Vui lòng liên hệ admin DALA" 
			);
		return res.send({ 
			"error" : "2",
			"position" : "api/shares/v5/get-data-order-coupon-master-insert-order",
			"message": error_send 
		}); 
						
	}







//@
//@
//@
//@
}//end of function	


module.exports = function_export;



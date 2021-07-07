
/*
* mục đích : lấy datas promise orders


[ojs_shares_get_orders_datas]

* 1. [get_orders_datas]

	
*/

//@
//@
//@
//@
//@ load extends module
const fetch = require('node-fetch');





//@
//@
//@
//@
//@ load extends module
const ojs_configs = require('../configs/config');




//@
//@
//@
//@
//@ load function shares
const ojs_shares_date = require('./ojs-shares-date');
const ojs_shares_fetch_data = require('./ojs-shares-fetch-data');
const ojs_shares_show_errors = require('./ojs-shares-show-errors');



//@
//@
//@
//@
//@ load datas
const ojs_datas_orders = require('./ojs-datas-orders.js');






//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////





//@
//@
//@
//@
//@ ojs export
const ojs_shares_get_orders_datas = {

	//@
	//@
	//@
	//@
	//@ return function load_datas_admin_menu
	get_orders_datas : async function (datas) {
		
		
		//return datas;
		//@
		//@
		//@ data return
		
		var promise_all = [];
		promise_all.push(0);
		
		//@
		//@
		//@
		//@	
		//@ * 1.1. [datas_orders_list]
		//@ thống kê theo cửa hàng
		if(datas.datas_orders_list){
			var datas_send = {
				'user_id': datas.user_id,
				'store_id' : datas.store_id,
				
				'user_compare': datas.datas_orders_list.user_compare,
				'store_compare': datas.datas_orders_list.store_compare,	
				
				'status_admin_compare' : datas.datas_orders_list.status_admin_compare,
				'status_admin_value' : datas.datas_orders_list.status_admin_value,				
				
				'status_payment_compare' : datas.datas_orders_list.status_payment_compare,	
				'status_payment_value' : datas.datas_orders_list.status_payment_value,
				
				'date_star' : datas.datas_orders_list.date_star,	
				'date_end' : datas.datas_orders_list.date_end,				
				
				'line_order_compare' : datas.datas_orders_list.line_order_compare,	
				'line_order_value' : datas.datas_orders_list.line_order_value
				
			}
			
			var fn_datas_orders_list = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_user',
							ojs_datas_orders.get_orders_datas(datas_send),
							datas.token_job
						);

				resolve(result);
			});	
		}else{
			var fn_datas_orders_list = 0;
		}
		promise_all.push(fn_datas_orders_list);	
		//@
		//@
		//@
		//@	
		//@ * 1.1. [datas_orders_list]
		//@ end of	




		//@
		//@
		//@
		//@	
		//@ * 1.2. [datas_orders_product_list]
		//@ thống kê theo s3n phẩm
		if(datas.datas_orders_product_list){
			var datas_send = {
				'user_id': datas.user_id,
				'store_id' : datas.store_id,
				
				'user_compare': datas.datas_orders_product_list.user_compare,
				'store_compare': datas.datas_orders_product_list.store_compare,	
				
				'status_admin_compare' : datas.datas_orders_product_list.status_admin_compare,
				'status_admin_value' : datas.datas_orders_product_list.status_admin_value,				
				
				'status_payment_compare' : datas.datas_orders_product_list.status_payment_compare,	
				'status_payment_value' : datas.datas_orders_product_list.status_payment_value,
				
				'date_star' : datas.datas_orders_product_list.date_star,	
				'date_end' : datas.datas_orders_product_list.date_end,				
				
				'line_order_compare' : datas.datas_orders_product_list.line_order_compare,	
				'line_order_value' : datas.datas_orders_product_list.line_order_value
				
			}
			
			var fn_datas_orders_product_list = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_user',
							ojs_datas_orders.get_datas_orders_product_list(datas_send),
							datas.token_job
						);

				resolve(result);
			});	
		}else{
			var fn_datas_orders_product_list = 0;
		}
		promise_all.push(fn_datas_orders_product_list);	
		//@
		//@
		//@
		//@	
		//@ * 1.2. [datas_orders_product_list]
		//@ end of









		//@
		//@
		//@ note
		var note = {
			'0':'khong có',
			'1':'datas_orders_list(thống kê theo cửa hàng)',
			'2':'datas_orders_product_list(thống kê theo sản phẩm)'			
		}
		promise_all.push(note);

		//@
		//@
		//@
		//@ promise all
		var result = await Promise.all(promise_all);
		

		//@
		//@
		//@
		//@ return 
		return result;

	}
};//end of oj_loader



module.exports = ojs_shares_get_orders_datas;





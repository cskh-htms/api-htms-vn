
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
		//@ * 1.1. [datas_orders_list_sum]
		//@ thống kê theo cửa hàng
		//@ tổng sản phẩm bán của cửa hàng
		//@ tổng tiền bán của cửa hàng
		if(datas.datas_orders_list_sum){
			var datas_send = {
				'user_id': datas.user_id,
				'store_id' : datas.store_id,
				
				'user_compare': datas.datas_orders_list_sum.user_compare,
				'store_compare': datas.datas_orders_list_sum.store_compare,	
				
				'status_admin_compare' : datas.datas_orders_list_sum.status_admin_compare,
				'status_admin_value' : datas.datas_orders_list_sum.status_admin_value,				
				
				'status_payment_compare' : datas.datas_orders_list_sum.status_payment_compare,	
				'status_payment_value' : datas.datas_orders_list_sum.status_payment_value,
				
				'date_star' : datas.datas_orders_list_sum.date_star,	
				'date_end' : datas.datas_orders_list_sum.date_end,				
				
				'line_order_compare' : datas.datas_orders_list_sum.line_order_compare,	
				'line_order_value' : datas.datas_orders_list_sum.line_order_value
				
			}
			
			var fn_datas_orders_list_sum = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_user',
							ojs_datas_orders.get_orders_datas(datas_send),
							datas.token_job
						);

				resolve(result);
			});	
		}else{
			var fn_datas_orders_list_sum = 0;
		}
		promise_all.push(fn_datas_orders_list_sum);	
		//@
		//@
		//@
		//@	
		//@ * 1.1. [datas_orders_list_sum]
		//@ end of	




		//@
		//@
		//@
		//@	
		//@ * 1.2. [datas_orders_product_list]
		//@ thống kê theo sản phẩm
		//@ tổng số lượng sản phẩm bán, tổng tiền bán của sản phẩm
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
		//@
		//@	
		//@ * 1.3. [order_list_by_user]
		//@  lấy danh sách order theo tên cửa hàng 
		if(datas.order_list_by_user){
			var datas_send = {
				'user_id': datas.user_id,
				'store_id' : datas.store_id,
				
				'user_compare': datas.order_list_by_user.user_compare,
				'store_compare': datas.order_list_by_user.store_compare,	
				
				'status_admin_compare' : datas.order_list_by_user.status_admin_compare,
				'status_admin_value' : datas.order_list_by_user.status_admin_value,				
				
				'status_payment_compare' : datas.order_list_by_user.status_payment_compare,	
				'status_payment_value' : datas.order_list_by_user.status_payment_value,
				
				'date_star' : datas.order_list_by_user.date_star,	
				'date_end' : datas.order_list_by_user.date_end,				
				
				'line_order_compare' : datas.order_list_by_user.line_order_compare,	
				'line_order_value' : datas.order_list_by_user.line_order_value
				
			}
			
			var fn_order_list_by_user = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_user',
							ojs_datas_orders.get_order_list_by_user(datas_send),
							datas.token_job
						);

				resolve(result);
			});	
		}else{
			var fn_order_list_by_user = 0;
		}
		promise_all.push(fn_order_list_by_user);	
		//@
		//@
		//@
		//@	
		//@ * 1.3. [order_list_by_user]
		//@ end of	
		
		
		
		
		
		//@
		//@
		//@
		//@	
		//@ * 1.4. [order_list_by_user]
		//@  lấy danh sách order theo tên cửa hàng 
		if(datas.order_sum_count){
			
			
			
			var datas_send = {
				'user_id': datas.user_id,
				'store_id' : datas.store_id,
				
				'user_compare': datas.order_sum_count.user_compare,
				'store_compare': datas.order_sum_count.store_compare,	
				
				'status_admin_compare' : datas.order_sum_count.status_admin_compare,
				'status_admin_value' : datas.order_sum_count.status_admin_value,				
				
				'status_payment_compare' : datas.order_sum_count.status_payment_compare,	
				'status_payment_value' : datas.order_sum_count.status_payment_value,
				
				'date_star' : datas.order_sum_count.date_star,	
				'date_end' : datas.order_sum_count.date_end,				
				
				'line_order_compare' : datas.order_sum_count.line_order_compare,	
				'line_order_value' : datas.order_sum_count.line_order_value
				
			}
			
			
			//return ojs_datas_orders.get_order_list_sum_count(datas_send);
			
			
			var fn_order_sum_count = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_user',
							ojs_datas_orders.get_order_list_sum_count(datas_send),
							datas.token_job
						);

				resolve(result);
			});	
		}else{
			var fn_order_sum_count = 0;
		}
		

		
		
		promise_all.push(fn_order_sum_count);	
		//@
		//@
		//@
		//@	
		//@ * 1.4. [order_sum_count]
		//@ end of	




		//@
		//@
		//@ note
		var note = {
			'0':'khong có',
			'1':'datas_orders_list_sum(thống kê theo cửa hàng)',
			'2':'datas_orders_product_list(thống kê theo sản phẩm)'	,
			'3':'order_list_by_user(thống kê order by store theo user)',
			'4':'order_sum_count(thống kê theo đơn hàng)'				
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





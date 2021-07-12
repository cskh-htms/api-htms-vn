
/*
* mục đích : loader datas admin menu


[load_datas_admin_menu]

* 1. [get_datas_admin_menu]

	
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
const ojs_datas_notes = require('./ojs-datas-notes.js');
const ojs_datas_orders = require('./ojs-datas-orders.js');
const ojs_datas_category = require('./ojs-datas-category.js');
const ojs_datas_stores = require('./ojs-datas-stores.js');
const ojs_datas_products = require('./ojs-datas-products.js');
const ojs_datas_option = require('./ojs-datas-option.js');
const ojs_datas_brands = require('./ojs-datas-brands.js');


const ojs_datas_comment = require('./ojs-datas-comment.js');
const ojs_datas_review = require('./ojs-datas-review.js');
const ojs_datas_review_store = require('./ojs-datas-review-store.js');
const ojs_datas_discount_program = require('./ojs-datas-discount-program.js');
const ojs_datas_discount_program_store_add = require('./ojs-datas-discount-program-store-add.js');
const ojs_datas_discount_program_product_add = require('./ojs-datas-discount-program-product-add.js');
const ojs_datas_coupon = require('./ojs-datas-coupon.js');






//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////





//@
//@
//@
//@
//@ ojs export
const ojs_shares_get_all_list_datas = {

	//@
	//@
	//@
	//@
	//@ return function load_datas_admin_menu
	get_all_list_datas : async function (datas) {
		
		
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
		//@ * 1. [datas_user]
		if(datas.datas_user){
			var fn_datas_user = 1;
		}else{
			var fn_datas_user = 0;
		}
		promise_all.push(fn_datas_user);	
		
		
		
		//@
		//@
		//@
		//@	
		//@ * 2. [datas_store]
		if(datas.datas_store){
			
			var x = {...datas.datas_store};
			var y = {'user_id': datas.user_id,'store_id' : datas.store_id}
			var z = Object.assign(x,y);
			var datas_send = z;
			
			var fn_datas_store = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/stores/search',
							ojs_datas_stores.get_all_list_datas(datas_send),
							datas.token_job
						);

				resolve(result);
			});	
		}else{
			var fn_datas_store = 0;
		}
		promise_all.push(fn_datas_store);			
		
		


		//@
		//@
		//@
		//@	
		//@ * 3. [datas_order]
		if(datas.datas_order){
			
			var x = {...datas.datas_order};
			var y = {'user_id': datas.user_id,'store_id' : datas.store_id}
			var z = Object.assign(x,y);
			var datas_send = z;
			
			var fn_datas_order = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search_user',
							ojs_datas_orders.get_all_list_datas(datas_send),
							datas.token_job
						);

				resolve(result);
			});	
		}else{
			var fn_datas_order = 0;
		}
		promise_all.push(fn_datas_order);



		//@
		//@
		//@
		//@	
		//@ * 4. [datas_cat]
		if(datas.datas_cat){
			var datas_send = {
				'user_id': datas.user_id,
				'store_id' : datas.store_id,
				'user_compare': datas.datas_cat.user_compare,
				'store_compare': datas.datas_cat.store_compare,	
				
				'status_admin_compare' : datas.datas_cat.status_admin_compare,
				'status_admin_value' : datas.datas_cat.status_admin_value,				
				
				'status_store_compare' : datas.datas_cat.status_store_compare,	
				'status_store_value' : datas.datas_cat.status_store_value			
			}			
			var fn_datas_cat = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/categorys/general/speciality/search',
							ojs_datas_category.get_all_list_datas(datas_send),
							datas.token_job
						);

				resolve(result);
			});	
		}else{
			var fn_datas_cat = 0;
		}
		promise_all.push(fn_datas_cat);





		//@
		//@
		//@
		//@	
		//@ * 5. [datas_option]
		if(datas.datas_option){
			var datas_send = {
				'user_id': datas.user_id,
				'store_id' : datas.store_id,
				'user_compare': datas.datas_option.user_compare,
				'store_compare': datas.datas_option.store_compare,	
				
				'status_admin_compare' : datas.datas_option.status_admin_compare,
				'status_admin_value' : datas.datas_option.status_admin_value,				
				
				'status_store_compare' : datas.datas_option.status_store_compare,	
				'status_store_value' : datas.datas_option.status_store_value			
			}				
			var fn_datas_option = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/options/speciality/search',
							ojs_datas_option.get_all_list_datas(datas_send),
							datas.token_job
						);

				resolve(result);
			});	
		}else{
			var fn_datas_option = 0;
		}
		promise_all.push(fn_datas_option);	
		
		
		



		
		//@
		//@
		//@
		//@	
		//@ * 6. [datas_brand]
		if(datas.datas_brand){
			var datas_send = {
				'user_id': datas.user_id,
				'store_id' : datas.store_id,
				'user_compare': datas.datas_brand.user_compare,
				'store_compare': datas.datas_brand.store_compare,	
				
				'status_admin_compare' : datas.datas_brand.status_admin_compare,
				'status_admin_value' : datas.datas_brand.status_admin_value,				
				
				'status_store_compare' : datas.datas_brand.status_store_compare,	
				'status_store_value' : datas.datas_brand.status_store_value			
			}
			var fn_datas_brand = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/brands/search',
							ojs_datas_brands.get_all_list_datas(datas_send),
							datas.token_job
						);

				resolve(result);
			});	
		}else{
			var fn_datas_brand = 0;
		}
		promise_all.push(fn_datas_brand);	
		
	





		//@
		//@
		//@
		//@	
		//@ * 7. [datas_product]
		if(datas.datas_product){
			
			var x = {...datas.datas_product};
			var y = {'user_id': datas.user_id,'store_id' : datas.store_id}
			var z = Object.assign(x,y);
			var datas_send = z;			
			
			//return datas_send;
			
			
			
			//return ojs_configs.domain + '/api/' + ojs_configs.api_version + '/products/speciality/search_all',
							//ojs_datas_products.get_all_list_datas(datas_send);
			
			
			var fn_datas_product = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/products/speciality/search_all',
							ojs_datas_products.get_all_list_datas(datas_send),
							datas.token_job
						);

				resolve(result);
			});	
		}else{
			var fn_datas_product = 0;
		}
		promise_all.push(fn_datas_product);		




		
		
		//@
		//@
		//@
		//@	
		//@ * 8. [datas_discount]
		if(datas.datas_discount){
			var fn_datas_discount = 0;
		}else{
			var fn_datas_discount = 0;
		}
		promise_all.push(fn_datas_discount);		
		
		
		
		//@
		//@
		//@
		//@	
		//@ * 9 [datas_discount_store_add]
		if(datas.datas_discount_store_add){
			var fn_datas_discount_store_add = 0;
		}else{
			var fn_datas_discount_store_add = 0;
		}
		promise_all.push(fn_datas_discount_store_add);			
		
		
		//@
		//@
		//@
		//@	
		//@ * 10. [datas_discount_product_add]
		if(datas.datas_discount_product_add){
			var fn_datas_discount_product_add = 0;
		}else{
			var fn_datas_discount_product_add = 0;
		}
		promise_all.push(fn_datas_discount_product_add);			
		
		
		
		//@
		//@
		//@
		//@	
		//@ * 11. [datas_comment]
		if(datas.datas_comment){
			var fn_datas_comment = 0;
		}else{
			var fn_datas_comment = 0;
		}
		promise_all.push(fn_datas_comment);				
				
		
		
		//@
		//@
		//@
		//@	
		//@ * 12. [datas_review]
		if(datas.datas_review){
			var fn_datas_review = 0;
		}else{
			var fn_datas_review = 0;
		}
		promise_all.push(fn_datas_review);			
				
		
		//@
		//@
		//@
		//@	
		//@ * 13. [datas_review_store]
		if(datas.datas_review_store){
			var fn_datas_review_store = 0;
		}else{
			var fn_datas_review_store = 0;
		}
		promise_all.push(fn_datas_review_store);						
		
		
		//@
		//@
		//@
		//@	
		//@ * 14. [datas_coupon]
		if(datas.datas_coupon){
			var fn_datas_coupon = 0;
		}else{
			var fn_datas_coupon = 0;
		}
		promise_all.push(fn_datas_coupon);				
		








		//@
		//@
		//@
		//@	
		//@ * 15. [datas_note]
		if(datas.datas_note){
			var datas_send = {
				'user_id': datas.user_id,
				'store_id' : datas.store_id,
				'user_compare': datas.datas_note.user_compare,
				'store_compare': datas.datas_note.store_compare,	
				
				'status_admin_compare' : datas.datas_note.status_admin_compare,
				'status_admin_value' : datas.datas_note.status_admin_value	
			}
			var fn_datas_note = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/notes/search',
							ojs_datas_notes.get_all_list_datas(datas_send),
							datas.token_job
						);

				resolve(result);
			});	
		}else{
			var fn_datas_note = 0;
		}
		promise_all.push(fn_datas_note);	
		
	




		//@
		//@
		//@ note
		var note = {
			'0':'khong có',
			'1': 'datas_user',
			'2': 'datas_store',
			'3': 'datas_order',
			'4': 'datas_cat',
			'5': 'datas_option',
			'6': 'datas_brand',
			'7': 'datas_product',
			'8': 'datas_discount',
			'9': 'datas_discount_store_add',
			'10': 'datas_discount_product_add',
			'11': 'datas_comment',
			'12': 'datas_review',	
			'13': 'datas_review_store',
			'14': 'datas_coupon',
			'15': 'datas_note'			
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



module.exports = ojs_shares_get_all_list_datas;





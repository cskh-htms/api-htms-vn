
/*
* mục đích : loader news admin menu


[load_news_admin_menu]

* 1. [get_news_admin_menu]

	
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
const ojs_shares_news_admin_menu = {

	//@
	//@
	//@
	//@
	//@ return function load_news_admin_menu
	get_news_admin_menu : async function (datas) {
		
		
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
		//@ * 1.1. [news_user]
		if(datas.news_user){
			var fn_news_user = 1;
		}else{
			var fn_news_user = 0;
		}
		promise_all.push(fn_news_user);	
		
		
		
		//@
		//@
		//@
		//@	
		//@ * 1.2. [news_store]
		if(datas.news_store){
			var fn_news_store = 1;
		}else{
			var fn_news_store = 0;
		}
		promise_all.push(fn_news_store);	
		

		
		//@
		//@
		//@
		//@	
		//@ * 1.3. [news_order]
		if(datas.news_order){
			var fn_news_order = new Promise((resolve, reject) => {
				var date_star = "2020/01/01 00:00:00";
				var date_end = ojs_shares_date.get_current_date_end();
				var status_number = "1";
				
				var sms = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/orders/speciality/search',
							ojs_datas_orders.orders_check_menu_data(date_star,date_end,status_number),
							datas.token
						);

				resolve(sms);
			});	
			
			promise_all.push(fn_news_order);
		}else{
			var fn_news_order = 0;
			promise_all.push(fn_news_order);
		}
		//@
		//@
		//@	end of 
		//@ * 1.3. [news_order]	
		
		
		
		//@
		//@
		//@
		//@	
		//@ * 1.4. [news_cat]
		if(datas.news_cat){
			var fn_news_cat = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/categorys/general/speciality/search',
							ojs_datas_category.get_data_news_admin_menu(),
							datas.token
						);

				resolve(result);
			});	
		}else{
			var fn_news_cat = 0;
		}
		promise_all.push(fn_news_cat);
		
		//@
		//@
		//@
		//@	
		//@ * 1.5. [news_option]
		if(datas.news_option){
			var fn_news_option = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/options/speciality/search',
							ojs_datas_option.get_data_news_admin_menu(),
							datas.token
						);

				resolve(result);
			});	
		}else{
			var fn_news_option = 0;
		}
		promise_all.push(fn_news_option);	
		
		
		



		
		//@
		//@
		//@
		//@	
		//@ * 1.6. [news_brand]
		if(datas.news_brand){
			var fn_news_brand = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/brands/search',
							ojs_datas_brands.get_data_news_admin_menu(),
							datas.token
						);

				resolve(result);
			});	
		}else{
			var fn_news_brand = 0;
		}
		promise_all.push(fn_news_brand);	
		
	
		
		
		//@
		//@
		//@
		//@	
		//@ * 1.7. [news_product]
		if(datas.news_product){
			var fn_news_product = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/products/speciality/search',
							ojs_datas_products.get_data_news_admin_menu(),
							datas.token
						);

				resolve(result);
			});	
		}else{
			var fn_news_product = 0;
		}
		promise_all.push(fn_news_product);			
		
		
		
		
		//@
		//@
		//@
		//@	
		//@ * 1.8. [news_discount]
		if(datas.news_discount){
			var fn_news_discount = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/discount-program/search',
							ojs_datas_discount_program.get_data_news_admin_menu(),
							datas.token
						);

				resolve(result);
			});	
		}else{
			var fn_news_discount = 0;
		}
		promise_all.push(fn_news_discount);		
		
		
		
		//@
		//@
		//@
		//@	
		//@ * 1.9. [news_discount_store_add]
		if(datas.news_discount_store_add){
			var fn_news_discount_store_add = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/discount-program-details/search',
							ojs_datas_discount_program_store_add.get_data_news_admin_menu(),
							datas.token
						);

				resolve(result);
			});	
		}else{
			var fn_news_discount_store_add = 0;
		}
		promise_all.push(fn_news_discount_store_add);			
		
		
		//@
		//@
		//@
		//@	
		//@ * 2.0. [news_discount_product_add]
		if(datas.news_discount_product_add){
			var fn_news_discount_product_add = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/discount-program-product-link/search',
							ojs_datas_discount_program_product_add.get_data_news_admin_menu(),
							datas.token
						);

				resolve(result);
			});	
		}else{
			var fn_news_discount_product_add = 0;
		}
		promise_all.push(fn_news_discount_product_add);			
		
		
		
		//@
		//@
		//@
		//@	
		//@ * 2.1. [news_comment]
		if(datas.news_comment){
			var fn_news_comment = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/comments/speciality/search',
							ojs_datas_comment.get_data_news_admin_menu(),
							datas.token
						);

				resolve(result);
			});	
		}else{
			var fn_news_comment = 0;
		}
		promise_all.push(fn_news_comment);				
				
		
		
		//@
		//@
		//@
		//@	
		//@ * 2.2. [news_review]
		if(datas.news_review){
			var fn_news_review = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/reviews/speciality/search',
							ojs_datas_review.get_data_news_admin_menu(),
							datas.token
						);

				resolve(result);
			});	
		}else{
			var fn_news_review = 0;
		}
		promise_all.push(fn_news_review);			
				
		
		//@
		//@
		//@
		//@	
		//@ * 2.3. [news_review_store]
		if(datas.news_review_store){
			var fn_news_review_store = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/reviews/store-speciality/search',
							ojs_datas_review_store.get_data_news_admin_menu(),
							datas.token
						);

				resolve(result);
			});	
		}else{
			var fn_news_review_store = 0;
		}
		promise_all.push(fn_news_review_store);						
		
		
		//@
		//@
		//@
		//@	
		//@ * 2.4. [news_coupon]
		if(datas.news_coupon){
			var fn_news_coupon = new Promise((resolve, reject) => {
				var result = ojs_shares_fetch_data.get_data_send_token_post( 
							ojs_configs.domain + '/api/' + ojs_configs.api_version + '/coupon/speciality/search',
							ojs_datas_coupon.get_data_news_admin_menu(),
							datas.token
						);

				resolve(result);
			});	
		}else{
			var fn_news_coupon = 0;
		}
		promise_all.push(fn_news_coupon);				
		


		//@
		//@
		//@ note
		var note = {
			'0':'khong có',
			'1': 'news_user',
			'2': 'news_store',
			'3': 'news_order',
			'4': 'news_cat',
			'5': 'news_option',
			'6': 'news_brand',
			'7': 'news_product',
			'8': 'news_discount',
			'9': 'news_discount_store_add',
			'10': 'news_discount_product_add',
			'11': 'news_comment',
			'12': 'news_review',	
			'13': 'news_review_store',
			'14': 'news_coupon'		
		}
		//promise_all.push(note);

		//@
		//@
		//@
		//@ promise all
		var result = await Promise.all(promise_all);
		
		//return result;
		//@
		//@
		//@
		//@ tạo data return
		var data_return = [];
		for(var i = 0; i < result.length ; i ++ ){
			if(result[i] == "0" || result[i] == 0){
				data_return.push(result[i])
			}else{
				var x = result[i].datas;
				var x2 = x[0];
				var x3 = Object.entries(x2);
				var x4 = x3[0][1];
				data_return.push(x4);
			}
		}		
		data_return.push(note);
		
		//@
		//@
		//@
		//@ return 
		return data_return;

	}
};//end of oj_loader



module.exports = ojs_shares_news_admin_menu;






/*
* mục đích : loader news admin menu


[load_news_admin_menu]

* 1. [get_news_admin_menu]

	* 1.1 [news_user]
	
	* 1.2 [news_store]
	
	* 1.3 [news_order]	
	
	
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
			var fn_news_discount = 1;
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
			var fn_news_discount_store_add = 1;
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
			var fn_news_discount_product_add = 1;
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
			var fn_news_comment = 1;
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
			var fn_news_review = 1;
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
			var fn_news_review_store = 1;
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
			var fn_news_coupon = 1;
		}else{
			var fn_news_coupon = 0;
		}
		promise_all.push(fn_news_coupon);				
		

		//@
		//@
		//@ note
		var note = {
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
		promise_all.push(note);

	
		var result = await Promise.all(promise_all);
		var data_return = [];
		data_return.push(0);
		
		
		for(let i = 0; i < result.length ; i ++ ){
			if(result[i] == 0){
				data_return.push(result[i])
			}else{
				data_return.push(result[i].datas)
			}
			
		}		
		
		
		/*
		for(let i = 0; i < result.length ; i ++ ){
			if(result[i] == 0 ||  result[i].error == "" ){
				if(result[i] == 0){
					let x = Object.values(result[i].datas[0])
					data_return.push(0);
				}else{
					let x = Object.values(result[i].datas[0])
					data_return.push(x[0]);
				}
			}
		}
		*/
		return result[3].datas[0];
		
		
		
		
		
		
		
		
		/*
		//@
		//@
		//@
		//@ data return	
		var data_return = {
			'news_user'	: news_user,
			'news_store': news_store,
			'news_order': news_order,
			'news_cat': news_cat,			
			'news_option': news_option,
			
			'news_product': news_product,
			'news_discount': news_discount,
			'news_coupon': news_coupon,			
			'news_discount_store_add': news_discount_store_add,
			
			'news_discount_product_add': news_discount_product_add,
			'news_comment': news_comment,
			'news_review': news_review,			
			'news_review_store': news_review_store,
			
			'news_brand': news_brand
		}
		
		
		
		
		//@
		//@
		//@
		//@ return 
		return data_return;
		*/
	}
};//end of oj_loader



module.exports = ojs_shares_news_admin_menu;





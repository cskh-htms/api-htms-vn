

const config_api = require('../configs/config');

const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');


const orders_search_news_admin = require('../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search-news-admin.js');
const category_news_admin = require('../../../lib/' + config_api.API_LIB_VERSION + '/categorys/category-news-admin.js');
const option_news_admin = require('../../../lib/' + config_api.API_LIB_VERSION + '/options/option-news-admin.js');
const brand_news_admin = require('../../../lib/' + config_api.API_LIB_VERSION + '/brands/brand-news-admin.js');
const product_news_admin = require('../../../lib/' + config_api.API_LIB_VERSION + '/products/product-news-admin.js');
const discount_news_admin = require('../../../lib/' + config_api.API_LIB_VERSION + '/discounts/discount-news-admin.js');

const discount_detail_news_admin = require('../../../lib/' + config_api.API_LIB_VERSION + '/discounts-details/discount-detail-news-admin.js');
const discount_product_news_admin = require('../../../lib/' + config_api.API_LIB_VERSION + '/discounts-products/discount-product-news-admin.js');
const review_news_admin = require('../../../lib/' + config_api.API_LIB_VERSION + '/reviews/review-news-admin.js');
const coupon_news_admin = require('../../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-news-admin.js');


const get_data_news_admin = async function (res){
	
	var promise_all = [];
	promise_all.push(0);
	
	
	//@users
	promise_all.push(0);	
	
	//@store
	promise_all.push(0);	
	
	//@ orders
	var fn_get_datas_order = new Promise((resolve, reject) => {
		let result = orders_search_news_admin(res);
		resolve(result);
	});	
	promise_all.push(fn_get_datas_order);



	//@category
	var fn_get_datas_category = new Promise((resolve, reject) => {
		let result = category_news_admin(res);
		resolve(result);
	});	
	promise_all.push(fn_get_datas_category);



	//@option
	var fn_get_datas_option = new Promise((resolve, reject) => {
		let result = option_news_admin(res);
		resolve(result);
	});	
	promise_all.push(fn_get_datas_option);



	//@brand
	var fn_get_datas_brand = new Promise((resolve, reject) => {
		let result = brand_news_admin(res);
		resolve(result);
	});	
	promise_all.push(fn_get_datas_brand);


	//@product
	var fn_get_datas_product = new Promise((resolve, reject) => {
		let result = product_news_admin(res);
		resolve(result);
	});	
	promise_all.push(fn_get_datas_product);



	//@discount
	var fn_get_datas_discount = new Promise((resolve, reject) => {
		let result = discount_news_admin(res);
		resolve(result);
	});	
	promise_all.push(fn_get_datas_discount);



	//@discount details
	var fn_get_datas_discount_detail = new Promise((resolve, reject) => {
		let result = discount_detail_news_admin(res);
		resolve(result);
	});	
	promise_all.push(fn_get_datas_discount_detail);




	//@discount product
	var fn_get_datas_discount_product = new Promise((resolve, reject) => {
		let result = discount_product_news_admin(res);
		resolve(result);
	});	
	promise_all.push(fn_get_datas_discount_product);




	//@comment
	promise_all.push(0);

	//@reviews
	var fn_get_datas_review = new Promise((resolve, reject) => {
		let result = review_news_admin(res);
		resolve(result);
	});	
	promise_all.push(fn_get_datas_review);


	//@review store
	promise_all.push(0);

	//@coupon
	var fn_get_datas_coupon = new Promise((resolve, reject) => {
		let result = coupon_news_admin(res);
		resolve(result);
	});	
	promise_all.push(fn_get_datas_coupon);


	//@
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
		'14': 'news_coupon',
	}

	var result = await Promise.all(promise_all);
	
	//return result;
	
	var data_return = [];
	for(var i = 0; i < result.length ; i ++ ){
		if(result[i] == "0" || result[i] == 0){
			data_return.push(result[i])
		}else{
			//var x = result[i][0];
			var x2 = result[i][0];
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


module.exports = get_data_news_admin;
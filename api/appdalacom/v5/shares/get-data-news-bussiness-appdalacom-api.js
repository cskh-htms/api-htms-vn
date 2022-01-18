

const ojs_configs = require('../../../../configs/config');
const config_database = require('../../../configs/config-database');
const config_api = require('../../../configs/config-api');

const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const orders_search_news_bussiness = require('../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search-news-bussiness.js');

const get_data_news_bussiness = async function (user_id){
	
	var promise_all = [];
	promise_all.push(0);
	
	//@ orders
	var fn_get_datas_order = new Promise((resolve, reject) => {
		var result = orders_search_news_bussiness(user_id);
		resolve(result);
	});	
	promise_all.push(fn_get_datas_order);


	//@ cat
	var fn_get_datas_category = new Promise((resolve, reject) => {
		var result = category_news_bussiness(user_id);
		resolve(result);
	});	
	promise_all.push(fn_get_datas_category);




	var promise_result = await Promise.all(promise_all);
	return (promise_result);
}


module.exports = get_data_news_bussiness;
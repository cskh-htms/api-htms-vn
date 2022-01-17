

const ojs_configs = require('../../../../configs/config');
const config_database = require('../../../configs/config-database');
const config_api = require('../../../configs/config-api');

const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const orders_search = require('../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search.js');

const get_data_news_bussiness = async function (user_id){
	
	var promise_all = [];
	promise_all.push(0);
	
	var fn_get_datas_order = new Promise((resolve, reject) => {
		var result = ojs_shares_news_bussiness_menu.get_news_bussiness_menu(datas_check_news_bussiness_menu);
		resolve(result);
	});	
	promise_all.push(fn_get_datas_order);



	
	var promise_result = await Promise.all(promise_all);
	return (promise_result);
}


module.exports = get_data_news_bussiness;
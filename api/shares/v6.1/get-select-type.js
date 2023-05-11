
const jwt = require('jsonwebtoken');

const config_api = require('./configs/config');





const ojs_shares_show_errors = require('./ojs-shares-show-errors');
const get_one_users = require('../../lib/' + config_api.API_LIB_VERSION + '/users/get-one-users');





const get_select_type =  function(datas){
	
	let data_return = " ";
	if(datas.select_type && datas.select_type.legnth != ""){
		data_return = data_return  + datas.select_type + " ";
	}
	return data_return;
}
module.exports = get_select_type;
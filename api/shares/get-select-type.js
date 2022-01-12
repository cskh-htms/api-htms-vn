
const jwt = require('jsonwebtoken');
const ojs_shares_show_errors = require('../../shares/ojs-shares-show-errors');
const get_one_users = require('../lib/users/get-one-users');
const ojs_configs = require('../../configs/config');




const get_select_type =  function(datas){
	
	let data_return = " ";
	if(datas.select_type && datas.select_type.legnth != ""){
		data_return = data_return  + datas.select_type + " ";
	}
	return data_return;
}
module.exports = {
	get_select_type
}
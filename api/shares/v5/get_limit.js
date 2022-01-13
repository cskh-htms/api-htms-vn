
const jwt = require('jsonwebtoken');

const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');

const ojs_shares_show_errors = require('./ojs-shares-show-errors');





const check_role = async function(token){
	
	try {
		var users_decode = jwt.decode(token);
		return ( users_decode.user_role );
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi decode , liên hệ admin" );
		return { "error" : "1", "position":"check-role","message": error_send };
	}	
}
module.exports = {
		check_role
}
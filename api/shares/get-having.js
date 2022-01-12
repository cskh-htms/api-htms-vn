
const jwt = require('jsonwebtoken');
const ojs_shares_show_errors = require('../../shares/ojs-shares-show-errors');
const get_one_users = require('../lib/users/get-one-users');
const ojs_configs = require('../../configs/config');




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
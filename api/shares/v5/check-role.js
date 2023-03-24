

const jwt = require('jsonwebtoken');

const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');

const ojs_shares_show_errors = require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const get_one_users = require('../../lib/' + config_api.API_LIB_VERSION + '/users/get-one-users');





const check_role = async function(token,res){
	
	try {
		var users_decode = jwt.decode(token);
		return ( users_decode.user_role );
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi decode , liên hệ admin" );
		return res.send ({ "error" : "1", "position":"api/shares/check-role","message": error_send });
		
	}	
}
module.exports = {
		check_role
}

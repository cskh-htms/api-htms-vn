
const jwt = require('jsonwebtoken');
const config_api = require('./configs/config');



const ojs_shares_show_errors = require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');



const check_owner_user = async function(token,user_id,res){
	try {
		var users_decode = jwt.decode(token);
		if(users_decode.users_ID == user_id){
			return 1;
		}else{
			return 0;
		}
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "check_owner_user , liên hệ admin" );
		return res.send ({ "error" : "1", "position":"api/shares/check_owner_user","message": error_send });
		
	}	
}
module.exports = {
	check_owner_user
}


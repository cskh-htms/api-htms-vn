
const jwt = require('jsonwebtoken');
const ojs_configs = require('../../../configs/config');




const check_owner_user = async function(token,user_id){
	
	try {
		var users_decode = jwt.decode(token);
		if(users_decode.users_ID == user_id){
			return 1;
		}else{
			return 0;
		}
	}
	catch(error){
		return { "error" : "1", "position":"shares-check-owner-user","message": "Lỗi function check_owner_user" };
	}	
}
module.exports = {
	check_owner_user
}


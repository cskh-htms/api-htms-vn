

const config_api = require('../configs/config');


//@
const fields_search = 	"" + 
	config_api.PREFIX  + "users_tracking_ID as users_tracking_ID, " + 
	config_api.PREFIX  + "users_tracking_user_id as users_tracking_user_id, " + 
	"DATE_FORMAT(" + config_api.PREFIX  + "users_tracking_created,'%Y/%m/%d %H:%i:%s') as users_tracking_created, " +	
	
	config_api.PREFIX  + "users_tracking_info as users_tracking_info, " + 
	config_api.PREFIX  + "users_tracking_status as users_tracking_status ";

//@
const  from_default = 	" from " + 
	config_api.PREFIX + "users_tracking "; 
	
//@	
const link_default = 	" ";


//export module
module.exports = { 
				fields_search,
				from_default,
				link_default
};





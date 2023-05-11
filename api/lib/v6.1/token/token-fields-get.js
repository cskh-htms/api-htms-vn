
const config_api = require('../configs/config');


//@
const fields_search = 	"" + 
	config_api.PREFIX + "token_ID as token_ID, " + 
	config_api.PREFIX + "token_date_created as token_date_created, " + 
	config_api.PREFIX + "token_type as token_type, " +
	config_api.PREFIX + "token_key as token_key, " + 
	config_api.PREFIX + "token_user_id as token_user_id, " + 
	config_api.PREFIX + "token_value as token_value ";

//@
const  from_default = 	" from " + 
	config_api.PREFIX + "token " ;
	
//@	
const link_default = 	" " ;


//export module
module.exports = { 
				fields_search,
				from_default,
				link_default
};





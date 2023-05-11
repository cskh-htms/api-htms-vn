
const config_api = require('../configs/config');


//@
const fields_get = 	"" + 
	config_api.PREFIX  + "notes_ID as notes_ID, " + 
	"DATE_FORMAT(" + config_api.PREFIX  + "notes_date_created,'%Y/%m/%d %H:%i:%s') as notes_date_created, " +	
	config_api.PREFIX  + "notes_user_id as notes_user_id, " + 
	config_api.PREFIX  + "notes_status as notes_status, " + 
	config_api.PREFIX  + "notes_title as notes_title, " + 
	config_api.PREFIX  + "notes_contents as notes_contents ";

//@
const from_default = 	" from " + 
	config_api.PREFIX + "notes "  ;	
	
	
	
	
//@	
const link_default = 	" " +
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "notes_user_id  = " + 
	config_api.PREFIX + "users_ID " + 

	" LEFT JOIN " + 
	config_api.PREFIX + "users_type  ON  " + 
	config_api.PREFIX + "users_users_type_id  = " + 
	config_api.PREFIX + "users_type_ID ";  


//export module
module.exports = { 
	fields_get,
	from_default,
	link_default
};






const config_database = require('../../../configs/config-database');


//@
const fields_get = 	"" + 
	config_database.PREFIX  + "notes_ID as notes_ID, " + 
	"DATE_FORMAT(" + config_database.PREFIX  + "notes_date_created,'%Y/%m/%d %H:%i:%s') as notes_date_created, " +	
	config_database.PREFIX  + "notes_user_id as notes_user_id, " + 
	config_database.PREFIX  + "notes_status as notes_status, " + 
	config_database.PREFIX  + "notes_title as notes_title, " + 
	config_database.PREFIX  + "notes_contents as notes_contents ";

//@
const from_default = 	" from " + 
	config_database.PREFIX + "notes "  ;	
	
	
	
	
//@	
const link_default = 	" " +
	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "notes_user_id  = " + 
	config_database.PREFIX + "users_ID " + 

	" LEFT JOIN " + 
	config_database.PREFIX + "users_type  ON  " + 
	config_database.PREFIX + "users_users_type_id  = " + 
	config_database.PREFIX + "users_type_ID ";  


//export module
module.exports = { 
	fields_get,
	from_default,
	link_default
};





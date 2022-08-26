
const config_database = require('../../../configs/config-database');


//@
const fields_search = 	"" + 
	config_database.PREFIX + "token_ID as token_ID, " + 
	config_database.PREFIX + "token_date_created as token_date_created, " + 
	config_database.PREFIX + "token_type as token_type, " +
	config_database.PREFIX + "token_key as token_key, " + 
	config_database.PREFIX + "token_value as token_value ";

//@
const  from_default = 	" from " + 
	config_database.PREFIX + "token " ;
	
//@	
const link_default = 	" " ;


//export module
module.exports = { 
				fields_search,
				from_default,
				link_default
};






const config_database = require('../../../configs/config-database');


//@
const fields_search = 	"" + 
	config_database.PREFIX  + "service_type_ID as service_type_ID, " + 
	
	config_database.PREFIX  + "service_type_name as service_type_name, " + 
	config_database.PREFIX  + "service_type_information as service_type_information ";




const fields_search_arr = [
	"service_type_ID",
	"service_type_name"
]










//@
const from_default = 	" from " + 
	config_database.PREFIX + "service_type ";	
	
//@	
const link_default = 	" ";


//export module
module.exports = { 
				fields_search,
				from_default,
				link_default,
				fields_search_arr
};





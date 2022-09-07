
const config_database = require('../../../configs/config-database');


//@
const fields_get = 	"" + 
	config_database.PREFIX  + "shipping_speciality_ID as shipping_speciality_ID, " + 
	config_database.PREFIX  + "shipping_speciality_name as shipping_speciality_name, " + 
	
	config_database.PREFIX  + "shipping_speciality_code as shipping_speciality_code, " + 
	config_database.PREFIX  + "shipping_speciality_parent_id as shipping_speciality_parent_id, " + 
	config_database.PREFIX  + "shipping_speciality_information as shipping_speciality_information, " + 	
	config_database.PREFIX  + "shipping_speciality_show as shipping_speciality_show, " + 	
	config_database.PREFIX  + "shipping_speciality_price as shipping_speciality_price ";

//@
const from_default = " from " + 
	config_database.PREFIX + "shipping_speciality "  ;	
	
	
//@	
const link_default = 	" ";




//export module
module.exports = { 
	fields_get,
	from_default,
	link_default			
};





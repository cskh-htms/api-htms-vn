

const config_api = require('../configs/config');



//@
const fields_get = 	"" + 
	config_api.PREFIX  + "shipping_speciality_ID as shipping_speciality_ID, " + 
	config_api.PREFIX  + "shipping_speciality_name as shipping_speciality_name, " + 
	
	config_api.PREFIX  + "shipping_speciality_code as shipping_speciality_code, " + 
	config_api.PREFIX  + "shipping_speciality_parent_id as shipping_speciality_parent_id, " + 
	config_api.PREFIX  + "shipping_speciality_information as shipping_speciality_information, " + 	
	config_api.PREFIX  + "shipping_speciality_show as shipping_speciality_show, " + 	
	config_api.PREFIX  + "shipping_speciality_price as shipping_speciality_price ";

//@
const from_default = " from " + 
	config_api.PREFIX + "shipping_speciality "  ;	
	
	
//@	
const link_default = 	" ";




//export module
module.exports = { 
	fields_get,
	from_default,
	link_default			
};





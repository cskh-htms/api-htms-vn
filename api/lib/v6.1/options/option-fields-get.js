

const config_api = require('../configs/config');



//@
const fields_get = 	"" + 
	config_api.PREFIX  + "options_product_speciality_ID as options_product_speciality_ID, " + 
	"DATE_FORMAT(" + config_api.PREFIX  + "options_product_speciality_date_created,'%Y/%m/%d %H:%i:%s') as options_product_speciality_date_created, " + 	
	config_api.PREFIX  + "options_product_speciality_name as options_product_speciality_name, " + 
	
	config_api.PREFIX  + "options_product_speciality_featured_image as options_product_speciality_featured_image, " + 
	config_api.PREFIX  + "options_product_speciality_parent_id as options_product_speciality_parent_id, " + 
	config_api.PREFIX  + "options_product_speciality_stores_id as options_product_speciality_stores_id, " +		
	
	config_api.PREFIX  + "options_product_speciality_status_stores as options_product_speciality_status_stores, " +
	config_api.PREFIX  + "options_product_speciality_status_admin as options_product_speciality_status_admin, " +
	config_api.PREFIX  + "options_product_speciality_status_update as options_product_speciality_status_update, " +		
	
	
	config_api.PREFIX  + "options_product_speciality_information as options_product_speciality_information, " + 
	config_api.PREFIX  + "options_product_speciality_qoute as options_product_speciality_qoute "; 

//@
const from_default = 	" from " + 
	config_api.PREFIX + "options_product_speciality "  ;	
	
	
	
	
//@	
const link_default = 	" " +
	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "options_product_speciality_stores_id  = " + 
	config_api.PREFIX + "stores_ID " +    
	
	" LEFT JOIN " + 
	config_api.PREFIX + "service_type  ON  " + 
	config_api.PREFIX + "stores_service_type_id  = " + 
	config_api.PREFIX + "service_type_ID  " +    	
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "stores_user_id  = " + 
	config_api.PREFIX + "users_ID " 	



//@	
const link_by_link = 	" " +


	" LEFT JOIN " + 
	config_api.PREFIX + "options_product_speciality_link  ON  " + 
	config_api.PREFIX + "options_product_speciality_link_option_id  = " + 
	config_api.PREFIX + "options_product_speciality_ID " +    
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "options_product_speciality_stores_id  = " + 
	config_api.PREFIX + "stores_ID " +    
	
	" LEFT JOIN " + 
	config_api.PREFIX + "service_type  ON  " + 
	config_api.PREFIX + "stores_service_type_id  = " + 
	config_api.PREFIX + "service_type_ID  " +    	
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "stores_user_id  = " + 
	config_api.PREFIX + "users_ID " 	




//export module
module.exports = { 
				fields_get,
				from_default,
				link_default,
				link_by_link
};





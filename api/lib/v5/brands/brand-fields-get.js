
const config_database = require('../../../configs/config-database');


//@
const fields_get = 	"" + 
	config_database.PREFIX  + "brands_ID as brands_ID, " + 
	config_database.PREFIX  + "brands_name as brands_name, " + 
	"DATE_FORMAT(" + config_database.PREFIX  + "brands_date_created,'%Y/%m/%d %H:%i:%s') as brands_date_created, " + 	
	
	config_database.PREFIX  + "brands_featured_image as brands_featured_image, " + 
	config_database.PREFIX  + "brands_information as brands_information, " + 
	config_database.PREFIX  + "brands_excerpt as brands_excerpt, " + 
	
	config_database.PREFIX  + "brands_status_admin as brands_status_admin, " + 
	config_database.PREFIX  + "brands_status_stores as brands_status_stores, " + 	
	config_database.PREFIX  + "brands_status_update as brands_status_update, " + 
	
	config_database.PREFIX  + "brands_stores_id as brands_stores_id, " + 
	config_database.PREFIX  + "brands_qoute as brands_qoute ";

//@
const from_default = 	" from " + 
	config_database.PREFIX + "brands "  ;	
	
	
	
	
//@	
const link_default = 	" " +
	" LEFT JOIN " + 
	config_database.PREFIX + "stores  ON  " + 
	config_database.PREFIX + "brands_stores_id  = " + 
	config_database.PREFIX + "stores_ID " +    
	
	" LEFT JOIN " + 
	config_database.PREFIX + "service_type  ON  " + 
	config_database.PREFIX + "stores_service_type_id  = " + 
	config_database.PREFIX + "service_type_ID  " +    	
	
	
	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "stores_user_id  = " + 
	config_database.PREFIX + "users_ID " ;	



//@	
const link_product = 	" " +

	" LEFT JOIN " + 
	config_database.PREFIX + "products_speciality  ON  " + 
	config_database.PREFIX + "brands_ID  = " + 
	config_database.PREFIX + "products_speciality_brand " +  
	
	" LEFT JOIN " + 
	config_database.PREFIX + "stores  ON  " + 
	config_database.PREFIX + "products_speciality_store_id  = " + 
	config_database.PREFIX + "stores_ID " +    
	
	" LEFT JOIN " + 
	config_database.PREFIX + "service_type  ON  " + 
	config_database.PREFIX + "stores_service_type_id  = " + 
	config_database.PREFIX + "service_type_ID  " +    	
	
	
	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "stores_user_id  = " + 
	config_database.PREFIX + "users_ID " ;	



//export module
module.exports = { 
				fields_get,
				from_default,
				link_default,
				link_product
};





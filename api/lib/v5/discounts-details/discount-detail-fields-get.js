
const config_database = require('../../../configs/config-database');


//@
const fields_get = 	"" + 
	config_database.PREFIX  + "discount_program_details_ID as discount_program_details_ID, " + 
	"DATE_FORMAT(" + config_database.PREFIX  + "discount_program_details_date_created,'%Y/%m/%d %H:%i:%s') as discount_program_details_date_created, " +	
	
	
	
	config_database.PREFIX  + "discount_program_details_discount_program_id as discount_program_details_discount_program_id, " + 
	config_database.PREFIX  + "discount_program_details_store_id as discount_program_details_store_id, " + 	
	config_database.PREFIX  + "discount_program_details_status_admin as discount_program_details_status_admin, " + 	
	config_database.PREFIX  + "discount_program_details_status_update as discount_program_details_status_update, " + 	
	
	config_database.PREFIX  + "discount_program_details_price as discount_program_details_price, " + 
	config_database.PREFIX  + "discount_program_details_limit_day as discount_program_details_limit_day, " + 	
	config_database.PREFIX  + "discount_program_details_limit_product as discount_program_details_limit_product, " + 	

	config_database.PREFIX  + "discount_program_details_qoute as discount_program_details_qoute "; 

//@
const from_default = 	" from " + 
	config_database.PREFIX + "discount_program_details "  ;	
	
	
	
	
//@	
const link_default = 	" " +

	" LEFT JOIN " + 
	config_database.PREFIX + "discount_program  ON  " + 
	config_database.PREFIX + "discount_program_details_discount_program_id  = " + 
	config_database.PREFIX + "discount_program_ID " +  
	
	" LEFT JOIN " + 
	config_database.PREFIX + "stores  ON  " + 
	config_database.PREFIX + "discount_program_details_store_id  = " + 
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
				link_default
};





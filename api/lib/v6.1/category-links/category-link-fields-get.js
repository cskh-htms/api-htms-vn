
const config_database = require('../../../configs/config-database');


//@
const fields_get = 	"" + 
	config_database.PREFIX  + "category_general_speciality_link_ID as category_general_speciality_link_ID, " + 
	config_database.PREFIX  + "category_general_speciality_link_product_id as category_general_speciality_link_product_id, " + 
	config_database.PREFIX  + "category_general_speciality_link_category_general_id as category_general_speciality_link_category_general_id ";


const from_default = 	" from " + 
	config_database.PREFIX + "category_general_speciality_link "  ;		
	
	
//@	
const link_default = 	" " +

	" LEFT JOIN " + 
		config_database.PREFIX +  "category_general_speciality  ON  " + 
		config_database.PREFIX +  "category_general_speciality_link_category_general_id = " + 
		config_database.PREFIX +  "category_general_speciality_ID  " + 

	" LEFT JOIN " + 
		config_database.PREFIX + "products_speciality  ON  " + 
		config_database.PREFIX + "category_general_speciality_link_product_id  = " + 
		config_database.PREFIX + "products_speciality_ID " + 	



	" LEFT JOIN " + 
		config_database.PREFIX +  "stores  ON  " + 
		config_database.PREFIX +  "category_general_speciality_stores_id = " + 
		config_database.PREFIX +  "stores_ID  " + 
		
	
	" LEFT JOIN " + 
		config_database.PREFIX + "service_type  ON  " + 
		config_database.PREFIX + "stores_service_type_id  = " + 
		config_database.PREFIX + "service_type_ID  " +    			
		
	" LEFT JOIN " + 
		config_database.PREFIX +  "users  ON  " + 
		config_database.PREFIX +  "stores_user_id = " + 
		config_database.PREFIX +  "users_ID  " ; 	
		
		
		
		
const link_by_product_store = 	" " +
	" LEFT JOIN " + 
		config_database.PREFIX +  "category_general_speciality  ON  " + 
		config_database.PREFIX +  "category_general_speciality_link_category_general_id = " + 
		config_database.PREFIX +  "category_general_speciality_ID  " + 

	" LEFT JOIN " + 
		config_database.PREFIX + "products_speciality  ON  " + 
		config_database.PREFIX + "category_general_speciality_link_product_id  = " + 
		config_database.PREFIX + "products_speciality_ID " + 	



	" LEFT JOIN " + 
		config_database.PREFIX +  "stores  ON  " + 
		config_database.PREFIX +  "products_speciality_store_id = " + 
		config_database.PREFIX +  "stores_ID  " + 
		
	
	" LEFT JOIN " + 
		config_database.PREFIX + "service_type  ON  " + 
		config_database.PREFIX + "stores_service_type_id  = " + 
		config_database.PREFIX + "service_type_ID  " +    			
		
	" LEFT JOIN " + 
		config_database.PREFIX +  "users  ON  " + 
		config_database.PREFIX +  "stores_user_id = " + 
		config_database.PREFIX +  "users_ID  " ; 	
		
		
		

//export module
module.exports = { 
				fields_get,
				from_default,
				link_default,
				link_by_product_store
};





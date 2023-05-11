
const config_database = require('../../../configs/config-database');


//@
const fields_get = 	"" + 
	config_database.PREFIX  + "products_speciality_price_meta_ID as products_speciality_price_meta_ID, " + 
	config_database.PREFIX  + "products_speciality_price_meta_discount_product_link_id as products_speciality_price_meta_discount_product_link_id, " + 
	config_database.PREFIX  + "products_speciality_price_meta_product_id as products_speciality_price_meta_product_id, " + 

	config_database.PREFIX  + "products_speciality_price_meta_from as products_speciality_price_meta_from, " + 
	config_database.PREFIX  + "products_speciality_price_meta_to as products_speciality_price_meta_to, " +
	config_database.PREFIX  + "products_speciality_price_meta_price as products_speciality_price_meta_price ";

//@
const from_default = 	" from " + 
	config_database.PREFIX + "products_speciality_price_meta "  ;	
	
	
	
	
//@	
const link_default = 	" " +

	" LEFT JOIN " + 
	config_database.PREFIX + "discount_program_product_link  ON  " + 
	config_database.PREFIX + "products_speciality_price_meta_discount_product_link_id  = " + 
	config_database.PREFIX + "discount_program_product_link_ID " +    
	
	
	
	" LEFT JOIN " + 
	config_database.PREFIX + "discount_program  ON  " + 
	config_database.PREFIX + "discount_program_product_link_discount_program_id  = " + 
	config_database.PREFIX + "discount_program_ID " +  	
	
	
	" LEFT JOIN " + 
	config_database.PREFIX + "products_speciality  ON  " + 
	config_database.PREFIX + "products_speciality_price_meta_product_id  = " + 
	config_database.PREFIX + "products_speciality_ID "	+ 	
	
	
	" LEFT JOIN " + 
	config_database.PREFIX + "stores  ON  " + 
	config_database.PREFIX + "products_speciality_store_id  = " + 
	config_database.PREFIX + "stores_ID " +  	
	
	
	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "stores_user_id  = " + 
	config_database.PREFIX + "users_ID "; 		
	
 


//export module
module.exports = { 
				fields_get,
				from_default,
				link_default
};





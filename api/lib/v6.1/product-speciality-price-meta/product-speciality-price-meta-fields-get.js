
const config_api = require('../configs/config');





//@
const fields_get = 	"" + 
	config_api.PREFIX  + "products_speciality_price_meta_ID as products_speciality_price_meta_ID, " + 
	config_api.PREFIX  + "products_speciality_price_meta_discount_product_link_id as products_speciality_price_meta_discount_product_link_id, " + 
	config_api.PREFIX  + "products_speciality_price_meta_product_id as products_speciality_price_meta_product_id, " + 

	config_api.PREFIX  + "products_speciality_price_meta_from as products_speciality_price_meta_from, " + 
	config_api.PREFIX  + "products_speciality_price_meta_to as products_speciality_price_meta_to, " +
	config_api.PREFIX  + "products_speciality_price_meta_price as products_speciality_price_meta_price ";

//@
const from_default = 	" from " + 
	config_api.PREFIX + "products_speciality_price_meta "  ;	
	
	
	
	
//@	
const link_default = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "discount_program_product_link  ON  " + 
	config_api.PREFIX + "products_speciality_price_meta_discount_product_link_id  = " + 
	config_api.PREFIX + "discount_program_product_link_ID " +    
	
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "discount_program  ON  " + 
	config_api.PREFIX + "discount_program_product_link_discount_program_id  = " + 
	config_api.PREFIX + "discount_program_ID " +  	
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "products_speciality  ON  " + 
	config_api.PREFIX + "products_speciality_price_meta_product_id  = " + 
	config_api.PREFIX + "products_speciality_ID "	+ 	
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "products_speciality_store_id  = " + 
	config_api.PREFIX + "stores_ID " +  	
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "stores_user_id  = " + 
	config_api.PREFIX + "users_ID "; 		
	
 


//export module
module.exports = { 
				fields_get,
				from_default,
				link_default
};





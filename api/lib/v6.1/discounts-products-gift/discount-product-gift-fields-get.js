

const config_api = require('../configs/config');




//@
const fields_get = 	"" + 
	config_api.PREFIX  + "discount_program_gift_link_ID as discount_program_gift_link_ID, " + 
	"DATE_FORMAT(" + config_api.PREFIX  + "discount_program_gift_link_date_created,'%Y/%m/%d %H:%i:%s') as discount_program_gift_link_date_created, " +	
	config_api.PREFIX  + "discount_program_gift_link_product_speciality_id as discount_program_gift_link_product_speciality_id, " + 
	config_api.PREFIX  + "discount_program_gift_link_discount_program_product_link_id as discount_program_gift_link_discount_program_product_link_id, " + 

	config_api.PREFIX  + "discount_program_gift_link_product_speciality_gift_id as discount_program_gift_link_product_speciality_gift_id, ";

//@
const from_default = 	" from " + 
	config_api.PREFIX + "discount_program_gift_link "  ;	
	
	
	
	
//@	
const link_default = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "discount_program_product_link  ON  " + 
	config_api.PREFIX + "discount_program_gift_link_discount_program_product_link_id  = " + 
	config_api.PREFIX + "discount_program_product_link_ID " +    
	
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "discount_program  ON  " + 
	config_api.PREFIX + "discount_program_product_link_discount_program_id  = " + 
	config_api.PREFIX + "discount_program_ID " +  	
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "products_speciality  ON  " + 
	config_api.PREFIX + "discount_program_gift_link_product_speciality_gift_id  = " + 
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





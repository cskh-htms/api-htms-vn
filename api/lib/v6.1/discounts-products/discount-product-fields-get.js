

const config_api = require('../configs/config');



//@
const fields_get = 	"" + 
	config_api.PREFIX  + "discount_program_product_link_ID as discount_program_product_link_ID, " + 
	"DATE_FORMAT(" + config_api.PREFIX  + "discount_program_product_link_date_created,'%Y/%m/%d %H:%i:%s') as discount_program_product_link_date_created, " +	
	config_api.PREFIX  + "discount_program_product_link_discount_program_details_id as discount_program_product_link_discount_program_details_id, " + 
	config_api.PREFIX  + "discount_program_product_link_discount_program_id as discount_program_product_link_discount_program_id, " + 	
	config_api.PREFIX  + "discount_program_product_link_product_speciality_id as discount_program_product_link_product_speciality_id, " + 
	config_api.PREFIX  + "discount_program_product_link_status as discount_program_product_link_status, " + 	
	
	config_api.PREFIX  + "discount_program_product_link_sale_of_price as discount_program_product_link_sale_of_price, " +
	config_api.PREFIX  + "discount_program_product_link_date_star as discount_program_product_link_date_star, " +
	config_api.PREFIX  + "discount_program_product_link_date_end as discount_program_product_link_date_end, " +
	
	config_api.PREFIX  + "discount_program_product_link_qoute as discount_program_product_link_qoute ";

//@
const from_default = 	" from " + 
	config_api.PREFIX + "discount_program_product_link "  ;	
	
	
	
	
//@	
const link_default = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "discount_program  ON  " + 
	config_api.PREFIX + "discount_program_product_link_discount_program_id  = " + 
	config_api.PREFIX + "discount_program_ID " +  	
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "products_speciality  ON  " + 
	config_api.PREFIX + "discount_program_product_link_product_speciality_id  = " + 
	config_api.PREFIX + "products_speciality_ID " +  	

	
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





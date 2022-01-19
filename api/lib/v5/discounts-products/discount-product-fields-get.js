
const config_database = require('../../../configs/config-database');


//@
const fields_get = 	"" + 
	config_database.PREFIX  + "discount_program_product_link_ID as discount_program_product_link_ID, " + 
	"DATE_FORMAT(" + config_database.PREFIX  + "discount_program_product_link_date_created,'%Y/%m/%d %H:%i:%s') as discount_program_product_link_date_created, " +	
	config_database.PREFIX  + "discount_program_product_link_discount_program_details_id as discount_program_product_link_discount_program_details_id, " + 
	
	config_database.PREFIX  + "discount_program_product_link_product_speciality_id as discount_program_product_link_product_speciality_id, " + 
	config_database.PREFIX  + "discount_program_product_link_status as discount_program_product_link_status, " + 	
	
	config_database.PREFIX  + "discount_program_product_link_sale_of_price as discount_program_product_link_sale_of_price, " +
	config_database.PREFIX  + "discount_program_product_link_date_star as discount_program_product_link_date_star, " +
	config_database.PREFIX  + "discount_program_product_link_date_end as discount_program_product_link_date_end, " +
	
	config_database.PREFIX  + "discount_program_product_link_qoute as discount_program_product_link_qoute ";

//@
const from_default = 	" from " + 
	config_database.PREFIX + "discount_program_product_link "  ;	
	
	
	
	
//@	
const link_default = 	" " +

	" LEFT JOIN " + 
	config_database.PREFIX + "discount_program_details  ON  " + 
	config_database.PREFIX + "discount_program_product_link_discount_program_details_id  = " + 
	config_database.PREFIX + "discount_program_details_ID " +    
	
	
	
	" LEFT JOIN " + 
	config_database.PREFIX + "discount_program  ON  " + 
	config_database.PREFIX + "discount_program_details_discount_program_id  = " + 
	config_database.PREFIX + "discount_program_ID " +  	
	
	
	
	" LEFT JOIN " + 
	config_database.PREFIX + "stores  ON  " + 
	config_database.PREFIX + "discount_program_details_store_id  = " + 
	config_database.PREFIX + "stores_ID " +  	
	
	
	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "stores_user_id  = " + 
	config_database.PREFIX + "users_ID " +  		
	
	
	" LEFT JOIN " + 
	config_database.PREFIX + "products_speciality  ON  " + 
	config_database.PREFIX + "discount_program_product_link_product_speciality_id  = " + 
	config_database.PREFIX + "products_speciality_ID " ;	  


//export module
module.exports = { 
				fields_get,
				from_default,
				link_default
};





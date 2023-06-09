
const config_api = require('../configs/config');



//@
const fields_get = 	"" + 
	config_api.PREFIX  + "discount_program_ID as discount_program_ID, " + 
	"DATE_FORMAT(" + config_api.PREFIX  + "discount_program_date_created,'%Y/%m/%d %H:%i:%s') as discount_program_date_created, " + 	
	config_api.PREFIX  + "discount_program_featured_image as discount_program_featured_image, " +	
	config_api.PREFIX  + "discount_program_name as discount_program_name, " +	
	config_api.PREFIX  + "discount_program_position as discount_program_position, " +		
	
	config_api.PREFIX  + "discount_program_store_id_created as discount_program_store_id_created, " +
	config_api.PREFIX  + "discount_program_status_admin as discount_program_status_admin, " +
	config_api.PREFIX  + "discount_program_status_update as discount_program_status_update, " +	
	config_api.PREFIX  + "discount_program_qoute as discount_program_qoute, " +	
	
	
	config_api.PREFIX  + "discount_program_price_created as discount_program_price_created, " + 	
	config_api.PREFIX  + "discount_program_price_sale as discount_program_price_sale, " + 
	config_api.PREFIX  + "discount_program_type as discount_program_type, " + 
	config_api.PREFIX  + "discount_program_time_type as discount_program_time_type, " + 
	config_api.PREFIX  + "discount_program_gift_type as discount_program_gift_type, " + 

	
	config_api.PREFIX  + "discount_program_price_one_day as discount_program_price_one_day, " + 	
	config_api.PREFIX  + "discount_program_price_one_product as discount_program_price_one_product, " + 	
	
	config_api.PREFIX  + "discount_program_limit_day as discount_program_limit_day, " + 	
	config_api.PREFIX  + "discount_program_limit_product as discount_program_limit_product, " + 	
	
	
	"DATE_FORMAT(" + config_api.PREFIX  + "discount_program_date_star,'%Y/%m/%d %H:%i:%s') as discount_program_date_star, " +		
	"DATE_FORMAT(" + config_api.PREFIX  + "discount_program_date_end,'%Y/%m/%d %H:%i:%s') as discount_program_date_end, " +		
	
	config_api.PREFIX  + "discount_program_information as discount_program_information " ;

//@
const from_default = 	" from " + 
	config_api.PREFIX + "discount_program "  ;	
	
	
	
	
//@	
const link_default = 	" " +
	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "discount_program_store_id_created  = " + 
	config_api.PREFIX + "stores_ID " +    
	
	" LEFT JOIN " + 
	config_api.PREFIX + "service_type  ON  " + 
	config_api.PREFIX + "stores_service_type_id  = " + 
	config_api.PREFIX + "service_type_ID  " +    	
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "stores_user_id  = " + 
	config_api.PREFIX + "users_ID " ;


//@	
const link_product = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "discount_program_product_link  ON  " + 
	config_api.PREFIX + "discount_program_product_link_discount_program_id  = " + 
	config_api.PREFIX + "discount_program_ID  " +  


	" LEFT JOIN " + 
	config_api.PREFIX + "products_speciality  ON  " + 
	config_api.PREFIX + "discount_program_product_link_product_speciality_id  = " + 
	config_api.PREFIX + "products_speciality_ID " +    
	
	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "products_speciality_store_id  = " + 
	config_api.PREFIX + "stores_ID ";

//export module
module.exports = { 
				fields_get,
				from_default,
				link_default,
				link_product
};





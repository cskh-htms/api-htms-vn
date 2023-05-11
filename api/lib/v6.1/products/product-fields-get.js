
const config_api = require('../configs/config');



//@
const fields_get = 	"" + 
	config_api.PREFIX  + "products_speciality_ID as products_speciality_ID, " + 
	"DATE_FORMAT(" + config_api.PREFIX  + "products_speciality_date_created,'%Y/%m/%d %H:%i:%s') as products_speciality_date_created, " + 
	
	config_api.PREFIX  + "products_speciality_name as products_speciality_name, " + 
	config_api.PREFIX  + "products_speciality_type as products_speciality_type, " + 
	config_api.PREFIX  + "products_speciality_sku as products_speciality_sku, " + 
	config_api.PREFIX  + "products_speciality_start_buy as products_speciality_start_buy, " + 
	
	config_api.PREFIX  + "products_speciality_store_id as products_speciality_store_id, " + 
	config_api.PREFIX  + "products_speciality_parent_id as products_speciality_parent_id, " + 	
	


	config_api.PREFIX  + "products_speciality_featured_image as products_speciality_featured_image, " + 
	config_api.PREFIX  + "products_speciality_image_slider as products_speciality_image_slider, " + 
	config_api.PREFIX  + "products_speciality_contents as products_speciality_contents, " + 
	
	config_api.PREFIX  + "products_speciality_origin as products_speciality_origin, " + 
	config_api.PREFIX  + "products_speciality_show_hide as products_speciality_show_hide, " + 
	
	config_api.PREFIX  + "products_speciality_price as products_speciality_price, " + 
	config_api.PREFIX  + "products_speciality_sale_of_price as products_speciality_sale_of_price, " + 
	"DATE_FORMAT(" + config_api.PREFIX  + "products_speciality_date_start,'%Y/%m/%d %H:%i:%s') as products_speciality_date_start, " + 
	"DATE_FORMAT(" + config_api.PREFIX  + "products_speciality_date_end,'%Y/%m/%d %H:%i:%s') as products_speciality_date_end, " +  	

	config_api.PREFIX  + "products_speciality_stock as products_speciality_stock, " + 
	config_api.PREFIX  + "products_speciality_stock_status as products_speciality_stock_status, " + 
	
	config_api.PREFIX  + "products_speciality_brand as products_speciality_brand, " + 
	config_api.PREFIX  + "products_speciality_status_admin as products_speciality_status_admin, " + 
	config_api.PREFIX  + "products_speciality_status_store as products_speciality_status_store, " + 
	config_api.PREFIX  + "products_speciality_status_update as products_speciality_status_update, " + 
	
	

	config_api.PREFIX  + "products_speciality_variation_option as products_speciality_variation_option, " + 
	config_api.PREFIX  + "products_speciality_excerpt as products_speciality_excerpt, " + 	
	config_api.PREFIX  + "products_speciality_qoute as products_speciality_qoute, " +	
	config_api.PREFIX  + "products_speciality_height as products_speciality_height, " + 
	config_api.PREFIX  + "products_speciality_width as products_speciality_width, " + 
	config_api.PREFIX  + "products_speciality_length as products_speciality_length, " + 
	config_api.PREFIX  + "products_speciality_weight as products_speciality_weight " ;

//@
const from_default = 	" from " + 
	config_api.PREFIX + "products_speciality "  ;	
	
	
	
	
//@	
const link_default = " " +
	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "products_speciality_store_id  = " + 
	config_api.PREFIX + "stores_ID " +    
	
	" LEFT JOIN " + 
	config_api.PREFIX + "service_type  ON  " + 
	config_api.PREFIX + "stores_service_type_id  = " + 
	config_api.PREFIX + "service_type_ID  " +    	
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "stores_user_id  = " + 
	config_api.PREFIX + "users_ID ";


//@	
const link_brand = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "brands  ON  " + 
	config_api.PREFIX + "products_speciality_brand  = " + 
	config_api.PREFIX + "brands_ID  " + 
	
	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "products_speciality_store_id  = " + 
	config_api.PREFIX + "stores_ID " +    
	
	" LEFT JOIN " + 
	config_api.PREFIX + "service_type  ON  " + 
	config_api.PREFIX + "stores_service_type_id  = " + 
	config_api.PREFIX + "service_type_ID  " +    	
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "stores_user_id  = " + 
	config_api.PREFIX + "users_ID ";



//@	
const link_category = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "category_general_speciality_link ON  " + 
	config_api.PREFIX + "products_speciality_ID  = " + 
	config_api.PREFIX + "category_general_speciality_link_product_id " +   


	" LEFT JOIN " + 
	config_api.PREFIX + "category_general_speciality ON  " + 
	config_api.PREFIX + "category_general_speciality_link_category_general_id  = " + 
	config_api.PREFIX + "category_general_speciality_ID " +  

	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "products_speciality_store_id  = " + 
	config_api.PREFIX + "stores_ID " +    
	
	" LEFT JOIN " + 
	config_api.PREFIX + "service_type  ON  " + 
	config_api.PREFIX + "stores_service_type_id  = " + 
	config_api.PREFIX + "service_type_ID  " +    	
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "stores_user_id  = " + 
	config_api.PREFIX + "users_ID ";



//@	
const link_option = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "options_product_speciality_link ON  " + 
	config_api.PREFIX + "products_speciality_ID  = " + 
	config_api.PREFIX + "options_product_speciality_link_product_id " +   


	" LEFT JOIN " + 
	config_api.PREFIX + "options_product_speciality ON  " + 
	config_api.PREFIX + "options_product_speciality_link_option_id  = " + 
	config_api.PREFIX + "options_product_speciality_ID " +  

	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "products_speciality_store_id  = " + 
	config_api.PREFIX + "stores_ID " +    
	
	" LEFT JOIN " + 
	config_api.PREFIX + "service_type  ON  " + 
	config_api.PREFIX + "stores_service_type_id  = " + 
	config_api.PREFIX + "service_type_ID  " +    	
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "stores_user_id  = " + 
	config_api.PREFIX + "users_ID ";



//@	
const link_discount_category = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "category_general_speciality_link ON  " + 
	config_api.PREFIX + "products_speciality_ID  = " + 
	config_api.PREFIX + "category_general_speciality_link_product_id " +   


	" LEFT JOIN " + 
	config_api.PREFIX + "category_general_speciality ON  " + 
	config_api.PREFIX + "category_general_speciality_link_category_general_id  = " + 
	config_api.PREFIX + "category_general_speciality_ID " +  

	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "products_speciality_store_id  = " + 
	config_api.PREFIX + "stores_ID " +    
	
	" LEFT JOIN " + 
	config_api.PREFIX + "service_type  ON  " + 
	config_api.PREFIX + "stores_service_type_id  = " + 
	config_api.PREFIX + "service_type_ID  " +    	
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "stores_user_id  = " + 
	config_api.PREFIX + "users_ID " + 
	
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "discount_program_product_link ON  " + 
	config_api.PREFIX + "products_speciality_ID  = " + 
	config_api.PREFIX + "discount_program_product_link_product_speciality_id " +  	

	" LEFT JOIN " + 
	config_api.PREFIX + "discount_program_details ON  " + 
	config_api.PREFIX + "discount_program_product_link_discount_program_details_id  = " + 
	config_api.PREFIX + "discount_program_details_ID " +  	

	" LEFT JOIN " + 
	config_api.PREFIX + "discount_program ON  " + 
	config_api.PREFIX + "discount_program_details_discount_program_id = " + 
	config_api.PREFIX + "discount_program_ID ";


//@	
const link_discount_product_add = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "discount_program_product_link ON  " + 
	config_api.PREFIX + "products_speciality_ID  = " + 
	config_api.PREFIX + "discount_program_product_link_product_speciality_id " +   

	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "products_speciality_store_id  = " + 
	config_api.PREFIX + "stores_ID " +     

	" LEFT JOIN " + 
	config_api.PREFIX + "discount_program_details ON  " + 
	config_api.PREFIX + "discount_program_product_link_discount_program_details_id  = " + 
	config_api.PREFIX + "discount_program_details_ID " +  	

	" LEFT JOIN " + 
	config_api.PREFIX + "discount_program ON  " + 
	config_api.PREFIX + "discount_program_details_discount_program_id = " + 
	config_api.PREFIX + "discount_program_ID ";
	
	
//@	
const link_discount_program = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "discount_program_product_link ON  " + 
	config_api.PREFIX + "products_speciality_ID  = " + 
	config_api.PREFIX + "discount_program_product_link_product_speciality_id " +   

	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "products_speciality_store_id  = " + 
	config_api.PREFIX + "stores_ID " +     

	" LEFT JOIN " + 
	config_api.PREFIX + "discount_program ON  " + 
	config_api.PREFIX + "discount_program_product_link_discount_program_id = " + 
	config_api.PREFIX + "discount_program_ID ";	
	
	
	
	
	
	
//@	
const link_fillter = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "category_general_speciality_link ON  " + 
	config_api.PREFIX + "products_speciality_ID  = " + 
	config_api.PREFIX + "category_general_speciality_link_product_id " +   


	" LEFT JOIN " + 
	config_api.PREFIX + "category_general_speciality ON  " + 
	config_api.PREFIX + "category_general_speciality_link_category_general_id  = " + 
	config_api.PREFIX + "category_general_speciality_ID " +  


	" LEFT JOIN " + 
	config_api.PREFIX + "brands  ON  " + 
	config_api.PREFIX + "products_speciality_brand  = " + 
	config_api.PREFIX + "brands_ID  " + 


	" LEFT JOIN " + 
	config_api.PREFIX + "options_product_speciality_link  ON  " + 
	config_api.PREFIX + "products_speciality_ID  = " + 
	config_api.PREFIX + "options_product_speciality_link_product_id  " + 


	" LEFT JOIN " + 
	config_api.PREFIX + "options_product_speciality  ON  " + 
	config_api.PREFIX + "options_product_speciality_link_option_id  = " + 
	config_api.PREFIX + "options_product_speciality_ID  " + 
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "discount_program_product_link ON  " + 
	config_api.PREFIX + "products_speciality_ID  = " + 
	config_api.PREFIX + "discount_program_product_link_product_speciality_id " +   		
	
	" LEFT JOIN " + 
	config_api.PREFIX + "discount_program ON  " + 
	config_api.PREFIX + "discount_program_product_link_discount_program_id = " + 
	config_api.PREFIX + "discount_program_ID " + 
	
	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "products_speciality_store_id  = " + 
	config_api.PREFIX + "stores_ID " +    
	
	" LEFT JOIN " + 
	config_api.PREFIX + "service_type  ON  " + 
	config_api.PREFIX + "stores_service_type_id  = " + 
	config_api.PREFIX + "service_type_ID  " +    	
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "stores_user_id  = " + 
	config_api.PREFIX + "users_ID ";	
	
	
	
	
//@	
const link_sale = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "orders_details_speciality ON  " + 
	config_api.PREFIX + "products_speciality_ID  = " + 
	config_api.PREFIX + "orders_details_speciality_product_id " +   
	
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality  ON  " + 
	config_api.PREFIX + "orders_details_speciality_order_id = " + 
	config_api.PREFIX + "orders_speciality_ID " + 
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "products_speciality_store_id  = " + 
	config_api.PREFIX + "stores_ID " +    
	
	" LEFT JOIN " + 
	config_api.PREFIX + "service_type  ON  " + 
	config_api.PREFIX + "stores_service_type_id  = " + 
	config_api.PREFIX + "service_type_ID  " +    	
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "stores_user_id  = " + 
	config_api.PREFIX + "users_ID ";	
		
	
	
//export module
module.exports = { 
				fields_get,
				from_default,
				link_default,
				link_category,
				link_option,
				link_brand,
				link_sale,
				link_fillter,
				link_discount_category,
				link_discount_product_add,
				link_discount_program
};





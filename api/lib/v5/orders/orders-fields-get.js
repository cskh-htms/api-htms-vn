
const config_database = require('../../../configs/config-database');


//@
const fields_get = 	"" + 
	config_database.PREFIX  + "reviews_speciality_ID as reviews_speciality_ID, " + 
	"DATE_FORMAT(" + config_database.PREFIX  + "reviews_speciality_date_created," + "'%Y/%m/%d %H:%i:%s'"  + ") as reviews_speciality_date_created, " + 	
	config_database.PREFIX  + "reviews_speciality_user_id as reviews_speciality_user_id, " + 
	config_database.PREFIX  + "reviews_speciality_product_id as reviews_speciality_product_id, " + 
	config_database.PREFIX  + "reviews_speciality_contents as reviews_speciality_contents, " + 
	config_database.PREFIX  + "reviews_speciality_images as reviews_speciality_images, " + 
	config_database.PREFIX  + "reviews_speciality_videos as reviews_speciality_videos, " + 	
	config_database.PREFIX  + "reviews_speciality_status_admin as reviews_speciality_status_admin, " +  
	config_database.PREFIX  + "reviews_speciality_number_star as reviews_speciality_number_star " ;

//@
const from_default = " from " + 
	config_database.PREFIX + "orders_speciality "  ;	
	
	
//@
const from_product_sale_by_store = " from " + 
	config_database.PREFIX + "view_count_product_sale ";
	
	
//@	
const link_default = 	" " +
	" LEFT JOIN " + 
	config_database.PREFIX + "stores  ON  " + 
	config_database.PREFIX + "orders_speciality_store_id  = " + 
	config_database.PREFIX + "stores_ID " + 
	
	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "stores_user_id  = " + 
	config_database.PREFIX + "users_ID "; 	

const link_shipper = 	" " +
	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "orders_speciality_shipper_id  = " + 
	config_database.PREFIX + "users_ID " +    
	
	" LEFT JOIN " + 
	config_database.PREFIX + "stores  ON  " + 
	config_database.PREFIX + "orders_speciality_store_id  = " + 
	config_database.PREFIX + "stores_ID ";



const link_order_by_store = 	" " +
	" LEFT JOIN " + 
	config_database.PREFIX + "orders_details_speciality ON  " + 
	config_database.PREFIX + "orders_speciality_ID  = " + 
	config_database.PREFIX + "orders_details_speciality_order_id " +    
	
	" LEFT JOIN " + 
	config_database.PREFIX + "products_speciality  ON  " + 
	config_database.PREFIX + "orders_details_speciality_product_id  = " + 
	config_database.PREFIX + "products_speciality_ID " + 	

	" LEFT JOIN " + 
	config_database.PREFIX + "stores  ON  " + 
	config_database.PREFIX + "orders_speciality_store_id  = " + 
	config_database.PREFIX + "stores_ID " + 	

	" LEFT JOIN " + 
	config_database.PREFIX + "service_type  ON  " + 
	config_database.PREFIX + "stores_service_type_id  = " + 
	config_database.PREFIX + "service_type_ID " +	

	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "stores_user_id  = " + 
	config_database.PREFIX + "users_ID " +	

	" LEFT JOIN " + 
	config_database.PREFIX + "users_type  ON  " + 
	config_database.PREFIX + "users_users_type_id  = " + 
	config_database.PREFIX + "users_type_ID ";


const link_order_by_customer = 	" " +
	" LEFT JOIN " + 
	config_database.PREFIX + "orders_details_speciality ON  " + 
	config_database.PREFIX + "orders_speciality_ID  = " + 
	config_database.PREFIX + "orders_details_speciality_order_id " +    
	
	" LEFT JOIN " + 
	config_database.PREFIX + "products_speciality  ON  " + 
	config_database.PREFIX + "orders_details_speciality_product_id  = " + 
	config_database.PREFIX + "products_speciality_ID " + 	

	" LEFT JOIN " + 
	config_database.PREFIX + "stores  ON  " + 
	config_database.PREFIX + "orders_speciality_store_id  = " + 
	config_database.PREFIX + "stores_ID " + 	

	" LEFT JOIN " + 
	config_database.PREFIX + "service_type  ON  " + 
	config_database.PREFIX + "stores_service_type_id  = " + 
	config_database.PREFIX + "service_type_ID " +	

	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "orders_speciality_user_id  = " + 
	config_database.PREFIX + "users_ID " +	

	" LEFT JOIN " + 
	config_database.PREFIX + "users_type  ON  " + 
	config_database.PREFIX + "users_users_type_id  = " + 
	config_database.PREFIX + "users_type_ID ";




//export module
module.exports = { 
	fields_get,
	from_default,
	from_product_sale_by_store,
	link_default,
	link_shipper,
	link_order_by_store,
	link_order_by_customer				
};





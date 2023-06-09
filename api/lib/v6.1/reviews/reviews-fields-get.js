

const config_api = require('../configs/config');


//@
const fields_search = 	"" + 
	config_api.PREFIX  + "reviews_speciality_ID as reviews_speciality_ID, " + 
	"DATE_FORMAT(" + config_api.PREFIX  + "reviews_speciality_date_created," + "'%Y/%m/%d %H:%i:%s'"  + ") as reviews_speciality_date_created, " + 	
	config_api.PREFIX  + "reviews_speciality_user_id as reviews_speciality_user_id, " + 
	config_api.PREFIX  + "reviews_speciality_product_id as reviews_speciality_product_id, " + 
	config_api.PREFIX  + "reviews_speciality_contents as reviews_speciality_contents, " + 
	config_api.PREFIX  + "reviews_speciality_images as reviews_speciality_images, " + 
	config_api.PREFIX  + "reviews_speciality_videos as reviews_speciality_videos, " + 	
	config_api.PREFIX  + "reviews_speciality_status_admin as reviews_speciality_status_admin, " +  
	config_api.PREFIX  + "reviews_speciality_number_star as reviews_speciality_number_star " ;





const fields_search_arr = [
	"reviews_speciality_user_id",
	"reviews_speciality_product_id",	
	"reviews_speciality_contents",
	"reviews_speciality_images",
	"reviews_speciality_videos",
	"reviews_speciality_status_admin",
	"reviews_speciality_number_star",
	"users_full_name",
	"reviews_speciality_date_created"
]













//@
const from_default = 	" from " + 
	config_api.PREFIX + "reviews_speciality "  ;	
	
	
	
	
//@	
const link_default = 	" " +
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "reviews_speciality_user_id  = " + 
	config_api.PREFIX + "users_ID " +    
	
	" LEFT JOIN " + 
	config_api.PREFIX + "products_speciality  ON  " + 
	config_api.PREFIX + "reviews_speciality_product_id  = " + 
	config_api.PREFIX + "products_speciality_ID " ;	


//@	
const link_default_store = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "products_speciality  ON  " + 
	config_api.PREFIX + "reviews_speciality_product_id  = " + 
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
	fields_search,
	from_default,
	link_default,
	link_default_store,
	fields_search_arr
};






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
const from_default = 	" from " + 
	config_database.PREFIX + "orders_speciality "  ;	
	
	
	
	
//@	
const link_default = 	" " +
	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "reviews_speciality_user_id  = " + 
	config_database.PREFIX + "users_ID " +    
	
	" LEFT JOIN " + 
	config_database.PREFIX + "products_speciality  ON  " + 
	config_database.PREFIX + "reviews_speciality_product_id  = " + 
	config_database.PREFIX + "products_speciality_ID " ;	


//export module
module.exports = { 
				fields_get,
				from_default,
				link_default
};





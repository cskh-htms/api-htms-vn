

const config_api = require('../configs/config');




//@
const fields_get = 	"" + 
	config_api.PREFIX  + "category_general_speciality_ID as category_general_speciality_ID, " + 
	"DATE_FORMAT(" + config_api.PREFIX  + "category_general_speciality_date_created,'%Y/%m/%d %H:%i:%s') as category_general_speciality_date_created, " + 
	config_api.PREFIX  + "category_general_speciality_name as category_general_speciality_name, " + 
	config_api.PREFIX  + "category_general_speciality_category_parent_id as category_general_speciality_category_parent_id, " + 
	config_api.PREFIX  + "category_general_speciality_infomation as category_general_speciality_infomation, " + 
	config_api.PREFIX  + "category_general_speciality_featured_image as category_general_speciality_featured_image, " + 
	config_api.PREFIX  + "category_general_speciality_sort_order as category_general_speciality_sort_order, " + 
	config_api.PREFIX  + "category_general_speciality_show as category_general_speciality_show, " + 
	
	
	config_api.PREFIX  + "category_general_speciality_stores_status as category_general_speciality_stores_status, " + 
	config_api.PREFIX  + "category_general_speciality_stores_id as category_general_speciality_stores_id, " + 
	config_api.PREFIX  + "category_general_speciality_update_status as category_general_speciality_update_status, " + 
	config_api.PREFIX  + "category_general_speciality_admin_status as category_general_speciality_admin_status, " + 
	config_api.PREFIX  + "category_general_speciality_qoute as category_general_speciality_qoute " ;

//@
const from_default = 	" from " + 
	config_api.PREFIX + "category_general_speciality "  ;	
	
const from_detail = 	" from " + 
	config_api.PREFIX + "category_general_speciality_link "  ;		
	
	
//@	
const link_default = 	" " +
	" LEFT JOIN " + 
		config_api.PREFIX +  "stores  ON  " + 
		config_api.PREFIX +  "category_general_speciality_stores_id = " + 
		config_api.PREFIX +  "stores_ID  " + 
		
	
	" LEFT JOIN " + 
		config_api.PREFIX + "service_type  ON  " + 
		config_api.PREFIX + "stores_service_type_id  = " + 
		config_api.PREFIX + "service_type_ID  " +    	
		
		
	" LEFT JOIN " + 
		config_api.PREFIX +  "users  ON  " + 
		config_api.PREFIX +  "stores_user_id = " + 
		config_api.PREFIX +  "users_ID " ; 

		
const link_category_link = 	" " +

	" LEFT JOIN " + 
		config_api.PREFIX +  "category_general_speciality_link  ON  " + 
		config_api.PREFIX +  "category_general_speciality_ID = " + 
		config_api.PREFIX +  "category_general_speciality_link_category_general_id  " + 


	" LEFT JOIN " + 
	config_api.PREFIX + "products_speciality  ON  " + 
	config_api.PREFIX + "category_general_speciality_link_product_id  = " + 
	config_api.PREFIX + "products_speciality_ID " + 	


	" LEFT JOIN " + 
		config_api.PREFIX +  "stores  ON  " + 
		config_api.PREFIX +  "products_speciality_store_id = " + 
		config_api.PREFIX +  "stores_ID  " + 
		
	
	" LEFT JOIN " + 
		config_api.PREFIX + "service_type  ON  " + 
		config_api.PREFIX + "stores_service_type_id  = " + 
		config_api.PREFIX + "service_type_ID  " +    			
		
	" LEFT JOIN " + 
		config_api.PREFIX +  "users  ON  " + 
		config_api.PREFIX +  "stores_user_id = " + 
		config_api.PREFIX +  "users_ID  " ; 	
		
		
		
		
const link_category_by_product = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "category_general_speciality  ON  " + 
	config_api.PREFIX + "category_general_speciality_link_category_general_id  = " + 
	config_api.PREFIX + "category_general_speciality_ID " + 	

	" LEFT JOIN " + 
	config_api.PREFIX + "products_speciality  ON  " + 
	config_api.PREFIX + "category_general_speciality_link_product_id  = " + 
	config_api.PREFIX + "products_speciality_ID " + 	

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
				from_detail,
				link_default,
				link_category_link,
				link_category_by_product
};





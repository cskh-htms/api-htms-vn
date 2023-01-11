
const config_database = require('../../../configs/config-database');


//@
const fields_search = 	"" + 
	config_database.PREFIX  + "stores_ID as stores_ID, " + 
	config_database.PREFIX  + "stores_user_id as stores_user_id, " + 
	"DATE_FORMAT(" + config_database.PREFIX  + "stores_date_created,'%Y/%m/%d %H:%i:%s') as stores_date_created, " +	
	config_database.PREFIX  + "stores_name as stores_name, " + 
	
	config_database.PREFIX  + "stores_payment_limit as stores_payment_limit, " + 
	config_database.PREFIX  + "stores_service_type_id as stores_service_type_id, " + 
	config_database.PREFIX  + "stores_adress as stores_adress, " + 	
	
	config_database.PREFIX  + "stores_province as stores_province, " + 
	config_database.PREFIX  + "stores_district as stores_district, " + 
	config_database.PREFIX  + "stores_wards as stores_wards, " + 
	
	config_database.PREFIX  + "stores_phone as stores_phone, " + 
	config_database.PREFIX  + "stores_email as stores_email, " + 
	config_database.PREFIX  + "stores_logo_image as stores_logo_image, " + 
	config_database.PREFIX  + "stores_banner_image as stores_banner_image, " + 	
	config_database.PREFIX  + "stores_information as stores_information, " +
	
	config_database.PREFIX  + "stores_status_admin as stores_status_admin, " + 	
	config_database.PREFIX  + "stores_status_stores as stores_status_stores, " + 
	config_database.PREFIX  + "stores_info_banking as stores_info_banking, " + 
	config_database.PREFIX  + "stores_discount_price as stores_discount_price, " + 

	config_database.PREFIX  + "stores_local_x as stores_local_x, " + 
	config_database.PREFIX  + "stores_local_y as stores_local_y, " + 
	config_database.PREFIX  + "stores_local_adress as stores_local_adress, " + 
	
	config_database.PREFIX  + "stores_qoute as stores_qoute, "  + 
	config_database.PREFIX  + "stores_status_update as stores_status_update, " + 
	config_database.PREFIX  + "stores_payment_methods as stores_payment_methods, "  + 
	config_database.PREFIX  + "stores_payment_time as stores_payment_time, " + 	

	config_database.PREFIX  + "stores_upload_limit_day as stores_upload_limit_day, "  + 
	config_database.PREFIX  + "stores_upload_limit_month as stores_upload_limit_month, " + 


	config_database.PREFIX  + "service_type_name as service_type_name ";
	
	

const fields_search_arr = [
	"stores_ID",
	"stores_user_id",	
	"stores_name",	
	"stores_date_created",
	"stores_payment_limit",
	"stores_service_type_id",
	
	"stores_adress"	,		
	"stores_province",
	"stores_district",
	"stores_wards"	,
	
	"stores_phone"	,
	"stores_logo_image",
	"stores_banner_image",
	"stores_information",
	
	"stores_discount_price",
	"stores_sort_order",
	

	"stores_status_admin",
	"stores_status_stores",
	"stores_info_banking",

	"stores_local_x",	
	"stores_local_y",	
	"stores_local_adress",	

	"stores_qoute",		
	"stores_status_update",
	"stores_payment_methods",
	"stores_payment_time",

	"stores_upload_limit_day",
	"stores_upload_limit_month"
]

const fields_get_one = fields_search_arr;








//@
const from_default = 	" from " + 
	config_database.PREFIX + "stores ";	
	
//@	
const link_default = 	" " +
	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "stores_user_id  = " + 
	config_database.PREFIX + "users_ID " +    

	" LEFT JOIN " + 
	config_database.PREFIX + "users_type  ON  " + 
	config_database.PREFIX + "users_users_type_id  = " + 
	config_database.PREFIX + "users_ID " +  
	
	" LEFT JOIN " + 
	config_database.PREFIX + "service_type  ON  " + 
	config_database.PREFIX + "stores_service_type_id  = " + 
	config_database.PREFIX + "service_type_ID ";


//export module
module.exports = { 
				fields_search,
				from_default,
				link_default,
				fields_search_arr,
				fields_get_one
};






const config_database = require('../../../configs/config-database');


//@
const fields_search = 	"" + 
	config_database.PREFIX + "users_ID as users_ID, " + 
	"DATE_FORMAT(" + config_database.PREFIX  + "users_date_created,'%Y/%m/%d %H:%i:%s') as users_date_created, " + 	
	
	config_database.PREFIX + "users_full_name as users_full_name, " + 
	config_database.PREFIX + "users_password as users_password, " + 
	config_database.PREFIX + "users_password_lost as users_password_lost, " + 
	config_database.PREFIX + "users_first_name as users_first_name, " + 
	config_database.PREFIX + "users_last_name as users_last_name, " + 
	config_database.PREFIX + "users_adress as users_adress, " + 
	config_database.PREFIX + "users_phone as users_phone, " + 
	config_database.PREFIX + "users_email as users_email, " + 
	config_database.PREFIX + "users_users_type_id as users_users_type_id, " + 	
	config_database.PREFIX + "users_router_version as users_router_version, " + 
	config_database.PREFIX + "users_view_version as users_view_version, " + 
	config_database.PREFIX + "users_js_css_version as users_js_css_version, " + 
	config_database.PREFIX + "users_api_version as users_api_version, " + 	


	config_database.PREFIX + "users_shipping_status as users_shipping_status, " + 
	
	config_database.PREFIX + "users_status as users_status, " + 
	
	config_database.PREFIX + "users_verification_status as users_verification_status, " + 
	config_database.PREFIX + "users_verification_code as users_verification_code, " + 
	config_database.PREFIX + "users_verification_time as users_verification_time, " +

	config_database.PREFIX + "users_type_ID as users_type_ID, " + 
	config_database.PREFIX + "users_type_name as users_type_name, " + 
	config_database.PREFIX + "users_type_infomation as users_type_infomation ";

//@
const  from_default = 	" from " + 
	config_database.PREFIX + "users "; 
	
//@	
const link_default = 	" " +
	" LEFT JOIN " + 
		config_database.PREFIX +  "users_type  ON  " + 
		config_database.PREFIX +  "users_users_type_id = " + 
		config_database.PREFIX +  "users_type_ID  " ;	


//export module
module.exports = { 
				fields_search,
				from_default,
				link_default
};





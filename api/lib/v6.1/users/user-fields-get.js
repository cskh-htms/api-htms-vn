

const config_api = require('../configs/config');




//@
const fields_search = 	"" + 
	config_api.PREFIX + "users_ID as users_ID, " + 
	"DATE_FORMAT(" + config_api.PREFIX  + "users_date_created,'%Y/%m/%d %H:%i:%s') as users_date_created, " + 	
	
	config_api.PREFIX + "users_full_name as users_full_name, " + 
	config_api.PREFIX + "users_password as users_password, " + 
	config_api.PREFIX + "users_password_lost as users_password_lost, " + 
	config_api.PREFIX + "users_first_name as users_first_name, " + 
	config_api.PREFIX + "users_last_name as users_last_name, " + 
	config_api.PREFIX + "users_adress as users_adress, " + 
	config_api.PREFIX + "users_phone as users_phone, " + 
	config_api.PREFIX + "users_email as users_email, " + 
	config_api.PREFIX + "users_users_type_id as users_users_type_id, " + 	
	config_api.PREFIX + "users_router_version as users_router_version, " + 
	config_api.PREFIX + "users_view_version as users_view_version, " + 
	config_api.PREFIX + "users_js_css_version as users_js_css_version, " + 
	config_api.PREFIX + "users_api_version as users_api_version, " + 	


	config_api.PREFIX + "users_shipping_status as users_shipping_status, " + 
	
	config_api.PREFIX + "users_status as users_status, " + 
	
	config_api.PREFIX + "users_verification_status as users_verification_status, " + 
	config_api.PREFIX + "users_verification_code as users_verification_code, " + 
	config_api.PREFIX + "users_verification_time as users_verification_time, " +

	config_api.PREFIX + "users_type_ID as users_type_ID, " + 
	config_api.PREFIX + "users_type_name as users_type_name, " + 
	config_api.PREFIX + "users_service as users_service, " + 
	config_api.PREFIX + "users_type_infomation as users_type_infomation ";




//@
const fields_search_arr = [
	"users_ID",
	"users_full_name",
	"users_password",
	"users_date_created",
	"users_password_lost",		
	"users_first_name",	
	"users_last_name",	
	"users_adress",	
	"users_phone",
	"users_email",
			
	"users_router_version",
	"users_view_version",
	"users_js_css_version",
	"users_api_version",
	"users_users_type_id" ,		
	
	"users_shipping_status",
	"users_status",
	"users_service",
	"users_verification_status",
	"users_verification_code"
];









//@
const  from_default = 	" from " + 
	config_api.PREFIX + "users "; 
	
//@	
const link_default = 	" " +
	" LEFT JOIN " + 
		config_api.PREFIX +  "users_type  ON  " + 
		config_api.PREFIX +  "users_users_type_id = " + 
		config_api.PREFIX +  "users_type_ID  " ;	


//export module
module.exports = { 
				fields_search,
				from_default,
				link_default,
				fields_search_arr
};





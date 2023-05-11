

const config_api = require('../configs/config');


//@
const fields_search = 	"" + 

	config_api.PREFIX  + "orders_speciality_master_ID as orders_speciality_master_ID, " +
	config_api.PREFIX  + "orders_speciality_master_service as orders_speciality_master_service, " +
	config_api.PREFIX  + "orders_speciality_master_user_id as orders_speciality_master_user_id, " + 
	"DATE_FORMAT(" + config_api.PREFIX  + "orders_speciality_master_date_orders," + "'%Y/%m/%d %H:%i:%s'"  + ") as orders_speciality_master_date_orders, " + 	
		
	config_api.PREFIX  + "orders_speciality_master_province as orders_speciality_master_province, " + 		
	config_api.PREFIX  + "orders_speciality_master_district as orders_speciality_master_district, " + 
	config_api.PREFIX  + "orders_speciality_master_wards as orders_speciality_master_wards, " + 
	config_api.PREFIX  + "orders_speciality_master_name as orders_speciality_master_name, " + 			
		
		
		
		
	config_api.PREFIX  + "orders_speciality_master_adress as orders_speciality_master_adress, " + 
	config_api.PREFIX  + "orders_speciality_master_notes as orders_speciality_master_notes, " + 
	config_api.PREFIX  + "orders_speciality_master_phone as orders_speciality_master_phone, " + 	
	config_api.PREFIX  + "orders_speciality_master_email as orders_speciality_master_email" ;




const fields_search_arr = [
	"orders_speciality_master_ID",
	"orders_speciality_master_date_orders",
	"orders_speciality_master_user_id",
	"orders_speciality_master_service",
	"orders_speciality_master_province",
	"orders_speciality_master_district",
	"orders_speciality_master_wards",
	"orders_speciality_master_adress",
	"orders_speciality_master_notes",
	"orders_speciality_master_phone",
	"orders_speciality_master_name"	,
	"orders_speciality_master_email"
]








//@
const from_default = " from " + 
	config_api.PREFIX + "orders_speciality_master "  ;	
	
	
	
const link_default = 	" " +
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "orders_speciality_master_user_id  = " + 
	config_api.PREFIX + "users_ID ";  
	



//export module
module.exports = { 
	fields_search,
	fields_search_arr,
	from_default,
	link_default		
};






const config_database = require('../../../configs/config-database');


//@
const fields_search = 	"" + 

	config_database.PREFIX  + "orders_speciality_master_ID as orders_speciality_master_ID, " +
	config_database.PREFIX  + "orders_speciality_master_user_id as orders_speciality_master_user_id, " + 
	"DATE_FORMAT(" + config_database.PREFIX  + "orders_speciality_master_date_orders," + "'%Y/%m/%d %H:%i:%s'"  + ") as orders_speciality_master_date_orders, " + 	
		
	config_database.PREFIX  + "orders_speciality_master_province as orders_speciality_master_province, " + 		
	config_database.PREFIX  + "orders_speciality_master_district as orders_speciality_master_district, " + 
	config_database.PREFIX  + "orders_speciality_master_wards as orders_speciality_master_wards, " + 
	config_database.PREFIX  + "orders_speciality_master_name as orders_speciality_master_name, " + 			
		
		
		
		
	config_database.PREFIX  + "orders_speciality_master_adress as orders_speciality_master_adress, " + 
	config_database.PREFIX  + "orders_speciality_master_notes as orders_speciality_master_notes, " + 
	config_database.PREFIX  + "orders_speciality_master_phone as orders_speciality_master_phone, " + 	
	config_database.PREFIX  + "orders_speciality_master_email as orders_speciality_master_email" ;




const fields_search_arr = [
	"orders_speciality_master_ID",
	"orders_speciality_master_date_orders",
	"orders_speciality_master_user_id",
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
	config_database.PREFIX + "orders_speciality_master "  ;	
	
	
	
const link_default = 	" " +
	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "orders_speciality_master_user_id  = " + 
	config_database.PREFIX + "users_ID ";  
	



//export module
module.exports = { 
	fields_search,
	fields_search_arr,
	from_default,
	link_default		
};






const config_database = require('../../../configs/config-database');


//@
const fields_search = 	"" + 
	config_database.PREFIX  + "orders_speciality_ID as orders_speciality_ID, " + 
	config_database.PREFIX  + "orders_speciality_user_id  as orders_speciality_user_id , " +	
	config_database.PREFIX  + "orders_speciality_store_id  as orders_speciality_store_id , " +
	"DATE_FORMAT(" + config_database.PREFIX  + "orders_speciality_date_orders," + "'%Y/%m/%d %H:%i:%s'"  + ") as orders_speciality_date_orders, " + 		
	config_database.PREFIX  + "orders_speciality_status_orders as orders_speciality_status_orders, " + 
	config_database.PREFIX  + "orders_speciality_status_payment as orders_speciality_status_payment, " + 
	config_database.PREFIX  + "orders_speciality_company as orders_speciality_company, " + 


	
	
	config_database.PREFIX  + "orders_speciality_phone as orders_speciality_phone, " + 
	config_database.PREFIX  + "orders_speciality_adress as orders_speciality_adress, " + 
	config_database.PREFIX  + "orders_speciality_notes as orders_speciality_notes, " + 
	config_database.PREFIX  + "orders_speciality_email as orders_speciality_email, " +	
	
	
	config_database.PREFIX  + "orders_speciality_province as orders_speciality_province, " + 
	config_database.PREFIX  + "orders_speciality_district as orders_speciality_district, " + 
	config_database.PREFIX  + "orders_speciality_wards as orders_speciality_wards, " + 
	config_database.PREFIX  + "orders_speciality_name as orders_speciality_name, " +		
	
	
	config_database.PREFIX  + "orders_speciality_shipping_code as orders_speciality_shipping_code ";

//@
const  from_default = 	" from " + 
	config_database.PREFIX + "orders_speciality "; 
	
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





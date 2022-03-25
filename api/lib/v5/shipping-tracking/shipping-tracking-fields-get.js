
const config_database = require('../../../configs/config-database');


//@
const fields_get = 	"" + 
	config_database.PREFIX  + "shipping_tracking_ID as shipping_tracking_ID, " + 
	config_database.PREFIX  + "shipping_tracking_users_id as shipping_tracking_users_id, " + 
	"DATE_FORMAT(" + config_database.PREFIX  + "shipping_tracking_date_created,'%Y/%m/%d %H:%i:%s') as shipping_tracking_date_created, " +	
	
	config_database.PREFIX  + "shipping_tracking_orders_id as shipping_tracking_orders_id, " + 
	config_database.PREFIX  + "shipping_tracking_infomation as shipping_tracking_infomation, " + 
	config_database.PREFIX  + "shipping_tracking_orders_status as shipping_tracking_orders_status, " + 	
	
	config_database.PREFIX  + "shipping_tracking_qoute as shipping_tracking_qoute ";

//@
const from_default = " from " + 
	config_database.PREFIX + "shipping_tracking "  ;	
	
	
//@	
const link_default = 	" " +
	" LEFT JOIN " + 
	config_database.PREFIX + "orders_speciality  ON  " + 
	config_database.PREFIX + "shipping_tracking_orders_id  = " + 
	config_database.PREFIX + "orders_speciality_ID " + 
	
	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "shipping_tracking_users_id  = " + 
	config_database.PREFIX + "users_ID "; 	




//export module
module.exports = { 
	fields_get,
	from_default,
	link_default			
};





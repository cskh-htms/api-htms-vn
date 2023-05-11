
const config_database = require('../../../configs/config-database');


//@
const fields_search = 	"" + 
	config_database.PREFIX  + "payment_period_ID as payment_period_ID, " + 
	"DATE_FORMAT(" + config_database.PREFIX  + "payment_period_date_created,'%Y/%m/%d %H:%i:%s') as payment_period_date_created, " +	
	
	config_database.PREFIX  + "payment_period_order_id as payment_period_order_id, " + 
	config_database.PREFIX  + "payment_period_contents as payment_period_contents, " + 
	config_database.PREFIX  + "payment_period_payment as payment_period_payment " ;
	
	

const fields_search_arr = [
	"payment_period_ID",
	"payment_period_date_created",
	"payment_period_order_id",	
	"payment_period_contents",	
	"payment_period_payment"
]

const fields_get_one = fields_search_arr;








//@
const from_default = 	" from " + 
	config_database.PREFIX + "payment_period ";	
	
//@	
const link_default = 	" ";


//export module
module.exports = { 
				fields_search,
				from_default,
				link_default,
				fields_search_arr,
				fields_get_one
};





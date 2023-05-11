
const config_database = require('../../../configs/config-database');


//@
const fields_search = 	"" + 
	config_database.PREFIX  + "payment_coupon_ID as payment_coupon_ID, " + 
	"DATE_FORMAT(" + config_database.PREFIX  + "payment_coupon_date_created,'%Y/%m/%d %H:%i:%s') as payment_coupon_date_created, " +	
	
	config_database.PREFIX  + "payment_coupon_order_id as payment_coupon_order_id, " + 
	config_database.PREFIX  + "payment_coupon_coupon_code as payment_coupon_coupon_code, " + 
	
	
	config_database.PREFIX  + "payment_coupon_contents as payment_coupon_contents, " + 
	config_database.PREFIX  + "payment_coupon_payment as payment_coupon_payment " ;
	
	

const fields_search_arr = [
	"payment_coupon_ID",
	"payment_coupon_date_created",
	"payment_coupon_coupon_code",
	"payment_coupon_order_id",	
	"payment_coupon_contents",	
	"payment_coupon_payment"
]

const fields_get_one = fields_search_arr;








//@
const from_default = 	" from " + 
	config_database.PREFIX + "payment_coupon ";	
	
//@	
const link_default = " ";


//export module
module.exports = { 
				fields_search,
				from_default,
				link_default,
				fields_search_arr,
				fields_get_one
};





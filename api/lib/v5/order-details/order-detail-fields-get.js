
const config_database = require('../../../configs/config-database');


//@
const fields_get = 	"" + 
	config_database.PREFIX  + "orders_details_speciality_order_id as orders_details_speciality_order_id, " + 
	config_database.PREFIX  + "orders_details_speciality_line_order as orders_details_speciality_line_order, " + 
	config_database.PREFIX  + "orders_details_speciality_product_id as orders_details_speciality_product_id, " + 
	config_database.PREFIX  + "orders_details_speciality_qty as orders_details_speciality_qty, " + 
	config_database.PREFIX  + "orders_details_speciality_price as orders_details_speciality_price, " + 
	config_database.PREFIX  + "orders_details_medium_text as orders_details_medium_text, " ;







const fields_search_arr = [
		"orders_details_speciality_order_id",
		"orders_details_speciality_line_order",	
		"orders_details_speciality_product_id",	
		"orders_details_speciality_qty",
		"orders_details_speciality_price",
		"orders_details_medium_text"
]










//@
const from_default = " from " + 
	config_database.PREFIX + "orders_details_speciality "  ;	
	
	

//@	
const link_default = 	" " +
	" LEFT JOIN " + 
	config_database.PREFIX + "orders_speciality  ON  " + 
	config_database.PREFIX + "orders_details_speciality_order_id = " + 
	config_database.PREFIX + "orders_speciality_ID " + 
	
	" LEFT JOIN " + 
	config_database.PREFIX + "stores  ON  " + 
	config_database.PREFIX + "orders_speciality_store_id  = " + 
	config_database.PREFIX + "stores_ID " + 
	
	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "stores_user_id  = " + 
	config_database.PREFIX + "users_ID "; 	
	
	
	
//@
//@
//@ link by store
const link_by_store = " " +
	" LEFT JOIN " + 
	config_database.PREFIX + "orders_speciality  ON  " + 
	config_database.PREFIX + "orders_details_speciality_order_id = " + 
	config_database.PREFIX + "orders_speciality_ID " + 
	
	" LEFT JOIN " + 
	config_database.PREFIX + "stores  ON  " + 
	config_database.PREFIX + "orders_speciality_store_id  = " + 
	config_database.PREFIX + "stores_ID " + 	

	" LEFT JOIN " + 
	config_database.PREFIX + "service_type  ON  " + 
	config_database.PREFIX + "stores_service_type_id  = " + 
	config_database.PREFIX + "service_type_ID " +	

	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "stores_user_id  = " + 
	config_database.PREFIX + "users_ID " +	

	" LEFT JOIN " + 
	config_database.PREFIX + "users_type  ON  " + 
	config_database.PREFIX + "users_users_type_id  = " + 
	config_database.PREFIX + "users_type_ID ";	
	



//@
//@
//@ link by customer
const link_by_customer = " " +
	" LEFT JOIN " + 
	config_database.PREFIX + "orders_speciality  ON  " + 
	config_database.PREFIX + "orders_details_speciality_order_id = " + 
	config_database.PREFIX + "orders_speciality_ID " + 
	
	" LEFT JOIN " + 
	config_database.PREFIX + "stores  ON  " + 
	config_database.PREFIX + "orders_speciality_store_id  = " + 
	config_database.PREFIX + "stores_ID " + 	

	" LEFT JOIN " + 
	config_database.PREFIX + "service_type  ON  " + 
	config_database.PREFIX + "stores_service_type_id  = " + 
	config_database.PREFIX + "service_type_ID " +	

	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "orders_speciality_user_id  = " + 
	config_database.PREFIX + "users_ID " +	

	" LEFT JOIN " + 
	config_database.PREFIX + "users_type  ON  " + 
	config_database.PREFIX + "users_users_type_id  = " + 
	config_database.PREFIX + "users_type_ID ";



//@
//@
//@ link product by store
const link_product_by_store = " " +
	" LEFT JOIN " + 
	config_database.PREFIX + "orders_speciality  ON  " + 
	config_database.PREFIX + "orders_details_speciality_order_id = " + 
	config_database.PREFIX + "orders_speciality_ID " + 
	
	" LEFT JOIN " + 
	config_database.PREFIX + "products_speciality  ON  " + 
	config_database.PREFIX + "orders_details_speciality_product_id  = " + 
	config_database.PREFIX + "products_speciality_ID " + 	

	
	" LEFT JOIN " + 
	config_database.PREFIX + "stores  ON  " + 
	config_database.PREFIX + "orders_speciality_store_id  = " + 
	config_database.PREFIX + "stores_ID " + 	

	" LEFT JOIN " + 
	config_database.PREFIX + "service_type  ON  " + 
	config_database.PREFIX + "stores_service_type_id  = " + 
	config_database.PREFIX + "service_type_ID " +	

	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "stores_user_id  = " + 
	config_database.PREFIX + "users_ID " +	

	" LEFT JOIN " + 
	config_database.PREFIX + "users_type  ON  " + 
	config_database.PREFIX + "users_users_type_id  = " + 
	config_database.PREFIX + "users_type_ID ";



//@
//@
//@ link product by customer
const link_product_by_customer= " " +
	" LEFT JOIN " + 
	config_database.PREFIX + "orders_speciality  ON  " + 
	config_database.PREFIX + "orders_details_speciality_order_id = " + 
	config_database.PREFIX + "orders_speciality_ID " + 
	
	" LEFT JOIN " + 
	config_database.PREFIX + "products_speciality  ON  " + 
	config_database.PREFIX + "orders_details_speciality_product_id  = " + 
	config_database.PREFIX + "products_speciality_ID " + 		
	
	" LEFT JOIN " + 
	config_database.PREFIX + "stores  ON  " + 
	config_database.PREFIX + "orders_speciality_store_id  = " + 
	config_database.PREFIX + "stores_ID " + 	

	" LEFT JOIN " + 
	config_database.PREFIX + "service_type  ON  " + 
	config_database.PREFIX + "stores_service_type_id  = " + 
	config_database.PREFIX + "service_type_ID " +	

	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "orders_speciality_user_id  = " + 
	config_database.PREFIX + "users_ID " +	

	" LEFT JOIN " + 
	config_database.PREFIX + "users_type  ON  " + 
	config_database.PREFIX + "users_users_type_id  = " + 
	config_database.PREFIX + "users_type_ID ";





//@
//@
//@ link by customer
const link_by_coupon = " " +
	" LEFT JOIN " + 
	config_database.PREFIX + "orders_speciality  ON  " + 
	config_database.PREFIX + "orders_details_speciality_order_id = " + 
	config_database.PREFIX + "orders_speciality_ID " + 
	
	" LEFT JOIN " + 
	config_database.PREFIX + "coupon_speciality  ON  " + 
	config_database.PREFIX + "orders_details_medium_text  = " + 
	config_database.PREFIX + "coupon_speciality_code " + 

	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "coupon_speciality_intro  = " + 
	config_database.PREFIX + "users_ID ";


//export module
module.exports = { 
	fields_get,
	fields_search_arr,
	from_default,
	link_default,
	link_by_store,
	link_by_customer,
	link_product_by_store,
	link_product_by_customer,
	link_by_coupon	
};





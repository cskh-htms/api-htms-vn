
const config_api = require('../configs/config');



//@
const fields_get = 	"" + 
	config_api.PREFIX  + "orders_details_speciality_order_id as orders_details_speciality_order_id, " + 
	config_api.PREFIX  + "orders_details_speciality_line_order as orders_details_speciality_line_order, " + 
	config_api.PREFIX  + "orders_details_speciality_product_id as orders_details_speciality_product_id, " + 
	config_api.PREFIX  + "orders_details_speciality_qty as orders_details_speciality_qty, " + 
	config_api.PREFIX  + "orders_details_speciality_price as orders_details_speciality_price, " + 
	config_api.PREFIX  + "orders_details_medium_text as orders_details_medium_text, " ;







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
	config_api.PREFIX + "orders_details_speciality "  ;	
	
	

//@	
const link_default = 	" " +
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality  ON  " + 
	config_api.PREFIX + "orders_details_speciality_order_id = " + 
	config_api.PREFIX + "orders_speciality_ID " + 
	
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality_master  ON  " + 
	config_api.PREFIX + "orders_speciality_orders_speciality_master_id  = " + 
	config_api.PREFIX + "orders_speciality_master_ID " + 	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "orders_speciality_store_id  = " + 
	config_api.PREFIX + "stores_ID " + 
	
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "stores_user_id  = " + 
	config_api.PREFIX + "users_ID "; 	
	
	
	
//@
//@
//@ link by store
const link_by_store = " " +
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality  ON  " + 
	config_api.PREFIX + "orders_details_speciality_order_id = " + 
	config_api.PREFIX + "orders_speciality_ID " + 
	
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality_master  ON  " + 
	config_api.PREFIX + "orders_speciality_orders_speciality_master_id  = " + 
	config_api.PREFIX + "orders_speciality_master_ID " + 	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "orders_speciality_store_id  = " + 
	config_api.PREFIX + "stores_ID " + 	

	" LEFT JOIN " + 
	config_api.PREFIX + "service_type  ON  " + 
	config_api.PREFIX + "stores_service_type_id  = " + 
	config_api.PREFIX + "service_type_ID " +	

	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "stores_user_id  = " + 
	config_api.PREFIX + "users_ID " +	

	" LEFT JOIN " + 
	config_api.PREFIX + "users_type  ON  " + 
	config_api.PREFIX + "users_users_type_id  = " + 
	config_api.PREFIX + "users_type_ID ";	
	



//@
//@
//@ link by customer
const link_by_customer = " " +
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality  ON  " + 
	config_api.PREFIX + "orders_details_speciality_order_id = " + 
	config_api.PREFIX + "orders_speciality_ID " + 
	
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality_master  ON  " + 
	config_api.PREFIX + "orders_speciality_orders_speciality_master_id  = " + 
	config_api.PREFIX + "orders_speciality_master_ID " + 	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "orders_speciality_store_id  = " + 
	config_api.PREFIX + "stores_ID " + 	

	" LEFT JOIN " + 
	config_api.PREFIX + "service_type  ON  " + 
	config_api.PREFIX + "stores_service_type_id  = " + 
	config_api.PREFIX + "service_type_ID " +	

	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "orders_speciality_master_user_id  = " + 
	config_api.PREFIX + "users_ID " +	

	" LEFT JOIN " + 
	config_api.PREFIX + "users_type  ON  " + 
	config_api.PREFIX + "users_users_type_id  = " + 
	config_api.PREFIX + "users_type_ID ";



//@
//@
//@ link product by store
const link_product_by_store = " " +
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality  ON  " + 
	config_api.PREFIX + "orders_details_speciality_order_id = " + 
	config_api.PREFIX + "orders_speciality_ID " + 
	
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality_master  ON  " + 
	config_api.PREFIX + "orders_speciality_orders_speciality_master_id  = " + 
	config_api.PREFIX + "orders_speciality_master_ID " + 	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "products_speciality  ON  " + 
	config_api.PREFIX + "orders_details_speciality_product_id  = " + 
	config_api.PREFIX + "products_speciality_ID " + 	

	
	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "orders_speciality_store_id  = " + 
	config_api.PREFIX + "stores_ID " + 	

	" LEFT JOIN " + 
	config_api.PREFIX + "service_type  ON  " + 
	config_api.PREFIX + "stores_service_type_id  = " + 
	config_api.PREFIX + "service_type_ID " +	

	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "stores_user_id  = " + 
	config_api.PREFIX + "users_ID " +	

	" LEFT JOIN " + 
	config_api.PREFIX + "users_type  ON  " + 
	config_api.PREFIX + "users_users_type_id  = " + 
	config_api.PREFIX + "users_type_ID ";



//@
//@
//@ link product by customer
const link_product_by_customer= " " +
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality  ON  " + 
	config_api.PREFIX + "orders_details_speciality_order_id = " + 
	config_api.PREFIX + "orders_speciality_ID " + 
	
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality_master  ON  " + 
	config_api.PREFIX + "orders_speciality_orders_speciality_master_id  = " + 
	config_api.PREFIX + "orders_speciality_master_ID " + 	
	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "products_speciality  ON  " + 
	config_api.PREFIX + "orders_details_speciality_product_id  = " + 
	config_api.PREFIX + "products_speciality_ID " + 		
	
	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "orders_speciality_store_id  = " + 
	config_api.PREFIX + "stores_ID " + 	

	" LEFT JOIN " + 
	config_api.PREFIX + "service_type  ON  " + 
	config_api.PREFIX + "stores_service_type_id  = " + 
	config_api.PREFIX + "service_type_ID " +	

	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "orders_speciality_master_user_id  = " + 
	config_api.PREFIX + "users_ID " +	

	" LEFT JOIN " + 
	config_api.PREFIX + "users_type  ON  " + 
	config_api.PREFIX + "users_users_type_id  = " + 
	config_api.PREFIX + "users_type_ID ";





//@
//@
//@ link by customer
const link_by_coupon = " " +
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality  ON  " + 
	config_api.PREFIX + "orders_details_speciality_order_id = " + 
	config_api.PREFIX + "orders_speciality_ID " + 
	
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality_master  ON  " + 
	config_api.PREFIX + "orders_speciality_orders_speciality_master_id  = " + 
	config_api.PREFIX + "orders_speciality_master_ID " + 	
	
	" LEFT JOIN " + 
	config_api.PREFIX + "products_speciality  ON  " + 
	config_api.PREFIX + "orders_details_speciality_product_id  = " + 
	config_api.PREFIX + "products_speciality_ID " + 		
	
	" LEFT JOIN " + 
	config_api.PREFIX + "coupon_speciality  ON  " + 
	config_api.PREFIX + "orders_details_medium_text  = " + 
	config_api.PREFIX + "coupon_speciality_code " + 

	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "coupon_speciality_intro  = " + 
	config_api.PREFIX + "users_ID ";




	
	
	



//@
//@
//@ link product
const link_product = " " +
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality  ON  " + 
	config_api.PREFIX + "orders_details_speciality_order_id = " + 
	config_api.PREFIX + "orders_speciality_ID " + 
	
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality_master  ON  " + 
	config_api.PREFIX + "orders_speciality_orders_speciality_master_id  = " + 
	config_api.PREFIX + "orders_speciality_master_ID " + 
	
	" LEFT JOIN " + 
	config_api.PREFIX + "products_speciality  ON  " + 
	config_api.PREFIX + "orders_details_speciality_product_id  = " + 
	config_api.PREFIX + "products_speciality_ID ";	



//@
//@
//@ link review
const link_by_review = " " +

	
	" LEFT JOIN " + 
	config_api.PREFIX + "reviews_speciality  ON  " + 
	config_api.PREFIX + "orders_details_speciality_product_id  = " + 
	config_api.PREFIX + "reviews_speciality_product_id "  + 
	
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality  ON  " + 
	config_api.PREFIX + "orders_details_speciality_order_id = " + 
	config_api.PREFIX + "orders_speciality_ID " + 

	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality_master  ON  " + 
	config_api.PREFIX + "orders_speciality_orders_speciality_master_id  = " + 
	config_api.PREFIX + "orders_speciality_master_ID " + 

	" LEFT JOIN " +
	config_api.PREFIX + "products_speciality  ON  " + 
	config_api.PREFIX + "orders_details_speciality_product_id  = " + 
	config_api.PREFIX + "products_speciality_ID " +  
	
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "orders_speciality_master_user_id = " + 
	config_api.PREFIX + "users_ID ";		




//@
//@
//@ link review
const link_by_marketting = " " +

	
	" LEFT JOIN " + 
	config_api.PREFIX + "coupon_speciality  ON  " + 
	config_api.PREFIX + "orders_details_medium_text  = " + 
	config_api.PREFIX + "coupon_speciality_code "  + 
	
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality  ON  " + 
	config_api.PREFIX + "orders_details_speciality_order_id = " + 
	config_api.PREFIX + "orders_speciality_ID " + 


	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality_master  ON  " + 
	config_api.PREFIX + "orders_speciality_orders_speciality_master_id  = " + 
	config_api.PREFIX + "orders_speciality_master_ID " + 
	

	" LEFT JOIN " +
	config_api.PREFIX + "payment_coupon  ON  " + 
	config_api.PREFIX + "orders_speciality_ID  = " + 
	config_api.PREFIX + "payment_coupon_order_id " +  
	"and " + 
		config_api.PREFIX + "orders_details_medium_text  = " + 
		config_api.PREFIX + "payment_coupon_coupon_code " + 
		
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "coupon_speciality_intro = " + 
	config_api.PREFIX + "users_ID ";		




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
	link_by_coupon,
	link_by_review,
	link_by_marketting,
	link_product	
};





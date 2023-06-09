
const config_api = require('../configs/config');




//@
const fields_search = 	"" + 

	config_api.PREFIX  + "orders_speciality_ID as orders_speciality_ID, " +
	config_api.PREFIX  + "orders_speciality_user_id as orders_speciality_user_id, " + 
	config_api.PREFIX  + "orders_speciality_orders_speciality_master_id as orders_speciality_orders_speciality_master_id, " + 	
	"DATE_FORMAT(" + config_api.PREFIX  + "orders_speciality_date_orders," + "'%Y/%m/%d %H:%i:%s'"  + ") as orders_speciality_date_orders, " + 	
		
	config_api.PREFIX  + "orders_speciality_store_id as orders_speciality_store_id, " + 
	config_api.PREFIX  + "orders_speciality_status_orders as orders_speciality_status_orders, " + 
	config_api.PREFIX  + "orders_speciality_status_payment as orders_speciality_status_payment, " + 
		
	config_api.PREFIX  + "orders_speciality_adress as orders_speciality_adress, " + 
	config_api.PREFIX  + "orders_speciality_notes as orders_speciality_notes, " + 
	config_api.PREFIX  + "orders_speciality_phone as orders_speciality_phone, " + 	
	config_api.PREFIX  + "orders_speciality_service as orders_speciality_service, " + 		
	config_api.PREFIX  + "orders_speciality_email as orders_speciality_email, " + 
	config_api.PREFIX  + "orders_speciality_company as orders_speciality_company, " + 
	config_api.PREFIX  + "orders_speciality_province as orders_speciality_province, " + 		
	
	config_api.PREFIX  + "orders_speciality_district as orders_speciality_district, " + 
	config_api.PREFIX  + "orders_speciality_wards as orders_speciality_wards, " + 
	config_api.PREFIX  + "orders_speciality_name as orders_speciality_name, " + 		
		
		
		
	config_api.PREFIX  + "orders_speciality_master_adress as orders_speciality_master_adress, " + 
	config_api.PREFIX  + "orders_speciality_master_notes as orders_speciality_master_notes, " + 
	config_api.PREFIX  + "orders_speciality_master_phone as orders_speciality_master_phone, " + 	
	config_api.PREFIX  + "orders_speciality_master_service as orders_speciality_master_service, " + 		
	config_api.PREFIX  + "orders_speciality_master_email as orders_speciality_master_email, " + 
	config_api.PREFIX  + "orders_speciality_master_province as orders_speciality_master_province, " + 		
	
	config_api.PREFIX  + "orders_speciality_master_district as orders_speciality_master_district, " + 
	config_api.PREFIX  + "orders_speciality_master_wards as orders_speciality_master_wards, " + 
	config_api.PREFIX  + "orders_speciality_master_name as orders_speciality_master_name, " + 			
		
		
		
		
		
	config_api.PREFIX  + "orders_speciality_total_qty as orders_speciality_total_qty, " +		
	config_api.PREFIX  + "orders_speciality_total_product as orders_speciality_total_product, " +			
	config_api.PREFIX  + "orders_speciality_total_coupon_dala as orders_speciality_total_coupon_dala, " +	
	config_api.PREFIX  + "orders_speciality_total_coupon_store as orders_speciality_total_coupon_store, " +	
	config_api.PREFIX  + "orders_speciality_total_shipping as orders_speciality_total_shipping, " +			
	config_api.PREFIX  + "orders_speciality_total_fee as orders_speciality_total_fee, " +		
		
		
	config_api.PREFIX  + "orders_speciality_shipping_code as orders_speciality_shipping_code, " + 	
	config_api.PREFIX  + "stores_name as stores_name, " +  
	config_api.PREFIX  + "stores_ID as stores_ID " ;






const fields_search_arr = [
	"orders_speciality_ID",
	"orders_speciality_date_orders",
	"orders_speciality_user_id",
	"orders_speciality_orders_speciality_master_id",
	
	"orders_speciality_store_id",
	"orders_speciality_status_orders",	
	"orders_speciality_status_payment",	
	
	"orders_speciality_adress",
	"orders_speciality_notes",
	"orders_speciality_phone",
	
	"orders_speciality_email",
	"orders_speciality_company",		
	"orders_speciality_province",
	
	"orders_speciality_total_qty",
	"orders_speciality_total_product",
	"orders_speciality_total_coupon_dala",
	"orders_speciality_total_coupon_store",	
	"orders_speciality_total_shipping",
	"orders_speciality_total_fee",	
	
	"orders_speciality_district",
	"orders_speciality_wards",
	"orders_speciality_name",
	"orders_speciality_service",
	
	"orders_speciality_shipping_code",
	"stores_name",
	"stores_ID",
	
	"orders_speciality_master_province",		
	"orders_speciality_master_district",
	"orders_speciality_master_wards",
	"orders_speciality_master_name",
	"orders_speciality_master_service",	
	
	"orders_speciality_master_adress",
	"orders_speciality_master_notes",
	"orders_speciality_master_phone",
	
	"orders_speciality_master_email"

	
	
	
]














//@
const from_default = " from " + 
	config_api.PREFIX + "orders_speciality "  ;	
	
	
//@
const from_product_sale_by_store = " from " + 
	config_api.PREFIX + "view_count_product_sale ";
	
	
//@	
const link_default = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality_master  ON  " + 
	config_api.PREFIX + "orders_speciality_orders_speciality_master_id  = " + 
	config_api.PREFIX + "orders_speciality_master_ID " + 


	" LEFT JOIN " + 
	config_api.PREFIX + "payment_period  ON  " + 
	config_api.PREFIX + "orders_speciality_ID  = " + 
	config_api.PREFIX + "payment_period_order_id " + 
	
	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "orders_speciality_store_id  = " + 
	config_api.PREFIX + "stores_ID " + 
	
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "stores_user_id  = " + 
	config_api.PREFIX + "users_ID "; 	
	
	
	
	
	

const link_shipper = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality_master  ON  " + 
	config_api.PREFIX + "orders_speciality_orders_speciality_master_id  = " + 
	config_api.PREFIX + "orders_speciality_master_ID " + 
	
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "orders_speciality_shipper_id  = " + 
	config_api.PREFIX + "users_ID " +    
	
	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "orders_speciality_store_id  = " + 
	config_api.PREFIX + "stores_ID ";



const link_order_by_store = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality_master  ON  " + 
	config_api.PREFIX + "orders_speciality_orders_speciality_master_id  = " + 
	config_api.PREFIX + "orders_speciality_master_ID " + 
	
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_details_speciality ON  " + 
	config_api.PREFIX + "orders_speciality_ID  = " + 
	config_api.PREFIX + "orders_details_speciality_order_id " +    
	
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


const link_order_by_customer = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality_master  ON  " + 
	config_api.PREFIX + "orders_speciality_orders_speciality_master_id  = " + 
	config_api.PREFIX + "orders_speciality_master_ID " + 

	" LEFT JOIN " + 
	config_api.PREFIX + "orders_details_speciality ON  " + 
	config_api.PREFIX + "orders_speciality_ID  = " + 
	config_api.PREFIX + "orders_details_speciality_order_id " +    
	
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




//export module
module.exports = { 
	fields_search,
	from_default,
	from_product_sale_by_store,
	link_default,
	link_shipper,
	link_order_by_store,
	link_order_by_customer,
	fields_search_arr	
};





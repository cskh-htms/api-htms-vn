


const config_api = require('../configs/config');




//@
const fields_get = 	"" + 
	config_api.PREFIX  + "coupon_speciality_ID as coupon_speciality_ID, " + 
	"DATE_FORMAT(" + config_api.PREFIX  + "coupon_speciality_date_created,'%Y/%m/%d %H:%i:%s') as coupon_speciality_date_created, " +
	config_api.PREFIX  + "coupon_speciality_code as coupon_speciality_code, " + 
	config_api.PREFIX  + "coupon_speciality_stores_id_created as coupon_speciality_stores_id_created, " + 
	config_api.PREFIX  + "coupon_speciality_info as coupon_speciality_info, " + 
	
	config_api.PREFIX  + "coupon_speciality_type as coupon_speciality_type, " + 
	config_api.PREFIX  + "coupon_speciality_intro as coupon_speciality_intro, " + 	
	config_api.PREFIX  + "coupon_speciality_intro_price as coupon_speciality_intro_price, " + 	
	config_api.PREFIX  + "coupon_speciality_intro_price_limit as coupon_speciality_intro_price_limit, " + 	
	config_api.PREFIX  + "coupon_speciality_type as coupon_speciality_pay_type, " + 
	config_api.PREFIX  + "coupon_speciality_featured_image as coupon_speciality_featured_image, " + 
	
	config_api.PREFIX  + "coupon_speciality_formula_price as coupon_speciality_formula_price, " + 
	config_api.PREFIX  + "coupon_speciality_formula_price_value as coupon_speciality_formula_price_value, " + 	
	
	config_api.PREFIX  + "coupon_speciality_condition as coupon_speciality_condition, " + 
	config_api.PREFIX  + "coupon_speciality_condition_value as coupon_speciality_condition_value, " + 
	config_api.PREFIX  + "coupon_speciality_price_max as coupon_speciality_price_max, " + 
	
	
	
	"DATE_FORMAT(" + config_api.PREFIX  + "coupon_speciality_date_star,'%Y/%m/%d %H:%i:%s') as coupon_speciality_date_star, " +	
	"DATE_FORMAT(" + config_api.PREFIX  + "coupon_speciality_date_end,'%Y/%m/%d %H:%i:%s') as coupon_speciality_date_end, " +		
	
	config_api.PREFIX  + "coupon_speciality_multiple as coupon_speciality_multiple, " + 
	config_api.PREFIX  + "coupon_speciality_show_hide as coupon_speciality_show_hide, " + 
	
	config_api.PREFIX  + "coupon_speciality_status_admin as coupon_speciality_status_admin, " + 
	config_api.PREFIX  + "coupon_speciality_status_update as coupon_speciality_status_update, " + 
	config_api.PREFIX  + "coupon_speciality_limit_user as coupon_speciality_limit_user, " + 
	config_api.PREFIX  + "coupon_speciality_time_type as coupon_speciality_time_type, " + 
	config_api.PREFIX  + "coupon_speciality_marketing_return as coupon_speciality_marketing_return, " + 
	config_api.PREFIX  + "coupon_speciality_limit_number as coupon_speciality_limit_number, " + 
	
	
	config_api.PREFIX  + "coupon_speciality_qoute as coupon_speciality_qoute "  ;

//@
const from_default = 	" from " + 
	config_api.PREFIX + "coupon_speciality "  ;	
	
	
	
	
//@	
const link_default = 	" " +
	" LEFT JOIN " + 
	config_api.PREFIX + "stores  ON  " + 
	config_api.PREFIX + "coupon_speciality_stores_id_created  = " + 
	config_api.PREFIX + "stores_ID " +    
	
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "stores_user_id  = " + 
	config_api.PREFIX + "users_ID "; 


//@	
const link_sale_by_store = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "orders_details_speciality ON  " + 
	config_api.PREFIX + "coupon_speciality_ID  = " + 
	config_api.PREFIX + "orders_details_speciality_product_id " +    
	
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality  ON  " + 
	config_api.PREFIX + "orders_details_speciality_order_id  = " + 
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
const link_by_marketing = 	" " +

	" LEFT JOIN " + 
	config_api.PREFIX + "orders_details_speciality ON  " + 
	config_api.PREFIX + "coupon_speciality_code  = " + 
	config_api.PREFIX + "orders_details_medium_text " +    
	
	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality  ON  " + 
	config_api.PREFIX + "orders_details_speciality_order_id  = " + 
	config_api.PREFIX + "orders_speciality_ID " +    

	" LEFT JOIN " + 
	config_api.PREFIX + "orders_speciality_master  ON  " + 
	config_api.PREFIX + "orders_speciality_orders_speciality_master_id  = " + 
	config_api.PREFIX + "orders_speciality_master_ID " + 	

	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "coupon_speciality_intro  = " + 
	config_api.PREFIX + "users_ID "; 





//export module
module.exports = { 
	fields_get,
	from_default,
	link_default,
	link_sale_by_store,
	link_by_marketing 
};





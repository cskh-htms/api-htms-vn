
const jwt = require('jsonwebtoken');

const ojs_configs = require('../../../configs/config');
const config_database = require('../../configs/config-database.js');
const config_api = require('../../configs/config-api');

const ojs_shares_show_errors = require('./ojs-shares-show-errors');

const get_select_fields_special_product = require('../../shares/' + config_api.API_SHARES_VERSION + '/get-select-fields-special-product.js');
const get_select_fields_special_discount = require('../../shares/' + config_api.API_SHARES_VERSION + '/get-select-fields-special-discount.js');

const get_select_fields =  function(datas,res){
try {	
	var sql_field = "";

	//@
	if(!datas.select_field){
		return (" * ");
	}else{
		var field_arr = datas.select_field;
		for (var x in field_arr){
			var sql_field_check = "";

			var regex = /^[a-zA-Z]+\([a-zA-Z0-9_]+\)$/;
			var split_arr;
			var split_arr2;
			
			if(regex.test(field_arr[x])){
				split_arr = field_arr[x].split("(");
				split_arr2 = split_arr[1].split(")");
			}	
			
			//@ ngay thang
			if
			(	
				//@ product table
				field_arr[x] == "products_speciality_date_start" 
				|| field_arr[x] == "products_speciality_date_end" 
				|| field_arr[x] == "products_speciality_date_created" 

				//@ category
				|| field_arr[x] == "category_general_speciality_date_created"  	
				
				//@ options
				|| field_arr[x] == "options_product_speciality_date_created" 
				
				//@ brand
				|| field_arr[x] == "brands_date_created" 

				//@user
				|| field_arr[x] == "users_date_created" 
				
				//@store
				|| field_arr[x] == "stores_date_created" 	
				
				//@ reviews
				|| field_arr[x] == "reviews_speciality_date_created" 

				//@note
				|| field_arr[x] == "notes_date_created" 

				//@ order
				|| field_arr[x] == "orders_speciality_date_orders" 			

				//@ coupon
				|| field_arr[x] == "coupon_speciality_date_created" 
				
				//@discount
				|| field_arr[x] == "discount_program_date_created"  
				|| field_arr[x] == "discount_program_date_star"  
				|| field_arr[x] == "discount_program_date_end"  

				//@discount details
				|| field_arr[x] == "discount_program_details_date_created" 

				//@discount product
				|| field_arr[x] == "discount_program_product_link_date_created" 
				|| field_arr[x] == "discount_program_product_link_date_star" 
				|| field_arr[x] == "discount_program_product_link_date_end" 

				//@news
				|| field_arr[x] == "news_date_created" 
				
				//@shipping tracking
				|| field_arr[x] == "shipping_tracking_date_created" 
				
				//@users tracking
				|| field_arr[x] == "users_tracking_created" 				
			
				//@ category
				|| field_arr[x] == "payment_period_date_created" 			
								
			){
				sql_field_check  = "DATE_FORMAT(" + config_database.PREFIX  + field_arr[x] + "," + "'%Y/%m/%d %H:%i:%s'"  + ")";
				
				
			//@ nếu là biểu thức
			}else if(regex.test(field_arr[x]) ){
				sql_field_check  = " " + split_arr[0].trim() + "(" + config_database.PREFIX  + split_arr[1].trim();	
				
				
			//@ field đặt biệt product
			}else if(
				field_arr[x] == "products_speciality_price_caution" 
				|| field_arr[x] == "products_speciality_sale_of_price_time_check" 
			){
				sql_field_check  = get_select_fields_special_product(field_arr[x]);	
				
				
			//@ field đặt biệt discount
			}else if(
				field_arr[x] == "check_expired" 
				|| field_arr[x] == "check_date" 
			){
				sql_field_check  = get_select_fields_special_discount(field_arr[x]);					
				
			}else{
				sql_field_check  = config_database.PREFIX + field_arr[x];
			}			
			
			//@@ kết quả sql
			if(sql_field == ""){

				//@nếu là biểu thức
				if(regex.test(field_arr[x]) ){
					sql_field = sql_field_check  + " as " + split_arr[0] + "_" + split_arr2[0].trim();
				}else{
					sql_field =  sql_field_check  + " as " +  field_arr[x];
				}
			}else{
				//@nếu là biểu thức
				if(regex.test(field_arr[x]) ){
					sql_field =  sql_field  + ", " +  sql_field_check  + " as "  + split_arr[0] + "_" + split_arr2[0].trim();
				}else{
					sql_field =  sql_field  + ", " + sql_field_check  + " as " +  field_arr[x];
				}					
			}			
		}
	}
	sql_field = sql_field + " ";
	return sql_field;
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi get select field , liên hệ admin" );
	return { "error" : "1", "position":"get select field","message": error_send };
}	
}
module.exports = get_select_fields;
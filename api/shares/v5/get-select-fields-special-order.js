
const config_api = require('../../configs/config-api');
const config_database = require('../../configs/config-database.js');

const ojs_configs = require('../../../configs/config');
const ojs_shares_show_errors = require('./ojs-shares-show-errors');


const select_field_special = function(field,res){
	let sql_field_check  = " " ;
	try {
		if(field == "price_caution"){	
			sql_field_check = sql_field_check + 		
			config_database.PREFIX  + "orders_details_speciality_qty * " + 
			config_database.PREFIX  + "orders_details_speciality_price ";		
			return sql_field_check;
			
		}else if(field == "sum_price_caution"){	
			sql_field_check = sql_field_check + 	
			"sum(" + 
			config_database.PREFIX  + "orders_details_speciality_qty * " + 
			config_database.PREFIX  + "orders_details_speciality_price ) ";		
			return sql_field_check;		

		}else if(field == "orders_speciality_total_caution"){	
			sql_field_check = sql_field_check + 	
			"(" + 
			config_database.PREFIX  + "orders_speciality_total_product + " + 
			config_database.PREFIX  + "orders_speciality_total_shipping + " + 
			config_database.PREFIX  + "orders_speciality_total_fee) - " + 
			config_database.PREFIX  + "orders_speciality_total_coupon " ;			
			
			return sql_field_check;	

		}else if(field == "orders_speciality_total_marketing"){		
			sql_field_check = sql_field_check + 
			"(CASE " + 
				"WHEN " +  
					config_database.PREFIX  + "coupon_speciality_intro_price_limit > 0 " + 
					"AND (" + config_database.PREFIX  + "orders_speciality_total_product * " + 
						config_database.PREFIX  + "coupon_speciality_intro_price / 100 >  " +
						config_database.PREFIX  + "coupon_speciality_intro_price_limit ) " + 
				"THEN " + 
					config_database.PREFIX  + "coupon_speciality_intro_price_limit "  + 					
				"ELSE " +  
					config_database.PREFIX  + "orders_speciality_total_product * " + 
					config_database.PREFIX  + "coupon_speciality_intro_price / 100 "  + 
			"END ) ";
				
			return sql_field_check;			

		}else if(field == "sum_orders_speciality_total_marketing"){	
			sql_field_check = sql_field_check + 
			"(CASE " + 
				"WHEN " +  
					config_database.PREFIX  + "coupon_speciality_intro_price_limit > 0 " + 
					"AND (" + config_database.PREFIX  + "orders_speciality_total_product * " + 
						config_database.PREFIX  + "coupon_speciality_intro_price / 100 >  " +
						config_database.PREFIX  + "coupon_speciality_intro_price_limit ) " + 
				"THEN " + 
					" sum( " + config_database.PREFIX  + "coupon_speciality_intro_price_limit ) "  + 					
				"ELSE " +  
					" sum( " + config_database.PREFIX  + "orders_speciality_total_product * " + 
					config_database.PREFIX  + "coupon_speciality_intro_price / 100 )"  + 
			"END ) ";
				
			return sql_field_check;					

		}else{
			return " ";
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//res.send ({ 
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi get select field special product, liên hệ admin" );
		return res.send ({ "error" : "1", "position":"api/shares/get select field special order","message": error_send });
	}	
}
module.exports = select_field_special;


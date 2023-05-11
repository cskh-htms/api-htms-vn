






/*
	* products_speciality_price_caution
	* products_speciality_sale_of_price_time_check
	* products_speciality_sort_by_percen
	* out_of_stock
*/

const config_api = require('./configs/config');




const ojs_shares_show_errors = require('./ojs-shares-show-errors');

//@
//@
const select_field_special = function(field,res){
	let sql_field_check  = " " ;
	try {
		if(field == "products_speciality_price_caution"){	
			sql_field_check = sql_field_check + 		
			"(CASE " + 
				"WHEN " +  
					config_api.PREFIX  + "products_speciality_sale_of_price IS NULL " + 
				"THEN " + 
					config_api.PREFIX  + "products_speciality_price " + 
					
					
				// date_star = null 	
				// date_end = null 
				"WHEN " +  
					config_api.PREFIX  + "products_speciality_date_start IS NULL and " + 
					config_api.PREFIX  + "products_speciality_date_end IS NULL " + 
				"THEN " + 
					config_api.PREFIX  + "products_speciality_sale_of_price " + 			
					
					
				// date_star = yes 	
				// date_end = null 
				// date_now - date_star > 0 (da toi han khuyen mai)
				"WHEN " +  
					config_api.PREFIX  + "products_speciality_date_start IS NOT NULL and " + 
					config_api.PREFIX  + "products_speciality_date_end IS NULL and " + 
					"UNIX_TIMESTAMP(NOW()) - " + 
					"UNIX_TIMESTAMP(" + config_api.PREFIX  + "products_speciality_date_start ) > 0 " + 
				"THEN " + 
					config_api.PREFIX  + "products_speciality_sale_of_price " + 		

					
				// date_star = null 	
				// date_end = yes 
				// date_now - date_end  < 0 (da toi han khuyen mai chưa het han khuyen mai)
				"WHEN " +  
					config_api.PREFIX  + "products_speciality_date_start IS NULL and " + 
					config_api.PREFIX  + "products_speciality_date_end IS NOT NULL and " + 
					"UNIX_TIMESTAMP(NOW()) - " + 
					"UNIX_TIMESTAMP(" + config_api.PREFIX  + "products_speciality_date_end ) < 0 " + 
				"THEN " + 
					config_api.PREFIX  + "products_speciality_sale_of_price " + 																	
					
					
				// date_star = yes 	
				// date_end = yes 
				// date_now - date_star > 0 (da toi han khuyen mai)
				// date_now - date_star > 0 (da toi han khuyen mai)
				"WHEN " +  
					config_api.PREFIX  + "products_speciality_date_start IS NOT NULL and " + 
					config_api.PREFIX  + "products_speciality_date_end IS NOT NULL and " + 
					"UNIX_TIMESTAMP(NOW()) - " + 
					"UNIX_TIMESTAMP(" + config_api.PREFIX  + "products_speciality_date_start ) > 0  and " + 
					"UNIX_TIMESTAMP(NOW()) - " + 
					"UNIX_TIMESTAMP(" + config_api.PREFIX  + "products_speciality_date_end ) < 0  " + 								
				"THEN " + 
					config_api.PREFIX  + "products_speciality_sale_of_price " + 			

				"ELSE " +  
					config_api.PREFIX  + "products_speciality_price " + 
			"END ) ";
			
			return sql_field_check;
			
		}else if(field == "products_speciality_sale_of_price_time_check"){
			sql_field_check  = " " + 			
				"(CASE " + 
					"WHEN " +  
						config_api.PREFIX  + "products_speciality_sale_of_price IS NULL " + 
					"THEN " + 
						" '0' " + 
						
						
					// date_star = null 	
					// date_end = null 
					"WHEN " +  
						config_api.PREFIX  + "products_speciality_date_start IS NULL and " + 
						config_api.PREFIX  + "products_speciality_date_end IS NULL " + 
					"THEN " + 
						" '1' " +  			
						
						
					// date_star = yes 	
					// date_end = null 
					// date_now - date_star > 0 (da toi han khuyen mai)
					"WHEN " +  
						config_api.PREFIX  + "products_speciality_date_start IS NOT NULL and " + 
						config_api.PREFIX  + "products_speciality_date_end IS NULL and " + 
						"UNIX_TIMESTAMP(NOW()) - " + 
						"UNIX_TIMESTAMP(" + config_api.PREFIX  + "products_speciality_date_start ) > 0 " + 
					"THEN " + 
						" '1' " +  		

					// date_star = yes 	
					// date_end = null 
					// date_now - date_star > 0 (chua toi han khuyen mai)
					"WHEN " +  
						config_api.PREFIX  + "products_speciality_date_start IS NOT NULL and " + 
						config_api.PREFIX  + "products_speciality_date_end IS NULL and " + 
						"UNIX_TIMESTAMP(NOW()) - " + 
						"UNIX_TIMESTAMP(" + config_api.PREFIX  + "products_speciality_date_start ) < 0 " + 
					"THEN " + 
						" '2' " +  

						
					// date_star = null 	
					// date_end = yes 
					// date_now - date_end  < 0 (het han khuyen mai)
					"WHEN " +  
						config_api.PREFIX  + "products_speciality_date_start IS NULL and " + 
						config_api.PREFIX  + "products_speciality_date_end IS NOT NULL and " + 
						"UNIX_TIMESTAMP(NOW()) - " + 
						"UNIX_TIMESTAMP(" + config_api.PREFIX  + "products_speciality_date_end ) > 0 " + 
					"THEN " + 
						" '3' " + 																	
						
						
					// date_star = yes 	
					// date_end = yes 
					// date_now - date_star > 0 (da toi han khuyen mai)
					// date_now - date_star > 0 (da toi han khuyen mai)
					"WHEN " +  
						config_api.PREFIX  + "products_speciality_date_start IS NOT NULL and " + 
						config_api.PREFIX  + "products_speciality_date_end IS NOT NULL and " + 
						"UNIX_TIMESTAMP(NOW()) - " + 
						"UNIX_TIMESTAMP(" + config_api.PREFIX  + "products_speciality_date_start ) > 0  and " + 
						"UNIX_TIMESTAMP(NOW()) - " + 
						"UNIX_TIMESTAMP(" + config_api.PREFIX  + "products_speciality_date_end ) > 0  " + 								
					"THEN " + 
						" '3' " + 		

					// date_star = yes 	
					// date_end = yes 
					// date_now - date_star < 0 (da toi han khuyen mai)
					// date_now - date_star > 0 (da toi han khuyen mai)
					"WHEN " +  
						config_api.PREFIX  + "products_speciality_date_start IS NOT NULL and " + 
						config_api.PREFIX  + "products_speciality_date_end IS NOT NULL and " + 
						"UNIX_TIMESTAMP(NOW()) - " + 
						"UNIX_TIMESTAMP(" + config_api.PREFIX  + "products_speciality_date_start ) < 0  " + 								
					"THEN " + 
						" '2' " + 	
					"ELSE " +  
						" '4' " + 
				"END )  ";	
			return sql_field_check;
			
		}else if(field == "products_speciality_sort_by_percen"){
			sql_field_check  = " " + 	
			"ROUND((CASE " + 
				"WHEN " +  
					config_api.PREFIX  + "products_speciality_sale_of_price IS NULL " + 
				"THEN " + 
					" 0 " +  
				"ELSE " +  
					"(" + config_api.PREFIX  + "products_speciality_price - " + 
					config_api.PREFIX  + "products_speciality_sale_of_price) / " + 
					config_api.PREFIX  + "products_speciality_price * 100 " + 
			"END ),0) ";
				
			return sql_field_check;
			
		}else if(field == "out_of_stock"){
			sql_field_check  = " " + 	
			"(CASE " + 
				"WHEN " +  
					config_api.PREFIX  + "products_speciality_stock_status = 1 " + 
					"AND " + config_api.PREFIX  + "products_speciality_stock <= 0 " + 
				"THEN " + 
					" 1 " + 					
				"ELSE " +  
					" 0 " + 
			"END ) ";
				
			return sql_field_check;	
			
		}else if(field == "sum_best_sale"){	
			sql_field_check = sql_field_check + 	
			
			" CASE " + 
				"WHEN (" + config_api.PREFIX  +"orders_speciality_status_orders is not null) " +  
				"THEN sum(" + config_api.PREFIX  +"orders_details_speciality_qty) + " + 
				config_api.PREFIX  + "products_speciality_start_buy " +  
				"ELSE " + config_api.PREFIX  + "products_speciality_start_buy " + 
			" END ";
			return sql_field_check;					
			
		}else{
			return " ";
		}
	}
	catch(error){
		var evn = config_api.evn;
		//res.send ({ 
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi get select field special product, liên hệ admin" );
		return res.send ({ "error" : "1", "position":"api/shares/get select field special product","message": error_send });
	}	
}
module.exports = select_field_special;


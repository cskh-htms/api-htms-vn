
const config_api = require('./configs/config');




const ojs_shares_show_errors = require('./ojs-shares-show-errors');

const select_field_special = function(field,res){
	let sql_field_check  = " " ;
	try {
		if(field == "check_expired_coupon"){	
			sql_field_check = sql_field_check + 		
			"(CASE " + 		
			
				"WHEN ( " + config_api.PREFIX  + "coupon_speciality_time_type  = 0 ) THEN " +  
					" 1 " +  			
					
				"WHEN ( UNIX_TIMESTAMP(" + config_api.PREFIX + "coupon_speciality_date_end) - UNIX_TIMESTAMP() > 0 ) THEN " + 
					" 1 " +  
					
				"ELSE " +    
					" 0 " + 
			"END) " ;
			
			return sql_field_check;
		}else{
			return " ";
		}
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi get select field special discount, liên hệ admin" );
		res.send ({ "error" : "1", "position":"api/shares/get select field special discount","message": error_send });
	}	
}
module.exports = select_field_special;


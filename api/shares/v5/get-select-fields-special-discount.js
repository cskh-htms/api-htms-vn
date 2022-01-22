
const config_api = require('../../configs/config-api');
const config_database = require('../../configs/config-database.js');

const ojs_configs = require('../../../configs/config');
const ojs_shares_show_errors = require('./ojs-shares-show-errors');

const select_field_special = function(field,res){
	let sql_field_check  = " " ;
	try {
		if(field == "check_expired"){	
			sql_field_check = sql_field_check + 		
			"(CASE " + 
				"WHEN ( " + config_database.PREFIX  + "discount_program_time_type  = 0 ) THEN " +  
					" 1 " +  
					
				"WHEN ( UNIX_TIMESTAMP(" + config_database.PREFIX + "discount_program_date_end) < UNIX_TIMESTAMP() ) THEN " + 
					" 1 " +  
					
				"ELSE " +    
					" 0 " + 
			"END) " ;
			
			return sql_field_check;
			
		}else if(field == "check_date"){
			sql_field_check = sql_field_check + 
			"IF(" + config_database.PREFIX + "discount_program_details_limit_day = 0,-1, " + 
				"UNIX_TIMESTAMP() - (UNIX_TIMESTAMP(" + 
				config_database.PREFIX + "discount_program_details_date_created) + ( " + 
				config_database.PREFIX + "discount_program_details_limit_day * 24 * 60 * 60) )" + 
			") ";			
			return sql_field_check;
		}else{
			return " ";
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi get select field special discount, liên hệ admin" );
		res.send ({ "error" : "1", "position":"api/shares/get select field special discount","message": error_send });
	}	
}
module.exports = select_field_special;


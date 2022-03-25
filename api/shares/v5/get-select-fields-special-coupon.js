
const config_api = require('../../configs/config-api');
const config_database = require('../../configs/config-database.js');

const ojs_configs = require('../../../configs/config');
const ojs_shares_show_errors = require('./ojs-shares-show-errors');

const select_field_special = function(field,res){
	let sql_field_check  = " " ;
	try {
		if(field == "check_expired_coupon"){	
			sql_field_check = sql_field_check + 		
			"(CASE " + 
					
				"WHEN ( UNIX_TIMESTAMP(" + config_database.PREFIX + "coupon_speciality_date_end) - UNIX_TIMESTAMP() > 0 ) THEN " + 
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
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi get select field special discount, liên hệ admin" );
		res.send ({ "error" : "1", "position":"api/shares/get select field special discount","message": error_send });
	}	
}
module.exports = select_field_special;


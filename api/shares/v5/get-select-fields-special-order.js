
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
		}else{
			return " ";
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi get select field special product, liên hệ admin" );
		res.send ({ "error" : "1", "position":"api/shares/get select field special order","message": error_send });
	}	
}
module.exports = select_field_special;


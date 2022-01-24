

const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const config_database = require('../../configs/config-database.js');

const ojs_shares_show_errors = require('./ojs-shares-show-errors');
const ojs_shares_date = require('./ojs-shares-date.js');





const get_having =  function(datas,res){	
	try {
		var sql_condition = "";
		var sql_conditions = " having ";
		//@
		if(!datas.having || datas.having.legnth < 1){
			return  " ";
		}else{
			var condition_arr = datas.having;
			for (var x in condition_arr){
				for (var s in condition_arr[x].where){
					let consition_value = "";
					let consition_field = "";//condition_arr[x].where[s].field
					
					//
					//
					//@@ edit date order
					if(ojs_shares_date.check_date_full(condition_arr[x].where[s].value) == true || ojs_shares_date.check_date(condition_arr[x].where[s].value) == true ){
						consition_value = " UNIX_TIMESTAMP('" + condition_arr[x].where[s].value + "') ";
						consition_field = " UNIX_TIMESTAMP(" + config_database.PREFIX + condition_arr[x].where[s].field + ") ";
					}else if(condition_arr[x].where[s].compare == "in"){
						consition_value = "(" + condition_arr[x].where[s].value + ")";
						consition_field = config_database.PREFIX + condition_arr[x].where[s].field;
					}else if(condition_arr[x].where[s].compare == "is not null"){
						consition_value = condition_arr[x].where[s].value;
						consition_field = config_database.PREFIX + condition_arr[x].where[s].field;
					}else{
						consition_value = " '" + condition_arr[x].where[s].value + "' ";
						consition_field = config_database.PREFIX + condition_arr[x].where[s].field;
					}				
					//@
					//@
					//@
					if(sql_condition == ""){
						//@
						//@
						//@
						sql_condition = sql_condition + 
							consition_field + " " + 
							condition_arr[x].where[s].compare +  " " + 
							" " + consition_value + " "					
					}else{
						//@
						//@
						//@
						sql_condition = sql_condition + condition_arr[x].relation + " ";
						sql_condition = sql_condition + 
							consition_field + " " + 
							condition_arr[x].where[s].compare +  " " + 
							" " + consition_value + " "
					}
				}
				sql_conditions = sql_conditions + sql_condition;
				sql_conditions = sql_conditions + " ";					
			}		
		}

		return sql_conditions;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi get order , liên hệ admin" );
		return { "error" : "1", "position":"get having","message": error_send };
	}	
}
module.exports = get_having;
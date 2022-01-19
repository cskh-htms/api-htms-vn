

const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const config_database = require('../../configs/config-database.js');

const ojs_shares_show_errors = require('./ojs-shares-show-errors');
const ojs_shares_date = require('./ojs-shares-date.js');





const get_consition =  function(datas,res){
	
	try {
		var sql_condition = "";
		var sql_conditions = " where '2020' = '2020' and ";

		//@
		var relation_check = [
			"or",
			"and"
		];

		//@
		if(!datas.condition){
			sql_condition = "";
		}else{
			//return sql_conditions;
			var condition_arr = datas.condition;
			
			for (var x in condition_arr){
				for (var s in condition_arr[x].where){
					let consition_value = "";
					let consition_field = "";//condition_arr[x].where[s].field
					
					consition_value = " '" + condition_arr[x].where[s].value + "' ";
					consition_field = config_database.PREFIX + condition_arr[x].where[s].field;				
					
					//@@ edit date 
					if(
					ojs_shares_date.check_date(condition_arr[x].where[s].value) == 1  
					|| ojs_shares_date.check_date_full(condition_arr[x].where[s].value) == 1  
					){
						consition_value = " UNIX_TIMESTAMP('" + condition_arr[x].where[s].value + "') ";
						consition_field = " UNIX_TIMESTAMP(" + config_database.PREFIX + condition_arr[x].where[s].field + ") ";
					
					}					
					
					//@[in] and [not in] condition
					if(
						condition_arr[x].where[s].compare == "in" 
						|| condition_arr[x].where[s].compare == "IN" 
						|| condition_arr[x].where[s].compare == "not in" 
						|| condition_arr[x].where[s].compare == "NOT IN" 
					){
						consition_value = "(" + condition_arr[x].where[s].value + ")";
						consition_field = config_database.PREFIX + condition_arr[x].where[s].field;
					}

					//@[null] and [not null] condition
					if(
						condition_arr[x].where[s].compare == "null" 
						|| condition_arr[x].where[s].compare == "not null" 
						|| condition_arr[x].where[s].compare == "NULL" 
						|| condition_arr[x].where[s].compare == "NOT NULL" 
					){
						consition_value = " ";
						consition_field = config_database.PREFIX + condition_arr[x].where[s].field + " IS ";
					}					
					
					//@[like] condition
					if(
						condition_arr[x].where[s].compare == "like" 
						|| condition_arr[x].where[s].compare == "LIKE" 
						|| condition_arr[x].where[s].compare == "not like" 
						|| condition_arr[x].where[s].compare == "NOT LIKE" 
					){
						let arr_value =  condition_arr[x].where[s].value.split(' ');
						let txt_value = "";

						if(arr_value.length > 0){
							for (let x in arr_value){
								txt_value = txt_value + '%' + arr_value[x];
							}
							
							txt_value =  txt_value + '%';
							
							consition_value = "'" + txt_value + "'";
							consition_field = config_database.PREFIX + condition_arr[x].where[s].field ;		
						}else{
							consition_value = "'%" + condition_arr[x].where[s].value + "%'";
							consition_field = config_database.PREFIX + condition_arr[x].where[s].field ;
						}
					}		
		
					//@ relation
					var relation = condition_arr[x].relation;
					if(relation_check.indexOf(relation) < 0 ){
						relation = "and";
					}						

					if(s == 0 && x == 0){
						relation = " ";
					}			
					
					//@ return					
					sql_condition = sql_condition + relation + " ";
					sql_condition = sql_condition + 
						consition_field + " " + 
						condition_arr[x].where[s].compare +  " " + 
						" " + consition_value + " "
				}
			}
		}
		
		sql_conditions = sql_conditions + sql_condition;
		sql_conditions = sql_conditions + " ";
		return sql_conditions;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi decode , liên hệ admin" );
		return { "error" : "1", "position":"get condition","message": error_send };
	}	
}
module.exports = get_consition;
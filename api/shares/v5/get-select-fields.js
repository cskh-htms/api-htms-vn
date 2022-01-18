
const jwt = require('jsonwebtoken');

const ojs_configs = require('../../../configs/config');
const config_database = require('../../configs/config-database.js');
const config_api = require('../../configs/config-api');

const ojs_shares_show_errors = require('./ojs-shares-show-errors');




const get_select_fields =  function(datas){
	
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
				|| field_arr[x] == "stores_date_created" 
				|| field_arr[x] == "orders_speciality_date_orders" 
				
				//@ orders table
				|| field_arr[x] == "orders_speciality_date_orders" 	
				
				//@ orders table
				|| field_arr[x] == "reviews_speciality_date_created" 
				
				//@ review
				|| field_arr[x] == "stores_date_created	" 
			
								
			){
				sql_field_check  = "DATE_FORMAT(" + config_database.PREFIX  + field_arr[x] + "," + "'%Y/%m/%d %H:%i:%s'"  + ")";
			//@ nếu là biểu thức
			}else if(regex.test(field_arr[x]) ){
				sql_field_check  = " " + split_arr[0].trim() + "(" + config_database.PREFIX  + split_arr[1].trim();	
				
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
module.exports = get_select_fields;
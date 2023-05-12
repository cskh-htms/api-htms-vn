

const mysql = require('mysql2');


const config_api = require('./configs/config');

const ojs_shares_show_errors = require('./ojs-shares-show-errors');
const ojs_shares_date = require('./ojs-shares-date.js');


const get_select_fields_special_product = require('../../shares/' + config_api.API_SHARES_VERSION + '/get-select-fields-special-product.js');
const get_select_fields_special_discount = require('../../shares/' + config_api.API_SHARES_VERSION + '/get-select-fields-special-discount.js');
const get_select_fields_special_order = require('../../shares/' + config_api.API_SHARES_VERSION + '/get-select-fields-special-order.js');
const get_select_fields_special_coupon = require('../../shares/' + config_api.API_SHARES_VERSION + '/get-select-fields-special-coupon.js');



const get_consition =  function(datas,res){
	
	
	
	//@
	//@
	//@ @mysql.escape().replace(/^'|'$/gi, "")
	//@ escap datta search chong sql injection
	/*
	for (var x in datas.condition){
		for (var s in datas.condition[x].where){
			if(
				datas.condition[x].where[s].compare == 'in' 
				|| datas.condition[x].where[s].compare == 'IN' 
				|| datas.condition[x].where[s].compare == 'not in' 
				|| datas.condition[x].where[s].compare == 'NOT IN' 			
			){
				//datas.condition[x].where[s].value = 
					//mysql.escape(datas.condition[x].where[s].value);
			}else{
				datas.condition[x].where[s].value = 
					mysql.escape(datas.condition[x].where[s].value).replace(/^'|'$/gi, "");
			}
		}
	}
	
	for (var x in datas.condition){
		for (var s in datas.condition[x].where){
			datas.condition[x].where[s].value = 
				mysql.escape(datas.condition[x].where[s].value).replace(/^'|'$/gi, "");
		}
	}
	*/
	try {
		var sql_condition = "";
		var sql_conditions = " where '2020' = '2020' and ";

		//@
		var relation_check = [
			"or",
			"and"
		];

		//@
		if(!datas.condition || datas.condition.length < 1 ){
			sql_conditions = "";
		}else{
			//return sql_conditions;
			var condition_arr = datas.condition;
			
			for (var x in condition_arr){
				for (var s in condition_arr[x].where){
					let consition_value = "";
					let consition_field = "";//condition_arr[x].where[s].field
					
					consition_value = " '" + condition_arr[x].where[s].value + "' ";
					consition_field = config_api.PREFIX + condition_arr[x].where[s].field;			


					//@ field đặt biệt product
					if(
						condition_arr[x].where[s].field == "products_speciality_price_caution" 
						|| condition_arr[x].where[s].field == "products_speciality_sale_of_price_time_check" 
						|| condition_arr[x].where[s].field == "out_of_stock" 
					){
						consition_field  = get_select_fields_special_product(condition_arr[x].where[s].field,res);	
						
						
					//@ field đặt biệt discount
					}else if(
						condition_arr[x].where[s].field == "check_expired" 
						|| condition_arr[x].where[s].field == "check_date" 
					){
						consition_field  = get_select_fields_special_discount(condition_arr[x].where[s].field,res);	
						
					//@ field đặt biệt coupon
					}else if(
						condition_arr[x].where[s].field == "check_expired_coupon" 
					){
						consition_field  = get_select_fields_special_coupon(condition_arr[x].where[s].field,res);							
						
					//@ field đặt biệt order
					}else if(
						condition_arr[x].where[s].field == "price_caution" 
						|| condition_arr[x].where[s].field == "sum_price_caution"  
						|| condition_arr[x].where[s].field == "orders_speciality_total_caution"  
						|| condition_arr[x].where[s].field == "orders_speciality_total_marketing"  
						|| condition_arr[x].where[s].field == "sum_orders_speciality_total_marketing"  						
					){
						consition_field  = get_select_fields_special_order(condition_arr[x].where[s].field,res);							
					}
					
					//@@ edit date 
					if(
					ojs_shares_date.check_date(condition_arr[x].where[s].value) == 1  
					|| ojs_shares_date.check_date_full(condition_arr[x].where[s].value) == 1  
					){
						consition_value = " UNIX_TIMESTAMP('" + condition_arr[x].where[s].value + "') ";
						consition_field = " UNIX_TIMESTAMP(" + config_api.PREFIX + condition_arr[x].where[s].field + ") ";
					
					}					
					
					//@[in] and [not in] condition
					if(
						condition_arr[x].where[s].compare == "in" 
						|| condition_arr[x].where[s].compare == "IN" 
						|| condition_arr[x].where[s].compare == "not in" 
						|| condition_arr[x].where[s].compare == "NOT IN" 
					){
						consition_value = "(" + condition_arr[x].where[s].value.replace(/^'|'$/gi, "") + ")";
						consition_field = config_api.PREFIX + condition_arr[x].where[s].field;
					}

					//@[null] and [not null] condition
					if(
						condition_arr[x].where[s].compare == "null" 
						|| condition_arr[x].where[s].compare == "not null" 
						|| condition_arr[x].where[s].compare == "NULL" 
						|| condition_arr[x].where[s].compare == "NOT NULL" 
					){
						consition_value = " ";
						consition_field = config_api.PREFIX + condition_arr[x].where[s].field + " IS ";
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
							consition_field = config_api.PREFIX + condition_arr[x].where[s].field ;		
						}else{
							consition_value = "'%" + condition_arr[x].where[s].value + "%'";
							consition_field = config_api.PREFIX + condition_arr[x].where[s].field ;
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
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi decode , liên hệ admin" );
		return { "error" : "1", "position":"get condition","message": error_send };
	}	
}
module.exports = get_consition;


const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const config_database = require('../../configs/config-database.js');

const ojs_shares_show_errors = require('./ojs-shares-show-errors');
const ojs_shares_date = require('./ojs-shares-date.js');





const get_order =  function(datas,res){	
	try {
		var sql_order = "";
		//@
		if(!datas.order || datas.order.length < 1){
			sql_order = " ";
		}else{
			var order_arr = datas.order;
			for (var x in order_arr){
				if(sql_order == ""){
					
					//@speciality field product
					if(
					order_arr[x].field == "products_speciality_sort_by_percen" 
					|| order_arr[x].field == "products_speciality_price_caution" 
					){
						sql_order = "order by " + order_arr[x].field + " " + 
						order_arr[x].compare +  " ";						
					}else{
						sql_order = "order by " + config_database.PREFIX + order_arr[x].field + " " + 
						order_arr[x].compare +  " "; 
					}
				}else{
					
					//@speciality field product
					if(
					order_arr[x].field == "products_speciality_sort_by_percen" 
					|| order_arr[x].field == "products_speciality_price_caution" 
					){
						sql_order = sql_order + " , " + order_arr[x].field + " " + 
						order_arr[x].compare +  " ";
					}else{
						sql_order = sql_order + " , " + config_database.PREFIX + order_arr[x].field + " " + 
						order_arr[x].compare +  " ";
					}						
				}
			}
		}
		return sql_order;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi get order , liên hệ admin" );
		return { "error" : "1", "position":"get order","message": error_send };
	}	
}
module.exports = get_order;
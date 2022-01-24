

const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const config_database = require('../../configs/config-database.js');

const ojs_shares_show_errors = require('./ojs-shares-show-errors');
const ojs_shares_date = require('./ojs-shares-date.js');





const get_limit =  function(datas,res){	
	try {
		var limit = "";
		if(datas.limit && datas.limit.length > 0){
			 
			var limit_arr = datas.limit;
			if( Object.getOwnPropertyDescriptor(limit_arr[0], 'limit_number') != undefined){
				limit = " " + limit_arr[0].limit_number + " ";
				
				if( Object.getOwnPropertyDescriptor(limit_arr[0], 'limit_offset') != undefined){
					limit = limit + " offset " + limit_arr[0].limit_offset;
				}	
				limit = "limit " + limit ;
			}	
		}
		//@
		return limit;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi get limit , liên hệ admin" );
		return { "error" : "1", "position":"get limit","message": error_send };
	}	
}
module.exports = get_limit;
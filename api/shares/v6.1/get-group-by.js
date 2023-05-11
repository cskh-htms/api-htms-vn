

const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const config_database = require('../../configs/config-database.js');

const ojs_shares_show_errors = require('./ojs-shares-show-errors');
const ojs_shares_date = require('./ojs-shares-date.js');





const get_group_by =  function(datas,res){	
	try {
		var sql_group = "";
		//@
		if(datas.group_by && datas.group_by.length > 0){
			var group_arr = datas.group_by;
			for (var x in group_arr){
				if(sql_group == ""){
					sql_group =  sql_group  + config_database.PREFIX +  group_arr[x];
				}else{
					sql_group =  sql_group  + ", "  + config_database.PREFIX + group_arr[x];
				}
			}
			sql_group = " group by " + sql_group + " ";
		}

		
		return sql_group;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi get group by , liên hệ admin" );
		return { "error" : "1", "position":"get group_by","message": error_send };
	}	
}
module.exports = get_group_by;
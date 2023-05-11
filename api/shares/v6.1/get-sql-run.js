

const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const config_database = require('../../configs/config-database.js');

const ojs_shares_show_errors = require('./ojs-shares-show-errors');
const ojs_shares_date = require('./ojs-shares-date.js');

const get_select_type = require('./get-select-type');
const get_select_fields = require('./get-select-fields');
const get_conditions = require('./get-conditions');
const get_limit = require('./get-limit.js');
const get_order = require('./get-order.js');
const get_group_by = require('./get-group-by.js');
const get_having = require('./get-having.js');



const sql_run =  function(datas){	
	try {
		var sql_select_type = get_select_type(datas);
		var sql_select_fields = get_select_fields(datas);	
		var sql_condition = get_conditions(datas);	
		var sql_limit = get_limit(datas);
		var sql_order = get_order(datas);
		var sql_group_by = get_group_by(datas);
		var sql_having = get_having(datas);	

		var sql_return = " " + 
		sql_select_type + 
		sql_select_fields + 
		sql_limit +
		sql_order + 
		sql_group_by + 
		sql_having + 
		sql_condition;
		
		return sql_return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi get sql run , liên hệ admin" );
		return { "error" : "1", "position":"get sql run","message": error_send };
	}	
}
module.exports = sql_run;
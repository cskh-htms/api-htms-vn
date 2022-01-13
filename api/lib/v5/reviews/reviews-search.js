

const mysql = require('mysql');


const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');

const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const fields_search_reviews = require('./fields-search-reviews');

const get_select_type = require('../../../shares/' + config_api.API_SHARES_VERSION + '/get-select-type');
const get_select_fields = require('../../../shares/' + config_api.API_SHARES_VERSION + '/get-select-fields');
const get_conditions = require('../../../shares/' + config_api.API_SHARES_VERSION + '/get-conditions');



const search_reviews_spaciality = function (datas) {
	var sql_select_type = get_select_type.get_select_type(datas);
	
	var sql_select_fields = get_select_fields.get_select_fields(datas);	
	
	var sql_return = sql_select_type + sql_select_fields;
	
	return (
		sql_select_type + 
		sql_select_fields 
	);
	
	
};	


module.exports = {
	search_reviews_spaciality
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/















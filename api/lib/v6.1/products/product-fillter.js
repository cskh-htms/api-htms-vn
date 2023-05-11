

const mysql = require('mysql2');


const config_api = require('../configs/config');



const connection = require('../connections/connections-reader');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const fields_get = require('./product-fields-get');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');



const get_select_type = require('../../../shares/' + config_api.API_SHARES_VERSION + '/get-select-type');
const get_select_fields = require('../../../shares/' + config_api.API_SHARES_VERSION + '/get-select-fields');
const get_conditions = require('../../../shares/' + config_api.API_SHARES_VERSION + '/get-conditions');
const get_limit = require('../../../shares/' + config_api.API_SHARES_VERSION + '/get-limit.js');
const get_order = require('../../../shares/' + config_api.API_SHARES_VERSION + '/get-order.js');
const get_group_by = require('../../../shares/' + config_api.API_SHARES_VERSION + '/get-group-by.js');
const get_having = require('../../../shares/' + config_api.API_SHARES_VERSION + '/get-having.js');


const product_search = function (datas,res) {

	try{	
		var sql_select_type = get_select_type(datas,res);
		var sql_select_fields = get_select_fields(datas,res);	
		var sql_condition = get_conditions(datas,res);	
		var sql_limit = get_limit(datas,res);
		var sql_order = get_order(datas,res);
		var sql_group_by = get_group_by(datas,res);
		var sql_having = get_having(datas,res);	
		
		var get_sql_search_group = "SELECT " + 
			sql_select_type + 
			sql_select_fields + 
			fields_get.from_default + 
			fields_get.link_fillter + 
			sql_condition +
			sql_group_by + 
			sql_having + 			
			sql_order + 
			sql_limit;
			
			
		//return get_sql_search_group;
		
		//return res.send([get_sql_search_group]);
		//
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi product-fillter, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1",
			"position" : "product-fillter", 
			"message": error_send 
			}); 
			
	}	

	//@
	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: get_sql_search_group, timeout: 20000 }, ( err , results , fields ) => {
				if( err ) {
					var evn = config_api.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							"Lỗi product-fillter, Vui lòng liên hệ admin" 
						);
					return res.send({ 
						"error" : "2",
						"position" : "lib/products/product-fillter", 
						"message": error_send 
					}); 
					
				}
				resolve(results);
			} );
		} );
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi product-fillter, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3",
			"position" : "lib/products/product-fillter", 
			"message": error_send 
		}); 
		
	}	
};	


module.exports = product_search;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/















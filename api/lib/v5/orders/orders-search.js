

const md5 = require('md5');
const mysql = require('mysql');
const connection = require('../connections/connections');
const orders_fields_insert = require('./orders-fields-insert.js');
const config_database = require('../../../configs/config-database');
const ojs_configs = require('../../../../configs/config');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');

const orders_search = async function (datas,res) {
	var sql_text = 	"" + 
	"SELECT " + fields_search_token.fields_search +
	fields_search_token.from_default + 
	" where " + 
	config_database.PREFIX + "token_key = '" + token + "' ";

	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 }, ( err , results , fields ) => {
				if( err ) {
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							"Lỗi orders search, Vui lòng liên hệ admin" 
						);
					res.send({ 
						"error" : "2",
						"position" : "lib/orders/orders search", 
						"message": error_send 
					}); 
					return;
				}
				resolve(results);
			} );
		} );
	}
	
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi orders search, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "3",
			"position" : "lib/orders/orders search", 
			"message": error_send 
		}); 
		return;
	}
	
};


module.exports = orders_search;

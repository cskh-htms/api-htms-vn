


const mysql = require('mysql2');
const connection = require('../connections/connections-reader');
const config_database = require('../../../configs/config-database');
const config_api = require('../../../configs/config-api');
const ojs_configs = require('../../../../configs/config');

const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const note_fields_get = require('./note-fields-get.js');

const note_news_bussiness = async function (store_id,res) {
	
	var sql_text = 	"" + 
	"SELECT " + 
		"count(" + config_database.PREFIX + "notes_ID ) as notes_ID  " +
		
	note_fields_get.from_default + 
	note_fields_get.link_default + 
	
	" where " + 
		config_database.PREFIX + "notes_status in (0) " +
		" and " + 
		config_database.PREFIX + "notes_store_id  = " + store_id + " " ; 		

	//@
	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 }, ( err , results , fields ) => {
				if( err ) {
					var evn = ojs_configs.evn;
					////evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							"Lỗi note  news bussiness, Vui lòng liên hệ admin" 
						);
					return res.send({ 
						"error" : "1",
						"position" : "lib/notess/note news bussiness", 
						"message": error_send 
					}); 
					
				}
				resolve(results);
			} );
		} );
	}	
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi note news bussiness, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "2",
			"position" : "lib/notess/note news bussiness",
			"message": error_send 
			}); 
			
	}
	
};


module.exports = note_news_bussiness;

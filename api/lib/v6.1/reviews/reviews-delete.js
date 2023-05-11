

const mysql = require('mysql');
const connection = require('../connections/connections');
const config_database = require ('../../../configs/config-database');


const delete_reviews_spaciality = async function (review_id,res) {
	let table_name  = config_database.PREFIX + "reviews_speciality ";
	let field_where  = config_database.PREFIX + "reviews_speciality_ID ";
	//create sql text
	let sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ review_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) {
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							"Lỗi delete review, Vui lòng liên hệ admin" 
						);
					return res.send({ 
						"error" : "2",
						"position" : "lib/reviews/delete review", 
						"message": error_send 
					}); 
					
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
				"Lỗi delete review, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3",
			"position" : "lib/reviews/delete", 
			"message": error_send 
		}); 
		
	}
};	


module.exports = delete_reviews_spaciality;

















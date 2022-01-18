


const mysql = require('mysql');
const connection = require('../connections/connections');
const config_database = require('../../../configs/config-database');

const orders_fields_get = require('./orders-fields-get.js');

const orders_search = async function (user_id) {
	
	var sql_text = 	"" + 
	"SELECT " + 
		"count(" + config_database.PREFIX + "orders_speciality_ID) as orders_speciality_ID " +
	orders_fields_get.from_default + 
	
	" LEFT JOIN " + 
		config_database.PREFIX + "stores  ON  " + 
		config_database.PREFIX + "orders_speciality_store_id  = " + 
		config_database.PREFIX + "stores_ID " +    
	
	" where " + 
		config_database.PREFIX + "orders_speciality_status_orders <> 100 " +
		" and " + 
		config_database.PREFIX + "stores_user_id = " + user_id + " " ; 		

	//@
	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 }, ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	
	catch(error){
		return  { "error" : "1", "position":"lib-orders->orders-search-news-bussiness.js", "message" : error } ;
	}
	
};


module.exports = orders_search;

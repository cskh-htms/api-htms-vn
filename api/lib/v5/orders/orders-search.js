

const md5 = require('md5');
const mysql = require('mysql');
const connection = require('../connections/connections');
const orders_fields_insert = require('./orders-fields-insert.js');
const config_database = require('../../../configs/config-database');



const orders_search = async function (datas) {
	var sql_text = 	"" + 
	"SELECT " + fields_search_token.fields_search +
	fields_search_token.from_default + 
	" where " + 
	config_database.PREFIX + "token_key = '" + token + "' ";

	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 }, ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	
	catch(error){
		return  { "error" : "1", "message" : error } ;
	}
	
};


module.exports = orders_search;



const md5 = require('md5');
const mysql = require('mysql');
const connection = require('../connections/connections');
const fields_search_token = require('./fields-search-token');
const config_database = require('../../../configs/config-database');

const search_token = async function (token,res) {
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


module.exports = search_token;

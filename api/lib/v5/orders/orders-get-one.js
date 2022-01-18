
const md5 = require('md5');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const connection = require('../connections/connections');
const config_database = require('../../../configs/config-database');
const fields_search_users = require('./fields-search-users');


const get_one_users = async function (user_id) {

	let sql_text = 	"" + 
	"SELECT " +  fields_search_users.fields_search + 
	fields_search_users.from_default + 
	fields_search_users.link_default + 
	" where " + 
	config_database.PREFIX + "users_ID = '" + user_id + "' " 

	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "1", "message" : error } ;
	}
};


module.exports = { 
	get_one_users
};


const md5 = require('md5');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

const connection = require('../connections/connections-reader');

const config_api = require('../configs/config');


const user_fields_get = require('./user-fields-get.js');


const get_one_users = async function (user_id) {

	let sql_text = 	"" + 
	"SELECT " +  user_fields_get.fields_search + 
	user_fields_get.from_default + 
	user_fields_get.link_default + 
	" where " + 
	config_api.PREFIX + "users_ID = '" + user_id + "' " 

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

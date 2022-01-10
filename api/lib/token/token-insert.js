

const md5 = require('md5');
const mysql = require('mysql');
const connection = require('../connections/connections');
const config_database = require('../../configs/config-database');



const insert_token = async function (datas) {
	let sql_text = "INSERT INTO " + config_database.PREFIX + "token  SET ?";
	let dataGo = {
			"token_key"						: datas.datas.token_key,
			"token_type"					: datas.datas.token_type,	
			"token_value"					: datas.datas.token_value
	}

	let kes = Object.keys(dataGo);
	for(let x in kes){
		dataGo = ojs_shares.rename_key(dataGo, kes[x], config_database.PREFIX + kes[x] );
	}

	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , dataGo , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "1", "message" : error } ;
	}

};


//export module
module.exports = { 
				insert_token
};






//connect 
const connection = require('./models-connection');
const ojs_api_config = require('../api-configs/api-config');
const md5 = require('md5');





//tao data filed chung cho select
let sql_select_all = 	"" + 
	ojs_api_config.db_prefix + "service_type_ID as service_type_ID, " + 
	ojs_api_config.db_prefix + "service_type_name as service_type_name, " + 
	ojs_api_config.db_prefix + "service_type_information as service_type_information " 
//from table
let sql_from_default = 	" from " + 
	ojs_api_config.db_prefix + "service_type " 
	
//link table	
let sql_link_default = 	"" 
	

//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get ALL category chung;
var get_all_service_type = async function () {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all +
					sql_from_default  + 
					sql_link_default 
					
	//return sql_text;
	//@
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "m_13", "message" : error } ;
	}
};




//export module
module.exports = { 
				get_all_service_type
};





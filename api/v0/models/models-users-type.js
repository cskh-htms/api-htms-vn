


//connect 
const connection = require('./models-connection');
const ojs_configs = require('../../../configs/config');
const ojs_shares = require('../../../models/ojs-shares');
const md5 = require('md5');





//tao data filed chung cho select
let sql_select_all = 	"" + 
	ojs_configs.db_prefix + "users_type_ID as users_type_ID, " + 
	ojs_configs.db_prefix + "users_type_name as users_type_name, " + 
	ojs_configs.db_prefix + "users_type_infomation as users_type_infomation " 
//from table
let sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "users_type " 
	
//link table	
let sql_link_default = 	"" 
	




//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get ALL users type;
var get_all_users_type = async function () {
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
		return  { "error" : "13_models->get_all_users_type", "message" : error } ;
	}
};






//export module
module.exports = { 
	get_all_users_type
};





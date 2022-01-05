
/*
@@@@
@@@@@
@@@@@
@@@@@
*/

//connect 
const connection = require('./models-connection');
var mysql = require('mysql');


//@
//@
//configs/config
//function share
const ojs_configs = require('../../../configs/config');
const ojs_shares = require('../../../models/ojs-shares');




//from table
let sql_select_all = 	"" + 	
	ojs_configs.db_prefix  + "category_store_ID as category_store_ID, " + 
	ojs_configs.db_prefix  + "category_store_date_created as category_store_date_created, " + 
	ojs_configs.db_prefix  + "category_store_name as category_store_name, " + 
	ojs_configs.db_prefix  + "category_store_store_id as category_store_store_id, " + 
	ojs_configs.db_prefix  + "category_store_category_parent_id as category_store_category_parent_id, " + 
	ojs_configs.db_prefix  + "category_store_infomation as category_store_infomation, " + 
	ojs_configs.db_prefix  + "category_store_featured_image as category_store_featured_image, " + 
	ojs_configs.db_prefix  + "category_store_sort_order as category_store_sort_order,  " + 
	ojs_configs.db_prefix  + "category_store_show as category_store_show,  " + 
	ojs_configs.db_prefix  + "stores_ID as stores_ID, " + 
	ojs_configs.db_prefix  + "stores_user_id as stores_user_id, " + 
	ojs_configs.db_prefix  + "stores_date_created as stores_date_created, " + 
	ojs_configs.db_prefix  + "stores_name as stores_name, " + 
	ojs_configs.db_prefix  + "stores_service_type_id as stores_service_type_id, " + 
	ojs_configs.db_prefix  + "stores_adress as stores_adress, " + 
	ojs_configs.db_prefix  + "stores_phone as stores_phone " 

//from table
let sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "category_store, " + 
	ojs_configs.db_prefix + "stores " 
	
//link table	
let sql_link_default = 	" where " + 
	ojs_configs.db_prefix + "category_store." + ojs_configs.db_prefix + "category_store_store_id = " +
	ojs_configs.db_prefix + "stores." + ojs_configs.db_prefix + "stores_ID " 


//link table	
let sql_order_default = " order by " + 
	ojs_configs.db_prefix + "category_store_name" ;
	
	

//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get ALL category chung;
var get_all_category_store_speciality = async function () {
	//create sql text
	let sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					sql_order_default
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

//@@
//@@
//@@@@@@@@@@

/*
@@@@
@@@@@
@@@@@
@@@@@
*/

module.exports = {
	get_all_category_store_speciality
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/
















/*



* 1. [get_all_shipping_company]




*/


//@
//@
//@
//connect 
const connection = require('./models-connection');



//@
//@
//configs/config
const ojs_configs = require('../../../configs/config');


//@
//@
//@
//npm exstands
const mysql = require('mysql');




//@
//@
//function share
const ojs_shares_others = require('../../../models/ojs-shares-others');
const ojs_shares_sql = require('../../../models/ojs-shares-sql');
const ojs_shares_show_errors = require('../../../models/ojs-shares-show-errors');


//@
//@
//@
//@
//@
//@
//@ fields select
var sql_select_all = 	"" + 	
	ojs_configs.db_prefix  + "shipping_company_ID as shipping_company_ID, " + 
	ojs_configs.db_prefix  + "shipping_company_name as shipping_company_name, " + 
	ojs_configs.db_prefix  + "shipping_company_information as shipping_company_information ";



//@
//@
//@
//@from
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "shipping_company "  
	
	
var sql_link_default = 	"";	
	
	
//@
//@
//@
//@link	
var sql_link_search = 	"";
	

//@
//@
//@
//@order	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "shipping_company_ID ";
	
	
	




//@@
//@@
//@@
//@@
//@ * 1. [get_all_shipping_company]
const get_all_shipping_company = async function () {
	
	
	
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
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
		return  { "error" : "1", "position":"md-shipping_company->insert", "message" : error } ;
	}
};



//@ end of * 1. [get_all_shipping_company]







//@
//@
//@
//@
//@
//@
//export module
module.exports = {
			get_all_shipping_company
};


















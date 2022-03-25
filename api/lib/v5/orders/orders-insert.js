

const mysql = require('mysql');


const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');

const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const fields_get = require('./orders-fields-get');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const ojs_configs = require('../../../../configs/config');


const order_insert = function (datas,data_details,res) {
	
	var sql_text = "";
	var dataGo = {
			"orders_speciality_user_id"					: datas.orders_speciality_user_id,
			"orders_speciality_store_id"				: datas.orders_speciality_store_id,
			
			"orders_speciality_adress"					: mysql.escape(datas.orders_speciality_adress).replace(/^'|'$/gi, ""),		
			"orders_speciality_phone"					: mysql.escape(datas.orders_speciality_phone).replace(/^'|'$/gi, ""),	
			"orders_speciality_email"					: mysql.escape(datas.orders_speciality_email).replace(/^'|'$/gi, ""),
			"orders_speciality_notes"					: mysql.escape(datas.orders_speciality_notes).replace(/^'|'$/gi, ""),
			
			
			
			
			"orders_speciality_province"				: mysql.escape(datas.orders_speciality_province).replace(/^'|'$/gi, ""),		
			"orders_speciality_district"				: mysql.escape(datas.orders_speciality_district).replace(/^'|'$/gi, ""),	
			"orders_speciality_wards"					: mysql.escape(datas.orders_speciality_wards).replace(/^'|'$/gi, ""),
			"orders_speciality_name"					: mysql.escape(datas.orders_speciality_name).replace(/^'|'$/gi, ""),			
			
			
			"orders_speciality_status_orders"			: datas.orders_speciality_status_orders,
			"orders_speciality_status_payment"			: datas.orders_speciality_status_payment,
			"orders_speciality_company"					: datas.orders_speciality_company,
			"orders_speciality_shipping_code"			: mysql.escape(datas.orders_speciality_shipping_code).replace(/^'|'$/gi, "")			
	}

	var kes = Object.keys(dataGo);
	for(let x in kes){
		dataGo = shares_all_api.rename_key(dataGo, kes[x], config_database.PREFIX + kes[x] );
	}
	
	
	sql_text = "START TRANSACTION ; "
	sql_text = "INSERT INTO " + config_database.PREFIX + "orders_speciality  SET ? ; ";

	sql_text = sql_text + "SET @aa :=LAST_INSERT_ID(); ";	
	
	
	//return sql_text;
	
	
	//
	// sql details
	//

	if(data_details.length > 0){
		let sql_details_all = "";
		for(let i = 0; i < data_details.length; i ++){
			///ex
			sql_details = "INSERT INTO " + config_database.PREFIX + "orders_details_speciality  ";
			sql_details = sql_details + "(" +
							config_database.PREFIX + "orders_details_speciality_order_id" + "," + 
							config_database.PREFIX + "orders_details_speciality_line_order" + "," + 
							config_database.PREFIX + "orders_details_speciality_product_id " + "," + 
							config_database.PREFIX + "orders_details_speciality_qty " + "," + 
							config_database.PREFIX + "orders_details_speciality_price "  + 	
						") " + 
						"values(" + 
						"@aa, '" + 
						data_details[i].orders_details_speciality_line_order +  "', " + 
						data_details[i].orders_details_speciality_product_id +  ", " + 
						data_details[i].orders_details_speciality_qty +  ", " + 
						data_details[i].orders_details_speciality_price + 
						") ; ";		
			sql_details_all	= sql_details_all  + sql_details		
		}//end of for option_arr	
		sql_text = sql_text + sql_details_all;
	}
	//
	// end of sql details
	//-----------------------------	
	

	
	//commit
	sql_text = sql_text + " COMMIT;"	
	
	
	//return sql_text;
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , dataGo,  ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			});
		} );		
	}
	catch(error){
		res.send({ 
			"error" : "modem orders speciality, -> insert order  speciality", 
			"position":"api/lib/v5/order insert",
			"message" : error 
		}) ;
	}
};	


module.exports = order_insert;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/















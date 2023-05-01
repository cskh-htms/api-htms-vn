

const mysql = require('mysql');


const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');

const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const fields_get = require('./orders-master-fields-get.js');
const fields_insert = require('./orders-master-fields-insert.js');
const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');
const ojs_configs = require('../../../../configs/config');


const order_insert = function (datas,res) {
	/*
	var sql_text = "";
	var dataGo = {
			"orders_speciality_master_user_id"				: datas.orders_speciality_master_user_id,
			"orders_speciality_master_province"				: mysql.escape(datas.orders_master.orders_speciality_master_province).replace(/^'|'$/gi, ""),		
			"orders_speciality_master_district"				: mysql.escape(datas.orders_master.orders_speciality_master_district).replace(/^'|'$/gi, ""),	
			"orders_speciality_master_wards"				: mysql.escape(datas.orders_master.orders_speciality_master_wards).replace(/^'|'$/gi, ""),
			"orders_speciality_master_adress"				: mysql.escape(datas.orders_master.orders_speciality_master_adress).replace(/^'|'$/gi, ""),
			"orders_speciality_master_notes"				: mysql.escape(datas.orders_master.orders_speciality_master_notes).replace(/^'|'$/gi, ""),
			"orders_speciality_master_phone"				: mysql.escape(datas.orders_master.orders_speciality_master_phone).replace(/^'|'$/gi, ""),			
			"orders_speciality_master_name"					: mysql.escape(datas.orders_master.orders_speciality_master_name).replace(/^'|'$/gi, ""),		
			"orders_speciality_master_email"				: mysql.escape(datas.orders_master.orders_speciality_master_email).replace(/^'|'$/gi, ""),			
	}

	var kes = Object.keys(dataGo);
	for(let x in kes){
		dataGo = shares_all_api.rename_key(dataGo, kes[x], config_database.PREFIX + kes[x] );
	}
	
	
	sql_text = "START TRANSACTION ; "
	sql_text = sql_text + "INSERT INTO " + config_database.PREFIX + "orders_speciality_master  SET ? ; ";

	sql_text = sql_text + "SET @aa :=LAST_INSERT_ID(); ";	
	
	
	//return sql_text;
	
	
	//@	
	//@
	//@	
	//@
	//@ insert order order_store
	if(datas.orders_master.length > 0){
		let sql_order_store = "";
		for(let i = 0; i < datas.orders_master.length; i ++){
			sql_details = "INSERT INTO " + config_database.PREFIX + "orders_speciality  ";
			sql_details = sql_details + "(" +
							config_database.PREFIX + "orders_speciality_orders_speciality_master_id" + "," + 
							config_database.PREFIX + "orders_speciality_store_id" +
						") " + 
						"values(" + 
						"@aa, '" + 
						datas[i]. + "' " + 
						") ; ";		
			sql_order_store	= sql_order_store  + sql_details		
		}//end of for option_arr	
		sql_text = sql_text + sql_order_store;
	}
	//
	// end of sql details
	//-----------------------------		
	
	
	
	*/
	
	
	
	
	//
	// sql details
	if(datas.orders_master.length > 0){
		let sql_order_store = "";
		for(let i = 0; i < datas.orders_master.length; i ++){
			///ex
			var orders_details_medium_text = "";
			if(datas[i].orders_details_medium_text){
				var orders_details_medium_text = datas[i].orders_details_medium_text;
			}
			
			
			
			sql_details = "INSERT INTO " + config_database.PREFIX + "orders_details_speciality  ";
			sql_details = sql_details + "(" +
							config_database.PREFIX + "orders_details_speciality_order_id" + "," + 
							config_database.PREFIX + "orders_details_speciality_line_order" + "," + 
							config_database.PREFIX + "orders_details_speciality_product_id " + "," + 
							config_database.PREFIX + "orders_details_speciality_qty " + "," + 
							config_database.PREFIX + "orders_details_speciality_price "  + "," + 
							config_database.PREFIX + "orders_details_medium_text "  + 
						") " + 
						"values(" + 
						"@aa, '" + 
						datas[i].orders_details_speciality_line_order +  "', " + 
						datas[i].orders_details_speciality_product_id +  ", " + 
						datas[i].orders_details_speciality_qty +  ", " + 
						datas[i].orders_details_speciality_price +  ", '" + 
						orders_details_medium_text + "' " + 
						") ; ";		
			sql_order_store	= sql_order_store  + sql_details		
		}//end of for option_arr	
		sql_text = sql_text + sql_order_store;
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
				if( err ) {
					var evn = ojs_configs.evn;					
					var error_massage = fields_insert.get_message_error(err);					
					////evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							error_massage
						);
					return res.send({ 
						"error" : "10", 
						"position" : "lib->order->inser.js",
						"message": error_send 
					}); 
										
				}
				resolve(results);
			});
		} );		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi insert order, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "lib->order->inser.js",
			"message": error_send 
		}); 
			
	}
};	


module.exports = order_insert;


/*
@@@@
@@@@@
@@@@@
@@@@@
*/















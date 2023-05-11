
//@
//@
//@
//@
//@
//@
const mysql = require('mysql2');

const config_api = require('../configs/config');



const connection = require('../connections/connections');
const shares_all_api = 
	require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const fields_get = require('./orders-master-fields-get.js');
const fields_insert = require('./orders-master-fields-insert.js');
const ojs_shares_show_errors = 
	require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');


//@
//@
//@
//@
//@
//@
const order_insert = function (data,datas_order,res) {
	
	//return res.send([datas_master,datas_order]);
	var datas_master = Object.assign(fields_insert.default_fields, data);	
	var sql_text = "";
	var dataGo = {
			"orders_speciality_master_user_id"				: datas_master.orders_speciality_master_user_id,
			"orders_speciality_master_service"				: datas_master.orders_speciality_master_service,
			"orders_speciality_master_province"				: mysql.escape(datas_master.orders_speciality_master_province).replace(/^'|'$/gi, ""),		
			"orders_speciality_master_district"				: mysql.escape(datas_master.orders_speciality_master_district).replace(/^'|'$/gi, ""),	
			"orders_speciality_master_wards"				: mysql.escape(datas_master.orders_speciality_master_wards).replace(/^'|'$/gi, ""),
			"orders_speciality_master_adress"				: mysql.escape(datas_master.orders_speciality_master_adress).replace(/^'|'$/gi, ""),
			"orders_speciality_master_notes"				: mysql.escape(datas_master.orders_speciality_master_notes).replace(/^'|'$/gi, ""),
			"orders_speciality_master_phone"				: mysql.escape(datas_master.orders_speciality_master_phone).replace(/^'|'$/gi, ""),			
			"orders_speciality_master_name"					: mysql.escape(datas_master.orders_speciality_master_name).replace(/^'|'$/gi, ""),		
			"orders_speciality_master_email"				: mysql.escape(datas_master.orders_speciality_master_email).replace(/^'|'$/gi, ""),			
	}

	var kes = Object.keys(dataGo);
	for(let x in kes){
		dataGo = shares_all_api.rename_key(dataGo, kes[x], config_api.PREFIX + kes[x] );
	}
	
	
	sql_text = "START TRANSACTION ; "
	sql_text = sql_text + "INSERT INTO " + config_api.PREFIX + "orders_speciality_master  SET ? ; ";
	sql_text = sql_text + "SET @master_id :=LAST_INSERT_ID(); ";	
		//return res.send([datas_master,datas_order]);
	
	
	//@	
	//@
	//@	
	//@
	//@ insert order order_store
	if(datas_order.length > 0){
		let sql_order_store = "";
		for(let i = 0; i < datas_order.length; i ++){
			sql_details = "INSERT INTO " + config_api.PREFIX + "orders_speciality  ";
			sql_details = sql_details + "(" +
					config_api.PREFIX + "orders_speciality_orders_speciality_master_id" + "," + 
					config_api.PREFIX + "orders_speciality_store_id" +
				") " + 
				"values(" + 
				"@master_id, " + 
				datas_order[i].store_id + 
				") ; " + 
				"SET @order_id :=LAST_INSERT_ID(); ";
				for(x in datas_order[i].order_details){
					
					var orders_details_medium_text = "";
					if(datas_order[i].order_details[x].orders_details_medium_text){
						orders_details_medium_text = datas_order[i].order_details[x].orders_details_medium_text;
					}
					
					sql_details = sql_details + " INSERT INTO " + config_api.PREFIX + "orders_details_speciality  ";
					sql_details = sql_details + "(" +
							config_api.PREFIX + "orders_details_speciality_order_id" + "," + 
							config_api.PREFIX + "orders_details_speciality_line_order" + "," + 
							config_api.PREFIX + "orders_details_speciality_product_id " + "," + 
							config_api.PREFIX + "orders_details_speciality_qty " + "," + 
							config_api.PREFIX + "orders_details_speciality_price "  + "," + 
							config_api.PREFIX + "orders_details_medium_text "  + 
						") " + 
						"values(" + 
						"@order_id, '" + 
						datas_order[i].order_details[x].orders_details_speciality_line_order +  "', " + 
						datas_order[i].order_details[x].orders_details_speciality_product_id +  ", " + 
						datas_order[i].order_details[x].orders_details_speciality_qty +  ", " + 
						datas_order[i].order_details[x].orders_details_speciality_price +  ", '" + 
						orders_details_medium_text  + "' " + 
						") ; ";	
				}						
			sql_order_store	= sql_order_store  + sql_details		
		}//end of for option_arr	
		sql_text = sql_text + sql_order_store;
	}
	//
	// end of sql details
	//-----------------------------		
	//return res.send([sql_text]);
	
	
	//commit
	sql_text = sql_text + " COMMIT;"	
	
	//return sql_text;
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , dataGo,  ( err , results , fields ) => {
				if( err ) {
					var evn = config_api.evn;					
					var error_massage = fields_insert.get_message_error(err);					
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
							evn, 
							err, 
							error_massage
						);
					return res.send({ 
						"error" : "10", 
						"position" : "lib->order->mater-inser.js",
						"message": error_send 
					}); 
										
				}
				resolve(results);
			});
		} );		
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi insert order, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "lib->order->master-inser.js",
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















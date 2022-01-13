

const mysql = require('mysql');


const config_database = require ('../../../configs/config-database');
const config_api = require ('../../../configs/config-api');


const connection = require('../connections/connections');
const shares_all_api = require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api');
const fields_insert_reviews = require('./fields-insert-reviews');





const insert_reviews_spaciality = async function (datas) {
	
	var datas_assign = Object.assign(fields_insert_reviews.default_fields, datas);
		
	//@
	let sql_text = "INSERT INTO " + config_database.PREFIX + "reviews_speciality  SET ?";
	let dataGo = {
			"reviews_speciality_user_id"					: datas_assign.reviews_speciality_user_id,	
			"reviews_speciality_product_id"					: datas_assign.reviews_speciality_product_id,	
			"reviews_speciality_contents"					: mysql.escape(datas_assign.reviews_speciality_contents).replace(/^'|'$/gi, ""),
			"reviews_speciality_images"						: mysql.escape(datas_assign.reviews_speciality_images).replace(/^'|'$/gi, ""),
			"reviews_speciality_videos"						: mysql.escape(datas_assign.reviews_speciality_videos).replace(/^'|'$/gi, ""),
			"reviews_speciality_status_admin"				: datas_assign.reviews_speciality_status_admin,
			"reviews_speciality_number_star"				: datas_assign.reviews_speciality_number_star					
	}

	var kes = Object.keys(dataGo);
	for(let x in kes){
		dataGo = shares_all_api.rename_key(dataGo, kes[x], config_database.PREFIX + kes[x] );
	}
	//@

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


module.exports = {
	insert_reviews_spaciality
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/















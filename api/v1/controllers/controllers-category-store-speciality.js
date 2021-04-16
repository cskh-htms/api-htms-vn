/*
@@@@
@@@@@
@@@@@
@@@@@
*/
var express = require('express');
var router = express.Router();

const models_category_store_speciality = require('../models/models-category-store-speciality');

const default_field = require('../const-tables/const-tables-category-store-speciality');

const ojs_api_config = require('../api-configs/api-config');
const ojs_functions_shares = require('../functions-shares/api-functions-shares');

/*
@@@@
@@@@@
@@@@@
@@@@@
*/


//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get all category chung
function get_all_category_store_speciality(req, res, next) {
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_category_store_speciality.get_all_category_store_speciality().then( results => {
			
			res.send( {"error" : "", "datas" : results} );
			
		}, error => {

			let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_2", "message" : error_send  } );	

		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_3", "message" : error_send  } );
	}	
}


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
























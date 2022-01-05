
var express = require('express');
var router = express.Router();

// get test valiable
const models_service_type = require('../models/models-sevice-type');
const default_field = require('../const-tables/const-tables-service-type');

const jwt = require('jsonwebtoken');
const ojs_api_config = require('../api-configs/api-config');
const ojs_functions_shares = require('../functions-shares/api-functions-shares');




//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get all category chung
function get_all_service_type(req, res, next) {
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_service_type.get_all_service_type().then( results => {
			
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





module.exports = { 
		get_all_service_type
};








var express = require('express');
var router = express.Router();

// get test valiable
const models_users_type = require('../models/models-users-type');
const default_field = require('../const-tables/const-tables-users-type');

const jwt = require('jsonwebtoken');

const ojs_configs = require('../../../configs/config');
const ojs_shares = require('../../../models/ojs-shares');








//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get all category chung
function get_all_users_type_no_token(req, res, next) {
	//res.send({"error":"","datas":"sdasdasdasd"});
	//return;
	//@
	try {
		models_users_type.get_all_users_type().then( results => {
			
			res.send( {"error" : "", "datas" : results} );
			
		}, error => {

			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
			res.send({ "error" : "1.controller-users-type->get_all_users_type_no_token", "message": error_send } ); 
			return;		

		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
			res.send({ "error" : "2.controller-users-type->get_all_users_type_no_token->catch", "message": error_send } ); 
			return;	
	}	

}







module.exports = { 
		get_all_users_type_no_token
};







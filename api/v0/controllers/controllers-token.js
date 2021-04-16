
var express = require('express');
var router = express.Router();

// get test valiable
const models_token = require('../models/models-token');
const default_field = require('../const-tables/const-tables-token');

const jwt = require('jsonwebtoken');
const md5 = require('md5');



const ojs_configs = require('../../../configs/config');
const ojs_shares = require('../../../models/ojs-shares');







//search token
const search = async function (req, res, next) {
	let datas = req.body.datas;
	//res.send(datas);
	try {
		models_token.search(datas).then( results => {
			if(results.length  > 0) {
				res.send( { "error" : "", "datas" : results } );
			}else{
				res.send( { "error": "ctl_1", "message" :  results } );
			}		
		}, error => {
			let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_2", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_3", "message" : error_send  } );
	}

}//end of functions login;


//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
function insert_token(req, res, next) {
	let datas = req.body.datas;
	//res.send(datas);
	//@
	let datas_assign;
	try {
		//gop voi data drfault field in mysql database
		datas_assign = Object.assign(default_field.default_fields, datas);
		
		//neu data không hợp lệ thì return loi;
		
		let data_check = default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({"error" : "1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_1", "message" : error_send  } );
	}			
	
	//res.send(datas_assign);
	
	
	//@
	try {
		models_token.insert_token(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_2", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_3", "message" : error_send  } );
	}	
}









module.exports = { 
		search,
		insert_token
};







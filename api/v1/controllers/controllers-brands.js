/*
@@@@
@@@@@
@@@@@
@@@@@
*/
var express = require('express');
var router = express.Router();

const models_brands = require('../models/models-brands');

const default_field = require('../const-tables/const-tables-brands');

const ojs_api_config = require('../api-configs/api-config');
const ojs_functions_shares = require('../functions-shares/api-functions-shares');


const jwt    = require('jsonwebtoken');


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
function get_all_brands(req, res, next) {
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_brands.get_all_brands().then( results => {
			
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



//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get all category chung
function get_one_brands(req, res, next) {
	let brand_id = req.params.brand_id;
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_brands.get_one_brands(brand_id).then( results => {
			
			res.send( {"error" : "", "datas" : results} );
			
		}, error => {

			let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_api_2", "message" : error_send  } );	

		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_3", "message" : error_send  } );
	}	
}


//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
function update_brands(req, res, next) {
	let datas = req.body.datas;
	let brand_id = req.params.brand_id;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);	
	//res.send([link_id]);
	//@
	//chi co admin moi nhap lieu dc
	if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) != true ){ 
		res.send( { "error": "2_ctrl_api_insert_category", "message" : "Bạn không đủ quyền "  } ); return;
	}

	try {
		let data_check = default_field.check_datas(datas);
		if(data_check != 0){
			res.send({"error" : "1", "message" : data_check } );
		}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_1", "message" : error_send  } );
	}			

	//@
	try {
		models_brands.update_brands(datas,brand_id).then( results => {
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




//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
function insert_brands(req, res, next) {
	let datas = req.body.datas;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);	
	//res.send([link_id]);
	//@
	//chi co admin moi nhap lieu dc
	if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) != true ){ 
		res.send( { "error": "2_ctrl_api_insert_category", "message" : "Bạn không đủ quyền "  } ); return;
	}
	//@
	let datas_assign;
	try {
		//gop voi data drfault field in mysql database
		datas_assign = Object.assign(default_field.default_fields, datas);
		
		//neu data không hợp lệ thì return loi;
		
		let data_check = default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({"error" : "1", "message" : data_check } );
		}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_1", "message" : error_send  } );
	}			
	
	//res.send(datas_assign);
	
	
	//@
	try {
		models_brands.insert_brands(datas_assign).then( results => {
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


//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
function delete_brands(req, res, next) {
	let brand_id = req.params.brand_id;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);	
	//res.send([link_id]);
	//@
	//chi co admin moi nhap lieu dc
	if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) != true ){ 
		res.send( { "error": "2_ctrl_api_insert_category", "message" : "Bạn không đủ quyền "  } ); return;
	}
	//@
	try {
		models_brands.delete_brands(brand_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_api_2", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_3", "message" : error_send  } );
	}	
}

//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//search
async  function search(req, res, next) {
	let datas = req.body.datas;
	
	//res.send(datas);
	//return;

	try {
		models_brands.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
		}, error => {
			let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl__api2", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_3", "message" : error_send  } );
	}

}



/*
@@@@
@@@@@
@@@@@
@@@@@
*/
module.exports = { 
	get_all_brands,
	get_one_brands,
	update_brands,
	insert_brands,
	delete_brands,
	search
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/
























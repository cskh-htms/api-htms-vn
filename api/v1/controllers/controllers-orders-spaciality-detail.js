/*
@@@@
@@@@@
@@@@@
@@@@@
*/
var express = require('express');
var router = express.Router();

const models_orders_spaciality_detail = require('../models/models-orders-spaciality-detail');

const default_field = require('../const-tables/const-tables-orders-spaciality-detail');

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
async  function get_all_orders_spaciality_detail(req, res, next) {
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_orders_spaciality_detail.get_all_orders_spaciality_detail().then( results => {
			
			res.send( {"error" : "", "datas" : results} );
			
		}, error => {

			let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_2_api", "message" : error_send  } );	

		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_3_api", "message" : error_send  } );
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
		models_orders_spaciality_detail.search(datas).then( results => {
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



//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get all category chung
async  function get_one_orders_spaciality_detail(req, res, next) {
	let detail_id = req.params.detail_id;
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_orders_spaciality_detail.get_one_orders_spaciality_detail(detail_id).then( results => {
			
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
//update
async function update_orders_spaciality_detail(req, res, next) {
	let datas = req.body.datas;
	let detail_id = req.params.detail_id;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);	
	//res.send([link_id]);
	//@
	//chi co admin moi nhap lieu dc
	if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) != true ){ 
		res.send( { "error": "2_ctrl_api_insert_category", "message" : "Bạn không đủ quyền "  } ); return;
	}
	//@
	//res.send([datas,detail_id,cat_string]);
	//@

	try {
		let data_check = default_field.check_datas(datas);
		if(data_check != 0){
			res.send({"error" : "1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_1", "message" : error_send  } );
	}			

	//@
	try {
		models_orders_spaciality_detail.update_orders_spaciality_detail(datas,detail_id).then( results => {
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
async  function insert_orders_spaciality_detail(req, res, next) {
	let datas = req.body.datas;
	//res.send([cat_string,datas]);
	//return;
	//@
	let datas_assign;
	try {
		//gop voi data drfault field in mysql database
		datas_assign = Object.assign(default_field.default_fields, datas);
		
		//neu data không hợp lệ thì return loi;
		
		let data_check = default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({"error" : "c_data_1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_1", "message" : error_send  } );
	}			
	
	//res.send(datas_assign);
	
	
	
	//@
	try {
		models_orders_spaciality_detail.insert_orders_spaciality_detail(datas_assign).then( results => {
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
async  function delete_orders_spaciality_detail(req, res, next) {
	let detail_id = req.params.detail_id;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);	
	//res.send([link_id]);
	//@
	//chi co admin moi nhap lieu dc
	if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) != true ){ 
		res.send( { "error": "2_ctrl_api_insert_category", "message" : "Bạn không đủ quyền "  } ); return;
	}
	//@

	//@
	try {
		models_orders_spaciality_detail.delete_orders_spaciality_detail(detail_id).then( results => {
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





/*
@@@@
@@@@@
@@@@@
@@@@@
*/
module.exports = { 
	get_all_orders_spaciality_detail,
	get_one_orders_spaciality_detail,
	update_orders_spaciality_detail,
	insert_orders_spaciality_detail,
	delete_orders_spaciality_detail,
	search
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/
























/*
@@@@
@@@@@
@@@@@
@@@@@
*/
var express = require('express');
var router = express.Router();

const models_orders_spaciality = require('../models/models-orders-spaciality');
const models_orders_spaciality_detail = require('../models/models-orders-spaciality-detail');

const default_field = require('../const-tables/const-tables-orders-spaciality');
const default_field2 = require('../const-tables/const-tables-orders-spaciality-detail');

//@
//@
//configs/config
//function share
const ojs_configs = require('../../../configs/config');
const ojs_shares = require('../../../models/ojs-shares');



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
async  function get_all_orders_spaciality(req, res, next) {
	let token = req.headers['token'];
	//@
	//@@

	
	
	//@@
	let datas_check = {
		"token":token
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.controllers_order_speciality(app)->get-all", "message": error_send } ); 
		return;			
	}
	
	//res.send(check_datas_result );	
	//return;	
	
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, check_datas_result.error, "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.controllers_order_speciality(app)->get-all", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.controllers_order_speciality(app)->get-all", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	//@
	try {
		models_orders_spaciality.get_all_orders_spaciality().then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error,"Lỗi get datas all orders, Vui lòng liên hệ CSKH Dala" );
			res.send({ "error" : "2.4.controllers_order_speciality(app)->get-all", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares.show_error( evn,error,"Lỗi get datas all orders, Vui lòng liên hệ CSKH Dala" );
			res.send({ "error" : "2.5.controllers_order_speciality(app)->get-all", "message": error_send } ); 
			return;	
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
		models_orders_spaciality.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
		}, error => {
			let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl__api2", "message" : error  } );	
		});
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
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
async  function search_view(req, res, next) {
	let datas = req.body.datas;
	
	//res.send(datas);
	//return;

	try {
		models_orders_spaciality.search_view(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
		}, error => {
			let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl__api2_search_view", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_3_search_view", "message" : error_send  } );
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
async  function get_one_orders_spaciality(req, res, next) {
	let order_id = req.params.order_id;
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_orders_spaciality.get_one_orders_spaciality(order_id).then( results => {
			
			res.send( {"error" : "", "datas" : results} );
			
		}, error => {

			let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_api_2", "message" : error_send  } );	

		});
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
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
async function update_orders_spaciality(req, res, next) {
	let datas = req.body.datas;
	let order_id = req.params.order_id;
	let token = req.headers['token'];
	//@
	//@@

	
	
	//@@
	let datas_check = {
		"token":token
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.controllers_order_speciality(app)->update", "message": error_send } ); 
		return;			
	}
	
	//res.send(check_datas_result );	
	//return;	
	
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, check_datas_result.error, "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.controllers_order_speciality(app)->update", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.controllers_order_speciality(app)->update", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	//@	
	//@
	try {
		models_orders_spaciality.update_orders_spaciality(datas,order_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares.show_error( evn, check_datas_result.error, "Lỗi update , vui lòng liên hệ admin" );
			res.send({ "error" : "2.2.controllers_order_speciality(app)->update", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, check_datas_result.error, "Lỗi update , vui lòng liên hệ admin" );
		res.send({ "error" : "2.2.controllers_order_speciality(app)->update", "message": error_send } ); 
		return;	
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
async  function insert_orders_spaciality(req, res, next) {
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
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_1", "message" : error_send  } );
	}			
	
	//res.send(datas_assign);
	
	
	
	//@
	try {
		models_orders_spaciality.insert_orders_spaciality(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_api_2", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
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
async  function delete_orders_spaciality(req, res, next) {
	let order_id = req.params.order_id;
	let token = req.headers['token'];
	//@
	//@@

	
	
	//@@
	let datas_check = {
		"token":token
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2.1.controllers_order_speciality(app)->delete", "message": error_send } ); 
		return;			
	}
	
	//res.send(check_datas_result );	
	//return;	
	
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, check_datas_result.error, "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.controllers_order_speciality(app)->delete", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.controllers_order_speciality(app)->delete", "message": error_send } ); 
		return;			
	}
	
	//@
	try {
		models_orders_spaciality.delete_orders_spaciality(order_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
			res.send({ "error" : "2.33.controllers_order_speciality(app)->delete", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "243.controllers_order_speciality(app)->delete", "message": error_send } ); 
		return;	
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
async  function insert_orders_spaciality_app(req, res, next) {
	let datas = req.body.datas;
	//res.send([datas.orders,datas.orders_detail]);
	//return;
	//@
	let datas_assign;
	try {
		//gop voi data drfault field in mysql database
		datas_assign = Object.assign(default_field.default_fields, datas.orders);
		
		//neu data không hợp lệ thì return loi;
		
		let data_check = await default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({"error" : "c_data_1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_1", "message" : error_send  } );
	}	
	
	//@
	try {
		models_orders_spaciality.insert_orders_spaciality_app(datas_assign,datas.orders_detail).then( results => {
			res.send( {"error" : "", "datas" : results} );
			//
		}, error => {
			env = ojs_configs.api_evn;
			env = "dev";
			var error_send = ojs_shares.show_error( env, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_api_2", "message" : error_send  } );	
		});
	}
	catch(error){
		var error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
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
	get_all_orders_spaciality,
	get_one_orders_spaciality,
	update_orders_spaciality,
	insert_orders_spaciality,
	delete_orders_spaciality,
	search,
	search_view,
	insert_orders_spaciality_app
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/























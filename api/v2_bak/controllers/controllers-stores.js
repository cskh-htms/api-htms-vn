
var express = require('express');
var router = express.Router();

// get test valiable
const models_stores = require('../models/models-stores');
const default_field = require('../const-tables/const-tables-stores');

const jwt = require('jsonwebtoken');

const models_products_spaciality = require('../models/models-products-spaciality');



//@
//@
//configs/config
//function share
const ojs_configs = require('../../../configs/config');
const ojs_shares = require('../../../models/ojs-shares');






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
	
	//res.send( { "error" : "weqweqwe", "datas" : datas} );
	//return;


	try {
		models_stores.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
			res.send({ "error" : error, "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
			res.send({ "error" : "2_controller_store->search", "message": error_send } ); 
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
async  function search_payment(req, res, next) {
	let datas = req.body.datas;
	
	try {
		models_stores.search_payment(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
		}, error => {
			let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl__api2_search_payment", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_api_3_search_payment", "message" : error_send  } );
	}

}



//insert_stores
async function insert_stores(req, res, next) {
	
	let datas = req.body.datas;
	let token = req.headers['token'];
	//
	//@@
	//@@
	let datas_check = {
		"token":token,
		"user_id": datas.stores_users_id
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
		res.send({ "error" : "1.1.controller_users->insert_stores ", "message": error_send } ); 
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
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "1.2.controller_users->insert_stores ", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner != "1" && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "1.3.controller_users->insert_stores ", "message": error_send } ); 
		return;			
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
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Lỗi datas_assign, liên hệ admin", "Lỗi datas_assign, liên hệ admin" );
		res.send({ "error" : "1.4.controller_users->datas_assign ", "message": error_send } ); 
		return;	
	}			
	

	
	//@
	try {
		models_stores.insert_stores(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
			
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error,message_error );
			res.send({ "error" : "3.1_controller_users->odels_stores.insert_stores", "message": error_send } ); 
			return;
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error,"Lỗi server , Liên hệ admin" );
			res.send({ "error" : "3.2_controller_users->odels_stores.insert_stores", "message": error_send } ); 
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
//get all category chung
async  function get_all_stores(req, res, next) {
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_stores.get_all_stores().then( results => {
			
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






//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//get all category chung
async  function get_one_stores(req, res, next) {
	let store_id = req.params.store_id;
	//res.send({store_id});
	//return;
	//@
	try {
		models_stores.get_one_stores(store_id).then( results => {
			
			res.send( {"error" : "", "datas" : results} );
			
		}, error => {

			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "Lỗi get user, liên hệ admin" );
			res.send({ "error" : "1.1 controller_stores->get_one_stores", "message": error_send } ); 
			return;	

		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "Lỗi get user, liên hệ admin" );
			res.send({ "error" : "1.2 controller_stores->get_one_stores", "message": error_send } ); 
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
async  function update_stores(req, res, next) {
	let datas = req.body.datas;
	let store_id = req.params.store_id;
	let token = req.headers['token'];
	//
	//@@
	//@@
	let datas_check = {
		"token":token,
		"store_id": store_id,
		"user_id" : datas.stores_user_id
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
		res.send({ "error" : "1.1.controller_users->insert_stores ", "message": error_send } ); 
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
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "1.2.controller_store->insert_stores ", "message": error_send } ); 
		return;			
	}
	
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_store != "1"  && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.4.router_bussiness(app)->stores/update ", "message": error_send } ); 
		return;			
	}



	//@
	//@
	//@
	//nếu không phải admin thì xoá status admin
	try{
		if(check_datas_result.user_role != "admin" && datas.stores_status_update != "1"){
			delete datas.stores_status;
		}else if(check_datas_result.user_role != "admin" && datas.stores_status_update == "1"){
			Object.assign(datas, { 'stores_status' : 2 });
		}else if(check_datas_result.user_role == "admin"){
			Object.assign(datas, { 'stores_status_update' : 1 });
		}
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Lỗi xoá status, liên hệ admin","Lỗi xoá status, liên hệ admin" );
			res.send({ "error" : "3.2_controller_store->odels_stores.update_stores", "message": error_send } ); 
			return;
	}


	//@
	try {
		models_stores.update_stores(datas,store_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error,message_error );
			res.send({ "error" : "3.1_controller_store->odels_stores.update_stores", "message": error_send } ); 
			return;
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error,"Lỗi update store, vui lòng liên hệ admin" );
			res.send({ "error" : "3.2_controller_store->odels_stores.update_stores", "message": error_send } ); 
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
//delete
async  function delete_stores(req, res, next) {
	let store_id = req.params.store_id;
	let token = req.headers['token'];

	
	//
	//@@
	//@@
	let datas_check = {
		"token":token,
		"store_id": store_id
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
		res.send({ "error" : "1.1.controller_users->insert_stores ", "message": error_send } ); 
		return;			
	}
	

	
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "1.2.controller_store->insert_stores ", "message": error_send } ); 
		return;			
	}
	
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_store != "1"   && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.4.model_sotres->stores/delete ", "message": error_send } ); 
		return;			
	}



	//res.send(check_datas_result );	
	//return;	


	//##
	//##
	//#end of check chủ sỡ hữu 
	//@
	try {
		models_stores.delete_stores(store_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, message_error);
			res.send({ "error" : "1.4.controllers-stores->delete ", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "Lỗi delete data - liên hệ admin" );
			res.send({ "error" : "2.6.model_sotres->stores/delete ", "message": error_send } ); 
			return;	
	}	
}






module.exports = { 
		search,
		search_payment,
		insert_stores,
		get_one_stores,
		update_stores,
		delete_stores,
		get_all_stores
};


























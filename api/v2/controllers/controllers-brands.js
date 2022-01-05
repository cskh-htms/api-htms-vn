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
function get_all_brands(req, res, next) {
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_brands.get_all_brands().then( results => {
			
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
function get_one_brands(req, res, next) {
	let brand_id = req.params.brand_id;
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_brands.get_one_brands(brand_id).then( results => {
			
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
async function update_brands(req, res, next) {
	let datas = req.body.datas;
	let brand_id = req.params.brand_id;
	let token = req.headers['token'];
	//
	//@@
	//@@lấy version
	let datas_check = {
		"token":token,
		"brand_id":brand_id
	}
	//@
	//@
	let check_datas_result;	
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "1.controller_options_speciality->update", "message": error_send } ); 
		return;			
	}
	
	//res.send(check_datas_result);
	//return;

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, check_datas_result.error, "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.controller_options_speciality->update", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_brand != "1"  && check_datas_result.user_role != "admin"  && check_datas_result.user_role != "bussiness"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.controller_options_speciality->update", "message": error_send } ); 
		return;			
	}
	//@
	//@
	
	
	
	//@
	
	//@
	//@
	//@
	//nếu là admin thì update status update = 1
	try{
		if(check_datas_result.user_role == "admin" && datas.brands_status_admin == 1){
			Object.assign(datas,  { 'brands_status_update' : 1 } );
		}
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "6.3_controller_brands>update", "message": error_send } ); 
			return;
	}		
	
		
		
	
	//@
	//@
	//@
	//nếu khong phai admin và status =  3 (tu choi thì sữa thanh chờ phê duyệt)
	try{
		if(check_datas_result.user_role != "admin" && datas.brands_status_admin == 3){
			Object.assign(datas,  { 'brands_status_admin' : 2 } );
		} else if(check_datas_result.user_role != "admin" && datas.brands_status_admin != 3){
			delete datas.brands_status_admin;
		}
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "6.4_controller_brands>update", "message": error_send } ); 
			return;
	}		
	
			
	

	
		
	//@
	try {
		models_brands.update_brands(datas,brand_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			
			let message_error = default_field.get_message_error(error);
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, message_error);
			res.send({ "error" : "6.4.controller_brands>updatee ", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "6.5_controller_brands>update", "message": error_send } ); 
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
async function insert_brands(req, res, next) {
	let datas = req.body.datas;
	let token = req.headers['token'];
	//
	//@@
	//@@
	let datas_check = {
		"token":token,
		"store_id": datas.brands_stores_id
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
		res.send({ "error" : "1.1.controllers-brands->insert ", "message": error_send } ); 
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
		res.send({ "error" : "1.2.controllers-brands->insert ", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_store != "1" && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "1.3.controllers-brands->insert ", "message": error_send } ); 
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
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "1.4.controllers-brands->insert ", "message": error_send } ); 
		return;		
	}			
	
	
	//@
	try {
		models_brands.insert_brands(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, message_error);
			res.send({ "error" : "1.4.controllers-brands->insert ", "message": error_send } ); 
			return;		
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "1.6.controllers-brands->insert ", "message": error_send } ); 
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
async function delete_brands(req, res, next) {
	let brand_id = req.params.brand_id;
	let token = req.headers['token'];
	//
	//@@
	//@@lấy version
	let datas_check = {
		"token":token,
		"brand_id":brand_id
	}
	//@
	//@
	let check_datas_result;	
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "1.controller_brands->delete", "message": error_send } ); 
		return;			
	}
	
	//res.send(check_datas_result);
	//return;

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, check_datas_result.error, "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.controller_brands->delete", "delete": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_brand != "1"  && check_datas_result.user_role != "admin"  && check_datas_result.user_role != "bussiness"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.controller_brands->delete", "message": error_send } ); 
		return;			
	}
	//@
	//@
	//@
	try {
		models_brands.delete_brands(brand_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, message_error);
			res.send({ "error" : "1.4.controllers-brands->delete ", "message": error_send } ); 
			return;	
		});			
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "2.5.controller_brands->delete", "message": error_send } ); 
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
	
	try {
		models_brands.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
		}, error => {
			let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl__api2", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
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
























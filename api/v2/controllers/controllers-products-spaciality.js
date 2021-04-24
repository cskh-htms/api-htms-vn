/*
@@@@
@@@@@
@@@@@
@@@@@
*/
var express = require('express');
var router = express.Router();

const models_products_spaciality = require('../models/models-products-spaciality');
const default_field = require('../const-tables/const-tables-products-spaciality');


const jwt = require('jsonwebtoken');



const models_category_general_speciality_link = require('../models/models-category-gemeral-speciality-link');
const models_option_speciality_link = require('../models/models-option-speciality-link');
const models_reviews_spaciality = require('../models/models-reviews-spaciality');
const models_comments_spaciality = require('../models/models-comments-spaciality');
const models_orders_spaciality_detail = require('../models/models-orders-spaciality-detail');


//@
//@
//configs/config
//function share
const ojs_configs = require('../../../configs/config');
const ojs_shares = require('../../../models/ojs-shares');




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
async function get_all_products_spaciality(req, res, next) {
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_products_spaciality.get_all_products_spaciality().then( results => {
			
			res.send( {"error" : "", "datas" : results} );
			
		}, error => {

			let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_2_api", "message" : error_send  } );	

		});
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
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
async function search(req, res, next) {
	let datas = req.body.datas;
	
	//res.send(datas);
	//return;

	try {
		models_products_spaciality.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
		}, error => {
				var evn = ojs_configs.evn;
				//evn = "dev";;
				var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
				res.send({ "error" : "1.2.controller_product_speciality", "message": error_send } ); 
				return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "1.3.controller_product_speciality", "message": error_send } ); 
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
async function get_one_products_spaciality(req, res, next) {
	let product_id = req.params.product_id;
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_products_spaciality.get_one_products_spaciality(product_id).then( results => {
			
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
async function update_products_spaciality(req, res, next) {
	let datas = req.body.datas;
	let cat_string = req.body.cat_string;
	let option_string = req.body.option_string;
	let product_id = req.params.product_id;
	let token = req.headers['token'];


	//res.send(datas);
	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		res.redirect("/login");
		return;
	}
	//
	//@@
	//@@
	let datas_check = {
		"token":token,
		"store_id" : datas.products_speciality_store_id,
		"product_id":product_id
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
		res.send({ "error" : "2.1.controllers_product_speciality(app)->insert", "message": error_send } ); 
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
		res.send({ "error" : "2.2.controllers_product_speciality(app)->insert", "message": error_send } ); 
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
		res.send({ "error" : "2.3.controllers_product_speciality(app)->insert", "message": error_send } ); 
		return;			
	}
	
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_product != "1"  && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.controllers_product_speciality(app)->insert", "message": error_send } ); 
		return;			
	}
		

	//@
	//@
	//@
	//nếu không phải admin thì xoá status admin
	try{
		if(check_datas_result.user_role != "admin" && datas.products_speciality_status_update != "1"){
			delete datas.products_speciality_status_admin;
		}else if(check_datas_result.user_role != "admin" && datas.products_speciality_status_update == "1"){
			Object.assign(datas, { 'products_speciality_status_admin' : 2 });
		}else if(check_datas_result.user_role == "admin"){
			Object.assign(datas, { 'products_speciality_status_update' : 1 });
		}
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, "Lỗi xoá status, liên hệ admin","Lỗi xoá status, liên hệ admin" );
			res.send({ "error" : "3.2_controller_product_speciality->update", "message": error_send } ); 
			return;
	}
	
	//@
	//@	
	//@
	//@	
	//=======================
	//=======================
	//=====/header check ====
	//@
	//	
	//@
	//@


	try {
		let data_check = default_field.check_datas(datas);
		if(data_check != 0){
			res.send({"error" : "1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_1", "message" : error_send  } );
	}			

	
	//@
	//@
	//@
	try {
		models_products_spaciality.update_products_spaciality(datas,product_id,cat_string, option_string).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn, error, message_error);
			res.send({ "error" : "1.4.controllers-product-speciality->update ", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "45.controller_product_speciality->update", "message": error_send } ); 
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
async function insert_products_spaciality(req, res, next) {
	let datas = req.body.datas;
	let cat_string = req.body.cat_string;
	let option_string = req.body.option_string;
	let token = req.headers['token'];
	

	//res.send(datas);
	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		res.redirect("/login");
		return;
	}
	//
	//@@
	//@@
	let datas_check = {
		"token":token,
		"store_id" : datas.products_speciality_store_id
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
		res.send({ "error" : "2.1.controllers_product_speciality(app)->insert", "message": error_send } ); 
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
		res.send({ "error" : "2.2.controllers_product_speciality(app)->insert", "message": error_send } ); 
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
		res.send({ "error" : "2.3.controllers_product_speciality(app)->insert", "message": error_send } ); 
		return;			
	}
	
	
	//=======================
	//=======================
	//=====/header check ====
	//@
	//	
	
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
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "2.4.controllers_product_speciality(app)->insert", "message": error_send } ); 
		return;	
	}			
	//@	
	//@	
	//@	
	//@
	try {
		models_products_spaciality.insert_products_spaciality(datas_assign,cat_string,option_string).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares.show_error( evn, error,message_error );
			res.send({ "error" : "2.5.controllers_product_speciality(app)", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "2.6.controllers_product_speciality(app)->insert", "message": error_send } ); 
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
async function delete_products_spaciality(req, res, next) {
	let product_id = req.params.product_id;
	let token = req.headers['token'];
	//
	//@@
	//@@
	let datas_check = {
		"token":token,
		'product_id':product_id
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
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại" );
		res.send({ "error" : "1.1.controllers-product-speciality->delete ", "message": error_send } ); 
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
		var error_send = ojs_shares.show_error( evn, check_datas_result.error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao táo lại" );
		res.send({ "error" : "1.2.controllers-product-speciality->delete ", "message": error_send } ); 
		return;			
	}
	


	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_product != "1" && check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "1.3.controllers-product-speciality->delete ", "message": error_send } ); 
		return;			
	}	

	//@
	//@
	try {
		models_products_spaciality.delete_products_spaciality(product_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, message_error);
			res.send({ "error" : "1.4.controllers-product-speciality->delete ", "message": error_send } ); 
			return;		
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "1.5.controllers-product-speciality->delete ", "message": error_send } ); 
		return;		
	}	

}





/*
@@@@
@@@@@
@@@@@
@@@@@
*/
module.exports = { 
	get_all_products_spaciality,
	get_one_products_spaciality,
	update_products_spaciality,
	insert_products_spaciality,
	delete_products_spaciality,
	search
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/
























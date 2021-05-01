/*
@@@@
@@@@@
@@@@@
@@@@@
*/
var express = require('express');
var router = express.Router();

const models_category_news_general = require('../models/models-category-news-general');

const default_field = require('../const-tables/const-tables-category-news-general');

//@
//@
//configs/config
//function share
const ojs_configs = require('../../../configs/config');
const ojs_shares = require('../../../models/ojs-shares');



const jwt    = require('jsonwebtoken');

const models_news_general = require('../models/models-news-general');
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
async  function get_all_category_news_general(req, res, next) {
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_category_news_general.get_all_category_news_general().then( results => {
			
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
async  function get_one_category_news_general(req, res, next) {
	let category_news_id = req.params.category_news_id;
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_category_news_general.get_one_category_news_general(category_news_id).then( results => {
			
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
//
async  function update_category_news_general(req, res, next) {
	let datas = req.body.datas;
	let category_news_id = req.params.category_news_id;
	let token = req.headers['token'];
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
		//////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "1.1.controllers-category-news-speciality->update ", "message": error_send } ); 
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
		//////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "1.2.controllers-category-news-speciality->update ", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "1.3.controllers-category-news-speciality->update ", "message": error_send } ); 
		return;			
	}	
	

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
	try {
		models_category_news_general.update_category_news_general(datas,category_news_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var evn = ojs_configs.evn;
			//////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "Lỗi update datas" );
			res.send({ "error" : "1.33.controllers-category-news-speciality->update ", "message": error_send } ); 
			return;		
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "Lỗi update datas" );
			res.send({ "error" : "1.34.controllers-category-news-speciality->update ", "message": error_send } ); 
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
async  function insert_category_news_general(req, res, next) {
	let datas = req.body.datas;
	let token = req.headers['token'];
	//
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
		//////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "1.1.controllers-category-news-speciality->insert ", "message": error_send } ); 
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
		//////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "1.2.controllers-category-news-speciality->insert ", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "1.3.controllers-category-news-speciality->insert ", "message": error_send } ); 
		return;			
	}	
	
	//@@
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
		//////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi không xác định , liên hệ admin" );
		res.send({ "error" : "1.33.controllers-category-news-speciality->insert ", "message": error_send } ); 
		return;	
	}			
	
	//res.send(datas_assign);
	
	
	//@
	try {
		models_category_news_general.insert_category_news_general(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var evn = ojs_configs.evn;
			//////evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "Lỗi không xác định , liên hệ admin" );
			res.send({ "error" : "1.34.controllers-category-news-speciality->insert ", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "Lỗi không xác định , liên hệ admin" );
		res.send({ "error" : "1.35.controllers-category-news-speciality->insert ", "message": error_send } ); 
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
async function delete_category_news_general(req, res, next) {
	let category_news_id = req.params.category_news_id;
	let token = req.headers['token'];
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
		//////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "1.1.controllers-category-news-speciality->delete ", "message": error_send } ); 
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
		//////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "1.2.controllers-category-news-speciality->delete ", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "1.3.controllers-category-news-speciality->delete ", "message": error_send } ); 
		return;			
	}	
	
	//@
	try {
		models_category_news_general.delete_category_news_general(category_news_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn, error, "Lỗi delete datas" );
			res.send({ "error" : "1.33.controllers-category-news-speciality->delete ", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn, error, "Lỗi delete datas" );
			res.send({ "error" : "1.333.controllers-category-news-speciality->delete ", "message": error_send } ); 
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
		models_category_news_general.search(datas).then( results => {
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
	get_all_category_news_general,
	get_one_category_news_general,
	update_category_news_general,
	insert_category_news_general,
	delete_category_news_general,
	search
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/
























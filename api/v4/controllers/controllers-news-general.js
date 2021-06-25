
/*


* 1. [insert_news_general]

* 2. [get_all_news_general]

* 3. [get_one_news_general]

* 4. [update_news_general]

* 5. [delete_news_general]

* 6. [search]




*/

//@
//@
//@
//@ app express
const express = require('express');
const router = express.Router();

//@
//@
//@
//npm exstands
const jwt = require('jsonwebtoken');
const md5 = require('md5');

//database model
const default_field = require('../const-tables/const-tables-news-general');


//@
//@
//configs/config
const ojs_configs = require('../../../configs/config');



//@
//@
//function share
const ojs_shares_show_errors = require('../../../models/ojs-shares-show-errors');
const ojs_shares_others = require('../../../models/ojs-shares-others');
const ojs_shares_owner = require('../function-shares/ojs-shares-owner');




//@
//@
//model
const models_news_general = require('../models/models-news-general');





//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////





//@
//@
//@
//@
//@
//@
//@ * 1. [insert_news_general]
async function insert_news_general(req, res, next) {
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];		
		var cat_string = req.body.cat_string;
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controllers-news-general->insert->request->error_number : 1", "message": error_send } ); 
		return;	
	}		
	
	
	//res.send([datas,cat_string,option_string]);
	//return;
	
	
	//@
	//@
	//@
	//@
	try{
		var datas_check = {
			"token":token
		}		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "controllers-news-general->insert-> check owner->number_error : 1 ", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role == "admin"){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "controllers-news-general->insert-> check owner->number_error : 2 ", "message": error_send } ); 
		return;			
	}		
	
	
	
	
	/////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////
	
	
	
	

	//@@
	let datas_assign;
	try {
		//gop voi data drfault field in mysql database
		datas_assign = Object.assign(default_field.default_fields, datas);
		
		//neu data không hợp lệ thì return loi;
		var data_check = default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({"error" : "1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi check data" );
		res.send({ "error" : "controllers-news-general->insert-> check data ->number_error : 1 ", "message": error_send } ); 
		return;	
	}			
	
	
	//@
	try {
		models_news_general.insert_news_general(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
			
		}, error => {
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi insert datas" );
			res.send({ "error" : "controllers-news-general->insert-> run model ->number_error : 1 ", "message": error_send } ); 
			return;		
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi insert datas" );
			res.send({ "error" : "controllers-news-general->insert-> run model ->number_error : 2", "message": error_send } ); 
			return;		
	}	
}
//@
//@ end of * 1. [insert_news_general]











//@@
//get all category chung
function get_all_news_general(req, res, next) {
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_news_general.get_all_news_general().then( results => {
			
			res.send( {"error" : "", "datas" : results} );
			
		}, error => {

			let error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_2", "message" : error_send  } );	

		});
	}
	catch(error){
		let error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
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
function get_one_news_general(req, res, next) {
	let news_id = req.params.news_id;
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_news_general.get_one_news_general(news_id).then( results => {
			
			res.send( {"error" : "", "datas" : results} );
			
		}, error => {

			let error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_api_2", "message" : error_send  } );	

		});
	}
	catch(error){
		let error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
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
async function update_news_general(req, res, next) {
	let datas = req.body.datas;
	let news_id = req.params.news_id;
	let token = req.headers['token'];
	//@@
	//@@lấy version
	let datas_check = {
		"token":token
	}
	//@
	//@
	let check_datas_result;	
	try{
		check_datas_result = await ojs_shares_owner.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "1.controllers_news_general->update", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.controllers_news_general->update", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "22.controllers_news_general->update", "message": error_send } ); 
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
		let error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_1", "message" : error_send  } );
	}			

	//@
	try {
		models_news_general.update_news_general(datas,news_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update datas" );
			res.send({ "error" : "122.controllers_news_general->update", "message": error_send } ); 
			return;		
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update datas" );
		res.send({ "error" : "322.controllers_news_general->update", "message": error_send } ); 
		return;		
	}	
}





//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
async function delete_news_general(req, res, next) {
	let news_id = req.params.news_id;
	let token = req.headers['token'];
	//
	//@@
	//@@lấy version
	let datas_check = {
		"token":token
	}
	//@
	//@
	let check_datas_result;	
	try{
		check_datas_result = await ojs_shares_owner.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "1.controllers_news_general->delete", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.error != ""){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.controllers_news_general->delete", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	//@neu phan quyen khong du thi tro ra login
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "22.controllers_news_general->delete", "message": error_send } ); 
		return;			
	}	

	try {
		models_news_general.delete_news_general(news_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete datas" );
			res.send({ "error" : "12.controllers_news_general->delete", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete datas" );
		res.send({ "error" : "32.controllers_news_general->delete", "message": error_send } ); 
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
		models_news_general.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
		}, error => {
			let error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl__api2", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
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
	get_all_news_general,
	get_one_news_general,
	update_news_general,
	insert_news_general,
	delete_news_general,
	search
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/
























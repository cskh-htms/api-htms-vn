/*

* -1. [insert_category_news_general] 

* 2. [get_all__category_news_general]

* 3. [get_one__category_news_general]

* 4. [update__category_news_general]

* 5. [delete__category_news_general]

* 6. [search]

*/


//@ app express
var express = require('express');
var router = express.Router();

//@
//@
//@
//npm exstands
const jwt = require('jsonwebtoken');
const md5 = require('md5');

//database fileds
const default_field = require('../const-tables/const-tables-category-news-general');


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
const models_category_news_general = require('../models/models-category-news-general');




/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////



//@
//@
//@
//@
//@
//@
//@ *  1. [insert_category_news_general] 
async  function insert_category_news_general(req, res, next) {
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		//res.send([datas,token]);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controllers-category-news-speciality->insert_category_general_speciality->request->error_number : 1", "message": error_send } ); 
		return;	
	}	



	//res.send(datas_check );	
	//return;	 
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
		res.send({ "error" : "controllers-category-news-speciality->insert-> check owner->number_error : 1 ", "message": error_send } ); 
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
		res.send({ "error" : "controllers-category-news-speciality->insert-> check owner->number_error : 2 ", "message": error_send } ); 
		return;			
	}	

	//@
	//@
	//@
	//@ check data dau vao
	try {
		var  datas_assign;
		//gop voi data drfault field in mysql database
		datas_assign = Object.assign(default_field.default_fields, datas);
		
		//neu data không hợp lệ thì return loi;
		var data_check = await default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({"error" : "1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi không xác định , liên hệ admin" );
		res.send({ "error" : "controllers-category-news-speciality->insert-> check data ->number_error : 1", "message": error_send } ); 
		return;	
	}			
	
	//res.send(datas_assign);
	
	
	//@
	try {
		models_category_news_general.insert_category_news_general(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var message_error = default_field.get_message_error(error);
			
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "controllers-category-news-speciality->insert-> run ->number_error : 1", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi không xác định , liên hệ admin" );
		res.send({ "error" : "controllers-category-news-speciality->insert-> run ->number_error : 2", "message": error_send } ); 
		return;	
	}	
}
//@
//@ * end of   1. [insert_category_news_general] 







//@
//@
//@
//@
//@
//@
//@ *  2. [get_all_category_news_general] 
async  function get_all_category_news_general(req, res, next) {
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-category-news-speciality->get_all->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	//@ kiểm tra phân quyền 
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
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-category-news-speciality->check-role->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	if(check_datas_result.user_role == "admin" 
	|| check_datas_result.user_role == "supper-job"   
	|| check_datas_result.user_role == "default"
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-category-news-speciality->get_all->check-role -> error_number : 3", "message": error_send } ); 
		return;				
	}
	
	
	//@
	//@
	//@
	//@ run model	
	try {
		models_category_news_general.get_all_category_news_general().then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi lấy data news" );
			res.send({ "error" : "controllers-category-news-speciality->get_all->run -> error_number : 1", "message": error_send } ); 
			return;		
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi lấy data news" );
		res.send({ "error" : "controllers-category-news-speciality->get_all->run -> error_number : 2", "message": error_send } ); 
		return;	
	}	
}
//@
//@ * end of  2. [get_all_category_news_general] 





//@
//@
//@
//@
//@
//@ * 3. [get_one_category_news_general] 
async  function get_one_category_news_general(req, res, next) {
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var category_news_id = req.params.category_news_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-category-news-speciality->get_one_category_general_speciality->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
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
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-category-news-speciality->get_one_category_general_speciality->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.user_role == "default" 
	|| check_datas_result.user_role == "supper-job"){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-category-news-speciality->get_one_category_general_speciality->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}		
	
	

	//@
	//@
	//@
	//@
	//@
	//@ run model	
	try {
		models_category_news_general.get_one_category_news_general(category_news_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";;			
			let error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "controllers-category-news-speciality->model-run -> error_number : 1", "message" : error_send  } );	
			return;
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;			
			let error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "controllers-category-news-speciality->model-run -> error_number : 2", "message" : error_send  } );	
			return;
	}	
}
//@
//@ * end of  3. [get_one_category_news_general] 







//@
//@
//@
//@
//@
//@ * 4. [update_category_news_general] 
async  function update_category_news_general(req, res, next) {
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var category_news_id = req.params.category_news_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-category-news-speciality->update_category_general_speciality->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
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
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-category-news-speciality->update_category_general_speciality->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-category-news-speciality->update_category_general_speciality->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}			
	
	
	
	
	
	
	/////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////	
	
	
	
	//@
	//@
	//@
	//@
	//@ check data
	try {
		let data_check = default_field.check_datas(datas);
		if(data_check != 0){
			res.send({"error" : "1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi check data" );
		res.send({ "error" : "controllers-category-news-speciality->update->check-data-> error_number : 1", "message": error_send } ); 
		return;
	}			



	//@
	//@
	//@
	//@
	//@ run model
	try {
		models_category_news_general.update_category_news_general(datas,category_news_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update datas" );
			res.send({ "error" : "controllers-category-news-speciality->update->run-> error_number : 1", "message": error_send } ); 
			return;		
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update datas" );
		res.send({ "error" : "controllers-category-news-speciality->update->run-> error_number : 2", "message": error_send } ); 
		return;		
	}	
}
//@
//@ end of  * 4. [update_category_news_general] 








//@
//@
//@
//@
//@
//@  * 5. [delete_category_news_general] 
async function delete_category_news_general(req, res, next) {
	//@
	//@	get datas req
	try {
		var category_news_id = req.params.category_news_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-category-news-speciality->delete->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
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
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-category-news-speciality->delete_category_general_speciality->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	//@
	//@	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-category-news-speciality->delete_category_general_speciality->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}		
		
	
	
	
	
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	
	
	
	
	
	
		
	//@
	//@
	//@
	//@
	//@
	try {
		models_category_news_general.delete_category_news_general(category_news_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete datas" );
			res.send({ "error" : "1.33.controllers-category-news-speciality->delete ", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete datas" );
			res.send({ "error" : "1.333.controllers-category-news-speciality->delete ", "message": error_send } ); 
			return;	
	}	
}
//@
//@ end of  * 5. [delete_category_news_general] 





//@
//@
//@
//@
//@ * 6. [search] 
async  function search(req, res, next) {
	//@
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-category-news-speciality->search->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	

	//@
	//@
	//@
	//@ kiểm tra phân quyền 
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
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-category-general-speciality->search->check-role -> error_number : 2", "message": error_send } ); 
		return;			
	}	
	
	
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.user_role == "default" 
	|| check_datas_result.user_role == "supper-job"){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-category-news-speciality->search->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}		
	
	
	//@
	//@
	//@
	//@
	//@
	//@ run model	
	try {
		models_category_news_general.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search datas" );
			res.send({ "error" : "controllers-category-news-speciality->search->model-run -> error_number : 1", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search datas" );
		res.send({ "error" : "controllers-category-news-speciality->search->model-run -> error_number : 2", "message": error_send } ); 
		return;	
	}

}
//@
//@ end of * 6. [search] 










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
























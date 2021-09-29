
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
		res.send({ "error" : "1", "position":"ctl-news-general->insert", "message": error_send } );
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
		res.send({ "error" : "2", "position":"ctl-news-general->insert", "message": error_send } ); 
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
		res.send({ "error" : "3", "position":"ctl-news-general->insert", "message": error_send } );
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
			res.send({ "error" : "4", "position":"ctl-news-general->insert", "message": data_check } );
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi check data" );
		res.send({ "error" : "5", "position":"ctl-news-general->insert", "message": error_send } );
		return;	
	}			
	
	
	//@
	try {
		models_news_general.insert_news_general(datas_assign,cat_string).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
			
		}, error => {
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "6", "position":"ctl-news-general->insert", "message": error_send } ); 
			return;
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi insert datas" );
			res.send({ "error" : "7", "position":"ctl-news-general->insert", "message": error_send } );
			return;		
	}	
}
//@
//@ end of * 1. [insert_news_general]










//@
//@
//@
//@
//@
//@
//@ * 2. [get_all_news_general]
async function get_all_news_general(req, res, next) {
	//@
	//@
	//@
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-news-general->get_all", "message": error_send } ); 
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
		res.send({ "error" : "2", "position":"ctl-news-general->get_all", "message": error_send } ); 
		return;			
	}
	
	
	if(
	check_datas_result.user_role == "admin" 
	|| check_datas_result.user_role == "supper-job"  
	|| check_datas_result.user_role == "default" 
	|| check_datas_result.user_role == "customer" 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-news-general->get_all", "message": error_send } ); 
		return;				
	}
	


	//@
	//@
	//@
	//@ run
	try {
		models_news_general.get_all_news_general().then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data" );
			res.send({ "error" : "4", "position":"ctl-news-general->get_all", "message": error_send } ); 
			return;		
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data" );
		res.send({ "error" : "5", "position":"ctl-news-general->get_all", "message": error_send } );  
		return;		
	}	
}
//@
//@ end of * 2. [get_all_news_general]








//@
//@
//@
//@
//@
//@
//@  3. [get_one_news_general]
async function get_one_news_general(req, res, next) {
	//@
	//@
	//@
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var news_id = req.params.news_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-news-general->get_one", "message": error_send } ); 
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
		res.send({ "error" : "2", "position":"ctl-news-general->get_one", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "default" 	
	|| check_datas_result.user_role == "customer" 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-news-general->get_one", "message": error_send } ); 
		return;			
	}			
	
	
	//@
	//@
	//@
	//@
	//@
	//@ run	
	try {
		models_news_general.get_one_news_general(news_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get");
			res.send({ "error" : "4", "position":"ctl-news-general->get_one", "message": error_send } );
			return;			
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get");
		res.send({ "error" : "5", "position":"ctl-news-general->get_one", "message": error_send } ); 
		return;
	}	
}
//@
//@ end of  3. [get_one_news_general]













//@
//@
//@
//@
//@
//@
//@  3. [update_news_general]
async function update_news_general(req, res, next) {
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var news_id = req.params.news_id;
		var token = req.headers['token'];		
		var cat_string = req.body.cat_string;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-news-general->update", "message": error_send } ); 
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
		res.send({ "error" : "2", "position":"ctl-news-general->update", "message": error_send } );  
		return;			
	}
	
	
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-news-general->update", "message": error_send } ); 
		return;			
	}		
	

	
		
	
	
	
	//////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
	
	
	
	
	//@
	//@
	//@
	//@
	//@ check datas
	try {
		let data_check = default_field.check_datas(datas);
		if(data_check != 0){
			res.send({ "error" : "4", "position":"ctl-news-general->update", "message": data_check  } ); 
			return;
		}
	}
	catch(error){
		let error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi check datas" );
		res.send( { "error": "controllers_news_general->update->check data -> error_number : 2", "message" : error_send  } );
	}			



	//@
	//@
	//@
	//@
	//@ run
	try {
		models_news_general.update_news_general(datas,news_id,cat_string).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "5", "position":"ctl-news-general->update", "message": error_send } ); 
			return;		
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "6", "position":"ctl-news-general->update", "message": error_send } ); 
		return;		
	}	
}
//@ end of
//@  3. [update_news_general]









//@
//@
//@
//@
//@
//@
//@  4. [delete_news_general]
async function delete_news_general(req, res, next) {
	//@
	//@
	//@
	//@	get datas req
	try {
		var news_id = req.params.news_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-news-general->delete", "message": error_send } ); 
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
		res.send({ "error" : "2", "position":"ctl-news-general->delete", "message": error_send } ); 
		return;			
	}
	
	
	

	
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữu và option chưa pusplish
	if(check_datas_result.user_role == "admin" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( 
			evn, "Bạn không đủ quyền thao tác, hoặc products đã puplish", 
			"Bạn không đủ quyền thao tác,hoặc option đã puplish" );
			
			res.send({ "error" : "3", "position":"ctl-news-general->delete", "message": error_send } ); 
		return;			
	}			
	
	//@
	//@
	//@
	//@
	//@ run
	try {
		models_news_general.delete_news_general(news_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete datas" );
			res.send({ "error" : "4", "position":"ctl-news-general->delete", "message": error_send } );  
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete datas" );
		res.send({ "error" : "5", "position":"ctl-news-general->delete", "message": error_send } ); 
		return;	
	}	
}
//@ end of 
//@  4. [delete_news_general]











//@
//@
//@
//@
//@
//@
//@  4. [search]
async  function search(req, res, next) {
	//@
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		//@
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-news-general->search", "message": error_send } ); 
		return;			
	}	

	//res.send(datas);
	//return;


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
		res.send({ "error" : "2", "position":"ctl-news-general->search", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@ nếu không phải là admin thì out
	if(check_datas_result.user_role == "admin" 
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "default" 
	|| check_datas_result.user_role == "customer" 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, 
		"Bạn không đủ quyền thao tác, chỉ có dmin mới search all", 
		"Bạn không đủ quyền thao tác, chỉ có dmin mới search all" );
		res.send({ "error" : "3", "position":"ctl-news-general->search", "message": error_send } ); 
		return;	
	}		
	
	
	//res.send([check_datas_result]);
	//return;
	//@
	//@
	//@
	//@
	//@
	//@ run
	try {
		models_news_general.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "4", "position":"ctl-news-general->search", "message": error_send } );  
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "5", "position":"ctl-news-general->search", "message": error_send } ); 
		return;	
	}

}
//@ end of 
//@  4. [search]













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
























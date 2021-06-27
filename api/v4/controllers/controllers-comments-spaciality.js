


/*



* 1. [insert_comments_spaciality]

* 2. [get_all_comments_spaciality]

* 3. [get_one_comments_spaciality]

* 4. [update_comments_spaciality]

* 5. [delete_comments_spaciality]

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
const default_field = require('../const-tables/const-tables-comments-spaciality');


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
const models_comments_spaciality = require('../models/models-comments-spaciality');





/////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////





//@
//@
//@
//@
//@
//@
//@
//@ 1. [insert_comments_spaciality]
async  function insert_comments_spaciality(req, res, next) {
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		
		//@
		//@
		//* nếu chưa có mã cữa hàng thì out
		if(!datas.comments_speciality_user_id){
			res.send({ "error" : "1" , "message" : " Chưa nhập mã khách hàng (user_id) " });
			return;
		}
		if(!datas.comments_speciality_product_id){
			res.send({ "error" : "1" , "message" : " Chưa nhập mã sản phẩm (user_id) " });
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controllers-comments-speciality->insert->request->error_number : 1", "message": error_send } ); 
		return;	
	}	



	//res.send( [datas,token] );	
	//return;	 
	
	
	
	//@
	//@
	//@
	//@
	try{
		var datas_check = {
			"token":token,
			"user_id" : datas.comments_speciality_user_id
		}		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "controllers-comments-speciality->insert-> check owner->number_error : 1 ", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_user == "1" ||  check_datas_result.user_role == "admin"){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : " controllers-comments-general-speciality->insert-> check owner->number_error : 2 ", "message": error_send } ); 
		return;			
	}		
		
	
	
	
	
	
	
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	
	

	
	
	
	//@
	//@
	//@
	//@	
	//@ check datas
	var datas_assign;
	try {
		//gop voi data drfault field in mysql database
		datas_assign = Object.assign(default_field.default_fields, datas);
		
		//neu data không hợp lệ thì return loi;
		let data_check = default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({"error" : " controllers-comments-speciality->insert-> check datas->number_error : 1 ", "message" : data_check } );
			return;
		}
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "controllers-comments-speciality->insert-> check datas->number_error : 2 ", "message" : error_send  } );
	}			
	
	//res.send(datas_assign);
	
	
	//@
	//@
	//@
	//@ run
	try {
		models_comments_spaciality.insert_comments_spaciality(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "controllers-comments->insert->model-run->number_error : 1 ", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert stores , Liên hệ admin" );
		res.send({ "error" : " controllers-comments->insert->model-run->number_error : 2 ", "message": error_send } ); 
		return;
	}	
}
//@ end of
//@ 1. [insert_comments_spaciality]




//@ 
//@ 
//@ 
//@ 
//@ 
//@ 2. [get_all_comments_spaciality]
async  function get_all_comments_spaciality(req, res, next) {
	// lấy data request
	try {
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controllers-comments->get_all->request->error_number : 1", "message": error_send } ); 
		return;	
	}	
	
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
		res.send({ "error" : "controllers-comments->get_all-> check owner->number_error : 1 ", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	//@
	//kiem tra role
	if(
	check_datas_result.user_role == "admin"
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "default" 	
	){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "controllers-comments->get_all-> check owner->number_error : 2 ", "message": error_send } ); 
		return;			
	}		
	
	
	
	
	
	/////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////
	
	
	
	
	//@
	//@
	//@
	//@
	//@ run
	try {
		models_comments_spaciality.get_all_comments_spaciality().then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
			
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data reviews" );
			res.send({ "error" : "controllers-comments-speciality->get_all->run -> error_number : 1", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data reviews" );
		res.send({ "error" : "controllers-comments-speciality->get_all->run -> error_number : 2", "message": error_send } ); 
		return;	
	}	
}
//@  end of 
//@ 2. [get_all_comments_spaciality]







//@ 
//@ 
//@ 
//@ 
//@ 
//@ 
//@ 3. [get_one_comments_spaciality]
async  function get_one_comments_spaciality(req, res, next) {
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var comment_id = req.params.comment_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-comments->get_one->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"comment_id":comment_id
		}		
		
		var check_datas_result;		
		
		//res.send(datas_check);
		//return;			
		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
		
		//res.send(check_datas_result);
		//return;			
		
		
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-comments->get_one->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	//res.send(check_datas_result);
	//return;	
	
	
	//@
	//@
	//@ nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_comment == "1" 
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "default" 	
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-comments->get_one->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}	
	
	
	
	///////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////
	
	
	
	
	
	//@
	//@
	//@
	//@
	//@
	//@ run
	try {
		models_comments_spaciality.get_one_comments_spaciality(comment_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
			res.send({ "error" : "controllers-comments->get_one->model-run -> error_number : 1", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
		res.send({ "error" : "controllers-comments->get_one->model-run -> error_number : 2", "message": error_send } ); 
		return;	
	}	
}
//@ end of
//@ 3. [get_one_comments_spaciality]





//@
//@
//@
//@
//@
//@
//@
//@ 4. [update_comments_spaciality]
async function update_comments_spaciality(req, res, next) {
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var comment_id = req.params.comment_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-comments->update->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"comment_id":comment_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-comments->update->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	
	
	
	//@
	//@
	//@
	// lấy thông tin optiton để kiểm tranh option đã pushlish chưa
	try {
		//@
		//@
		var push_check = await models_comments_spaciality.get_one_comments_spaciality(comment_id);
		//res.send(push_check);
		//return;	
		//res.send(push_check);
		//return;		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check.error, "lỗi truy xuất database reviews, liên hệ admin dala" );
			res.send( { "error": "controllers-comment-speciality->check-pushplic -> model-run -> error_number : 1", "message" : error_send  } );
			return;			
		}
		
		//res.send(push_check);
		//return;				
		
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check.length > 0  && push_check[0].comments_speciality_status_admin  == "1"){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, " Bình luận đã push không chỉnh sữa " ," Đánh giá đã push không chỉnh sữa " );
			res.send( { "error": "controllers-comment-speciality->check-pushplic -> model-run -> error_number : 2", "message" : error_send  } );	
			return;
		}	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, " lỗi truy xuất database reviews " );
		res.send( { "error": "controllers-comment-speciality->check-pushplic -> update -> error_number : 3", "message" : error_send  } );
		return;
	}		
	
	

	
	//@
	//@
	//@
	//@
	//@
	//@	
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_comment == "1" 
	
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-comments->update->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}		
	
	
	
	
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
	

	
	

	//@
	//@
	//@
	//@
	//@	
	//@ run
	try {
		models_comments_spaciality.update_comments_spaciality(datas,comment_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "controllers-commnets-speciality->update->model-run -> error_number : 1", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "controllers-comment-speciality->update->model-run -> error_number : 2", "message": error_send } ); 
		return;	
	}	
}
//@ end of 
//@ 4. [update_comments_spaciality]







//@
//@
//@
//@
//@
//@ * 5. [delete_comments_spaciality]
async  function delete_comments_spaciality(req, res, next) {
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var comment_id = req.params.comment_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-comments->delete->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"comment_id":comment_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-comments->delete->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	
	
	
	
	
	
	//@
	//@
	//@
	// lấy thông tin optiton để kiểm tranh option đã pushlish chưa
	try {
		//@
		//@
		var push_check = await models_comments_spaciality.get_one_comments_spaciality(comment_id);
		//res.send(push_check);
		//return;	
		//res.send(push_check);
		//return;		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check.error, "lỗi truy xuất database reviews, liên hệ admin dala" );
			res.send( { "error": "controllers-comment-speciality->check-pushplic -> delete -> error_number : 1", "message" : error_send  } );
			return;			
		}
		
		//res.send(push_check);
		//return;				
		
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check.length > 0  && push_check[0].comments_speciality_status_admin  == "1"){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, " Bình luận đã push không xoá được " ," Đánh giá đã push không xoá được " );
			res.send( { "error": "controllers-comment-speciality->check-pushplic -> delete -> error_number : 2", "message" : error_send  } );	
			return;
		}	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, " lỗi truy xuất database reviews " );
		res.send( { "error": "controllers-comment-speciality->check-pushplic -> delete -> error_number : 3", "message" : error_send  } );
		return;
	}		
		
	
	

	
	//@
	//@
	//@
	//@
	//@
	//@	
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_comment == "1" 
	
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-comments->delete->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}		
	
	
	
	
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
	

	
	//@
	try {
		models_comments_spaciality.delete_comments_spaciality(comment_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "controllers-commnet-speciality-speciality->delete->run -> error_number : 1 ", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "controllers-commnet-speciality-speciality->delete->run -> error_number : 2", "message": error_send } ); 
		return;	
	}	
}
//@ end of 
//@ * 5. [delete_comments_spaciality]
















//@
//@
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
		//@
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-comments-speciality>search->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	



	//@
	//@
	//@ kiểm tra xem có phải search option theo id
	//@ nếu search theo id thì phải chủ sở hữu id mới dc searhc
	//@ nếu không pahỉ search theo id thì phải là admin mới dc search
	try{
		var check_condition_id = 0;
		var comment_id = 0;
		
		if ( datas.condition  && typeof datas.condition !== 'undefined' ){
			
			for ( x in datas.condition){
				if(datas.condition[x].hasOwnProperty('where') && datas.condition[x].where.length > 0){
					
					for ( z in datas.condition[x].where){
						if( datas.condition[x].where[z].hasOwnProperty('field')  
							&& datas.condition[x].where[z].field == "comments_speciality_ID"  
							&& datas.condition[x].where[z].hasOwnProperty('compare')    
							&& datas.condition[x].where[z].compare == "="  
						){
							check_condition_id = 1;
							comment_id = datas.condition[x].where[z].value;
						}
					}	
				}
			}
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-comments-speciality->search->check_condition_id -> error_number : 2", "message": error_send } ); 
		return;			
	}		
	
	//@
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		
		if(check_condition_id == 1){
			var datas_check = {
				"token":token,
				"comment_id":comment_id
			}	
		}else{
			var datas_check = {
				"token":token
			}
		}			
		
		//res.send(datas_check);
		//return;		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-comments-speciality->search->check-role -> error_number : 2", "message": error_send } ); 
		return;			
	}


	//res.send(check_datas_result);
	//return;



	//@
	//@
	//@ nếu không có lộc theo cat id thì phải là admin
	if(check_condition_id == 0){
		if(check_datas_result.user_role == "admin" 
		|| check_datas_result.user_role == "supper-job" 
		|| check_datas_result.user_role == "default"
		){}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác, chỉ có dmin mới search all", "Bạn không đủ quyền thao tác, chỉ có dmin mới search all" );
			res.send({ "error" : "controllers-comments-speciality->search->check_condition_id -> error_number : 1", "message": error_send } ); 
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_comment == "1" 
		||  check_datas_result.user_role == "admin"   
		|| check_datas_result.user_role == "default"
		|| check_datas_result.user_role == "supper-job"
		){ }else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user", "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "controllers-comments-speciality->search->check_condition_id -> error_number : 2", "message": error_send } ); 
			return;			
		}			
	}		
	
	
	
	
	
	///////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////
	
	
	
	
	//@
	//@
	//@
	//@
	//@ run
	try {
		models_comments_spaciality.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "controllers-comment-speciality->search_all->run model -> error_number : 1", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "controllers-comment-speciality->search_all->run model -> error_number : 2", "message": error_send } ); 
		return;	
	}

}
//@ end of
//@ * 6. [search]













/*
@@@@
@@@@@
@@@@@
@@@@@
*/
module.exports = { 
	get_all_comments_spaciality,
	get_one_comments_spaciality,
	update_comments_spaciality,
	insert_comments_spaciality,
	delete_comments_spaciality,
	search
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/
























/*




//@* 1. [insert_option_speciality]

//@* 2. [get_all_option_speciality]

//@* 3. [get_one_option_speciality]

//@* 4. [update_option_speciality]

//@* 5. [delete_option_speciality]

* 6. [search]

* 7. [search_count_product_by_option]



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
const default_field = require('../const-tables/const-tables-option-speciality');


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
const models_option_speciality = require('../models/models-option-speciality');







//@
//@
//@
//@
//@* 1. [insert_option_speciality]
async function insert_option_speciality(req, res, next) {
	
	
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
		if(!datas.options_product_speciality_stores_id){
			res.send({ "error" : "1" , "message" : " Chưa nhập mã cửa hàng (store_id) " });
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controllers-option--speciality->insert->request->error_number : 1", "message": error_send } ); 
		return;	
	}	



	//res.send(datas_check );	
	//return;	 
	try{
		var datas_check = {
			"token":token,
			"store_id": datas.options_product_speciality_stores_id
		}		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "controllers-option-speciality->insert-> check owner->number_error : 1 ", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_store == "1" ||  check_datas_result.user_role == "admin"){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "controllers-category-general-speciality->insert-> check owner->number_error : 2 ", "message": error_send } ); 
		return;			
	}		
	
	
	
	//@
	//@
	//@
	//@ check data type
	try {
		var datas_assign;
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
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi check data type, vui lòng liên hệ admin " );
		res.send({ "error" : "controllers-options-speciality->insert->error_nymber: 3 ", "message": error_send } ); 
		return;	
	}			
	
	

	//@
	//@
	//@
	//@ run model
	try {
		models_option_speciality.insert_option_speciality(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			
			let message_error = default_field.get_message_error(error);
			
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "controllers-options-speciality->insert->run-model->error-number : 1 ", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "controllers-options-speciality->insert->run-model->error-number : 2", "message": error_send } ); 
		return;	
	}	
}

//@ end of  * 1. [insert_option_speciality]



//@
//@
//@
//@
//@* 2. [get_all_option_speciality]
async function get_all_option_speciality(req, res, next) {
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
		res.send({ "error" : "controllers-option-speciality->get_all->get req -> error_number : 1", "message": error_send } ); 
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
		res.send({ "error" : "controllers-option-speciality->check-role->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	if(check_datas_result.user_role == "admin" 
	|| check_datas_result.user_role == "supper-job"   
	|| check_datas_result.user_role == "default" 
	|| check_datas_result.user_role == "customer" 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-option-speciality->get_all->check-role -> error_number : 3", "message": error_send } ); 
		return;				
	}
	
	
	//@
	//@
	//@
	//@ ren model
	try {
		models_option_speciality.get_all_option_speciality().then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, " Lỗi lấy data option, liên hệ admin " );
			res.send({ "error" : "controllers-option-speciality->get_all->check-role -> error_number : 1", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data option, liên hệ admin " );
		res.send({ "error" : "controllers-option-speciality->get_all->check-role -> error_number : 2", "message": error_send } ); 
		return;	
	}	
}
//@* end of 2. [get_all_option_speciality]








//@
//@
//@
//@* 3. [get_one_option_speciality]
async function get_one_option_speciality(req, res, next) {
	//@
	//@
	//@
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var option_id = req.params.option_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-option-speciality->get_one->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	
	
	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"option_id":option_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
		//res.send(check_datas_result);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-option-speciality->get_one->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_option == "1" 
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "customer" 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-option-speciality->get_one->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}	
	


	
	//@
	//@
	//@
	//@
	try {
		models_option_speciality.get_one_option_speciality(option_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn,error, " Lỗi lấy data options, liên hệ admin " );
			res.send({ "error" : "controllers-option-speciality->get_one->get req -> error_number : 4", "message": error_send } ); 
			return;		
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data options, liên hệ admin" );
		res.send({ "error" : "controllers-option-speciality->get_one->get req -> error_number : 3", "message": error_send } ); 
		return;		
	}	
}


//@* end of 3. [get_one_option_speciality]





//@
//@
//@
//@
//@
//@* 4. [update_option_speciality]
async function update_option_speciality(req, res, next) {
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var option_id = req.params.option_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-option-speciality->update->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"option_id":option_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-option-speciality->update->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_option == "1" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-option-speciality->update->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}		
	
	
	
	
	
	//@
	//@
	//@
	// lấy thông tin optiton để kiểm tranh option đã pushlish chưa
	try {
		var push_check = await models_option_speciality.get_one_option_speciality(option_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check.error, "lỗi truy xuất database, liên hệ admin dala" );
			res.send( { "error": "controllers-option-speciality->check-pushplic -> model-run -> error_number : 1", "message" : error_send  } );
			return;			
		}
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Không có option " ,"Không có option" );
			res.send( { "error": "controllers-option-speciality->check-pushplic -> model-run -> error_number : 2", "message" : error_send  } );	
			return;
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database danh mục" );
		res.send( { "error": "controllers-option-speciality->check-pushplic -> model-run -> error_number : 2", "message" : error_send  } );
		return;
	}		
	
	
	
	//@
	//@
	//@
	//nếu là admin thì update status update = 1
	try{
		if(check_datas_result.user_role == "admin"){
			Object.assign(datas,  { 'options_product_speciality_status_update' : 1 } );
		}
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "controllers-option-speciality->update->xac minh update -> error_number : 1", "message": error_send } ); 
			return;
	}		
	
	//@
	//@
	//@
	//nếu khong phai admin và status =  3 (tu choi thì sữa thanh chờ phê duyệt)
	try{
		//@
		//@
		if(check_datas_result.user_role != "admin"){
			delete datas.options_product_speciality_status_admin;
			delete datas.options_product_speciality_status_update;
		}		
		
		//@
		//@
		if(check_datas_result.user_role != "admin" && push_check[0].options_product_speciality_status_update == "1"){
			Object.assign(datas,  { 'options_product_speciality_status_admin' : 2 } );
		}

		if(check_datas_result.user_role == "admin"){
			Object.assign(datas, { 'options_product_speciality_status_update' : 1 });
		}		
	
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "controllers-option-speciality->update->xac minh update -> error_number : 2", "message": error_send } ); 
			return;
	}		
	
	
	
	//@
	//@
	//@
	//@
	try {
		models_option_speciality.update_option_speciality(datas,option_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			let message_error = default_field.get_message_error(error);
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "controllers-option-speciality->update->xac minh update -> error_number : 3", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Không đủ quyền truy cập dữ liệu" );
			res.send({ "error" : "controllers-option-speciality->update->xac minh update -> error_number : 5", "message": error_send } ); 
			return;		
	}	
}
//@* end of  4. [update_option_speciality]




//@
//@
//@
//@
//@
//@ * 5. [delete_option_speciality]
async function delete_option_speciality(req, res, next) {

	//@
	//@
	//@
	//@	get datas req
	try {
		var option_id = req.params.option_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-option-speciality->delete->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"option_id":option_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-option-speciality->delete->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	
	//@
	//@
	//@
	// lấy thông tin optiton để kiểm tranh option đã pushlish chưa
	try {
		var push_check = await models_option_speciality.get_one_option_speciality(option_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check.error, "lỗi truy xuất database, liên hệ admin dala" );
			res.send( { "error": "controllers-option-speciality->delete-check-pushplic -> model-run -> error_number : 1", "message" : error_send  } );
			return;			
		}
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Không có option " ,"Không có option" );
			res.send( { "error": "controllers-option-speciality->delete-check-pushplic -> model-run -> error_number : 2", "message" : error_send  } );	
			return;
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database danh mục" );
		res.send( { "error": "controllers-option-speciality->delete-check-pushplic -> model-run -> error_number : 2", "message" : error_send  } );
		return;
	}	
	
	
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữu và option chưa pusplish
	if(check_datas_result.user_role == "admin"  
	|| (check_datas_result.owner_option == "1" 
	&&  push_check[0].options_product_speciality_status_admin == 0 ) 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( 
			evn, "Bạn không đủ quyền thao tác, hoặc option đã puplish", 
			"Bạn không đủ quyền thao tác,hoặc option đã puplish" );
			
		res.send({ 
			"error" : "controllers-category-general-speciality->delete->get req -> error_number : 3", 
			"message": error_send 
			}); 
		return;			
	}		
	

	//@
	//@
	//@
	//@
	try {
		models_option_speciality.delete_option_speciality(option_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ 
				"error" : "controllers-category-general-speciality->delete->get req -> error_number : 3", 
				"message": error_send 
				}); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi delete option-liên hệ admin" );
		res.send({ 
			"error" : "controllers-category-general-speciality->delete->get req -> error_number : 3", 
			"message": error_send 
			}); 
		return;	
	}	
}
//@ end of * 5. [delete_option_speciality]















//@
//@
//@
//@
//@ 6. [search]
async  function search(req, res, next) {
	
	//@
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		//@
		//@
		//@

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controller_option-speciality->search->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	



	//@
	//@
	//@ kiểm tra xem có phải search option theo id
	//@ nếu search theo id thì phải chủ sở hữu id mới dc searhc
	//@ nếu không pahỉ search theo id thì phải là admin mới dc search
	try{
		var check_condition_id = 0;
		var option_id = 0;
		
		if ( datas.condition  && typeof datas.condition !== 'undefined' ){
			
			for ( x in datas.condition){
				if(datas.condition[x].hasOwnProperty('where') && datas.condition[x].where.length > 0){
					
					for ( z in datas.condition[x].where){
						if( datas.condition[x].where[z].hasOwnProperty('field')  
							&& datas.condition[x].where[z].field == "options_product_speciality_ID"  
							&& datas.condition[x].where[z].hasOwnProperty('compare')    
							&& datas.condition[x].where[z].compare == "="  
						){
							check_condition_id = 1;
							option_id = datas.condition[x].where[z].value;
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
		res.send({ "error" : "controller_option-speciality->search->check_condition_id -> error_number : 2", "message": error_send } ); 
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
				"option_id":option_id
			}	
		}else{
			var datas_check = {
				"token":token
			}
		}			
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
		

	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controllers-option-speciality->search->check-role -> error_number : 2", "message": error_send } ); 
		return;			
	}


	//@
	//@
	//@ nếu không có lộc theo cat id thì phải là admin
	if(check_condition_id == 0){
		if(check_datas_result.user_role == "admin" 
		|| check_datas_result.user_role == "supper-job"   
		|| check_datas_result.user_role == "default" 
		|| check_datas_result.user_role == "customer" 
		){}else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác, chỉ có dmin mới search all", "Bạn không đủ quyền thao tác, chỉ có dmin mới search all" );
			res.send({ "error" : "controllers-option-speciality->search->check_condition_id -> error_number : 1", "message": error_send } ); 
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_option == "1" 
		||  check_datas_result.user_role == "admin"   
		|| check_datas_result.user_role == "default" 
		|| check_datas_result.user_role == "supper-job"  
		|| check_datas_result.user_role == "customer" 
		){ }else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user", "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "controllers-option-speciality->search->check_condition_id -> error_number : 2", "message": error_send } ); 
			return;			
		}			
	}	

	
	//@
	//@
	//@
	//@
	try {
		models_option_speciality.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search model option" );
			res.send({ "error" : "controllers-option-speciality->search->check_condition_id -> error_number : 3", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search model option" );
		res.send({ "error" : "controllers-option-speciality->search->check_condition_id -> error_number : 4", "message": error_send } ); 
		return;	
	}

}
//@
//@ 6. end of  [search]





//@
//@
//@ * 7. [search_count_product_by_option]
async  function search_count_product_by_option(req, res, next) {
	
	//@
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		//@
		//@
		//@

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controller_option-speciality->search_count_product_by_option->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	



	//@
	//@
	//@
	//@
	try {
		models_option_speciality.search_count_product_by_option(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search model option" );
			res.send({ "error" : "controllers-option-speciality->search_count_product_by_option->check_condition_id -> error_number : 3", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search model option" );
		res.send({ "error" : "controllers-option-speciality->search_count_product_by_option->check_condition_id -> error_number : 4", "message": error_send } ); 
		return;	
	}
}
//@







//@
//@
//@
//@
//@
module.exports = { 
	get_all_option_speciality,
	get_one_option_speciality,
	update_option_speciality,
	insert_option_speciality,
	delete_option_speciality,
	search,
	search_count_product_by_option
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/
























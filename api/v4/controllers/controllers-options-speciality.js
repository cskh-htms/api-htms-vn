/*




//@* 1. [insert_option_speciality]

//@* 2. [get_all_option_speciality]

//@* 3. [get_one_option_speciality]


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
	
	
	if(check_datas_result.user_role == "admin" || check_datas_result.user_role == "supper-job" ){}else{
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
		res.send({ "error" : "controllers-option-speciality->get_one_category_general_speciality->get req -> error_number : 1", "message": error_send } ); 
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
		res.send({ "error" : "controllers-option-speciality->get_one_category_general_speciality->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_option == "1" || check_datas_result.user_role == "supper-job"){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-option-speciality->get_one_category_general_speciality->get req -> error_number : 3", "message": error_send } ); 
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
			res.send({ "error" : "controllers-option-speciality->get_one_category_general_speciality->get req -> error_number : 2", "message": error_send } ); 
			return;		
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data options, liên hệ admin" );
		res.send({ "error" : "controllers-option-speciality->get_one_category_general_speciality->get req -> error_number : 3", "message": error_send } ); 
		return;		
	}	
}


//@* end of 3. [get_one_option_speciality]












//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
async function update_option_speciality(req, res, next) {
	let datas = req.body.datas;
	let option_id = req.params.option_id;
	let token = req.headers['token'];
	//
	//@@
	//@@lấy version
	let datas_check = {
		"token":token,
		"option_id":option_id
	}
	//@
	//@
	let check_datas_result;	
	try{
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
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
		var error_send = ojs_shares_show_errors.show_error( evn, check_datas_result.error, "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.controller_options_speciality->update", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_option != "1"  && check_datas_result.user_role != "admin"  && check_datas_result.user_role != "bussiness"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.controller_options_speciality->update", "message": error_send } ); 
		return;			
	}
	//@
	//@
	
	
	
	
	//@
	//@
	//@
	//nếu là admin thì update status update = 1
	try{
		if(check_datas_result.user_role == "admin" && datas.options_product_speciality_status_admin == 1){
			Object.assign(datas,  { 'options_product_speciality_status_update' : 1 } );
		}
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "6.3_controller_option>update", "message": error_send } ); 
			return;
	}		
	
		
		
	
	//@
	//@
	//@
	//nếu khong phai admin và status =  3 (tu choi thì sữa thanh chờ phê duyệt)
	try{
		if(check_datas_result.user_role != "admin" && datas.options_product_speciality_status_admin == 3){
			Object.assign(datas,  { 'options_product_speciality_status_admin' : 2 } );
		} else if(check_datas_result.user_role != "admin" && datas.options_product_speciality_status_admin != 3){
			delete datas.options_product_speciality_status_admin;
		}
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "6.4_controller_options>update", "message": error_send } ); 
			return;
	}		
	
			
	
	
	//@
	//@
	try {
		models_option_speciality.update_option_speciality(datas,option_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			
			let message_error = default_field.get_message_error(error);
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "1.9.controllers-options-speciality->update ", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
			res.send({ "error" : "2.5.controller_options_speciality->update", "message": error_send } ); 
			return;		
	}	
}





//
//@@
//@@
//@@
//@@
//insert
async function delete_option_speciality(req, res, next) {
	let option_id = req.params.option_id;
	let token = req.headers['token'];
	
	
	
	//
	//@@
	//@@lấy version
	let datas_check = {
		"token":token,
		"option_id":option_id
	}
	//@
	//@
	let check_datas_result;	
	try{
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "1.controller_options_speciality->delete", "message": error_send } ); 
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
		var error_send = ojs_shares_show_errors.show_error( evn, check_datas_result.error, "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.2.controller_options_speciality->update", "delete": error_send } ); 
		return;			
	}
	

	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_option != "1"  && check_datas_result.user_role != "admin"  && check_datas_result.user_role != "bussiness"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "2.3.controller_options_speciality->delete", "message": error_send } ); 
		return;			
	}
	//@
	//@
	//@
	//@
	//@
	//@
	//kiem tra nếu có danh mục con thì không xoá
	let check_child_option;
	try {
		let data_check_child = ojs_datas_option.get_data_check_child(option_id); 
		//@
		//@
		check_child_option = await  models_option_speciality.search(data_check_child.datas).then( results => {
			if(typeof results.error == 'string' && results.error ){ 
				return  { "error" : "1_store_check", "message" : results } ;
			}else{
				if(Object.entries(results).length  > 0){
					return {"error":"2_store_check","message":" option đã có danh mục con không thể xoá"} 
				}else{
					return {"error":"","message":"ok"} 
				}
			}
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "55->controllers-options->delete", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "56->controllers-options->delete", "message": error_send } ); 
			return;	
	}	

	if(check_child_option.error.length > 0) { res.send(check_child_option); return ;}
	//@
	//@
	//@
	//@
	
	//@
	try {
		models_option_speciality.delete_option_speciality(option_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "1.4.controllers-option->delete ", "message": error_send } ); 
			return;	
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
//search
async  function search(req, res, next) {
	let datas = req.body.datas;
	
	//res.send(datas);
	//return;

	try {
		models_option_speciality.search(datas).then( results => {
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
	get_all_option_speciality,
	get_one_option_speciality,
	update_option_speciality,
	insert_option_speciality,
	delete_option_speciality,
	search
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/
























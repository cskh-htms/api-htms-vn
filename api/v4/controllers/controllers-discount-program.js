
/*

* 1. [insert_discount_program]

* 2. [get_all_discount_program]

* 3. [get_one_discount_program]

* 4. [update_discount_program]

* 5. [delete_discount_program]

* 6. [search]



*/


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
const default_field = require('../const-tables/const-tables-discount-program');


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
const models_discount_program = require('../models/models-discount-program');




///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////




//@
//@
//@
//@
//@ 1. [insert_discount_program]
async function insert_discount_program(req, res, next) {
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
		res.send({ "error" : "controllers-discount_program->insert->request->error_number : 1", "message": error_send } ); 
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
		res.send({ "error" : "controllers-discount_program->insert-> check owner->number_error : 1 ", "message": error_send } ); 
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
		res.send({ "error" : "controllers-discount_program->insert-> check owner->number_error : 2 ", "message": error_send } ); 
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
		
		let data_check = default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({"error" : "1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi check data type, liên hệ admin dala" );
		res.send({ "error" : "controllers-discount_program->insert->check data->number_error : 2 ", "message": error_send } ); 
		return;	
	}			
	

	//@
	//@
	//@
	//@
	//@
	try {
		models_discount_program.insert_discount_program(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "controllers-discount_program->insert->model-run->number_error : 1 ", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert discount_program , Liên hệ admin" );
		res.send({ "error" : "controllers-discount_program->insert->model-run->number_error : 2 ", "message": error_send } ); 
		return;
	}		
}


//@ end of 1. [insert_discount_program]





//@@
//@@
//@@
//@@
//@@
//@@
//@* 2. [get_all_discount_program_store]
async  function get_all_discount_program(req, res, next) {
	// lấy data request
	try {
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controllers-store->get_all->request->error_number : 1", "message": error_send } ); 
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
		res.send({ "error" : "controllers-store->get_all-> check owner->number_error : 1 ", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "default" 
	|| check_datas_result.user_role == "bussiness" 	
	){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "controllers-store->get_all-> check owner->number_error : 2 ", "message": error_send } ); 
		return;			
	}			
	
	
	//@
	//@
	//@
	//@
	try {
		models_discount_program.get_all_discount_program().then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			evn = "dev";			
			let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list discount_program" );
			res.send( { "error": "controllers-store->get_all-> check owner->number_error : 2", "message" : error_send  } );	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";			
		let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list discount_program" );
		res.send( { "error": "controllers-store->get_all-> check owner->number_error : 3", "message" : error_send  } );
	}	
}

//@ end of * 2. [get_all_discount_program_store]





//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 3. [get_one_discount_program]
async  function get_one_discount_program(req, res, next) {
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var discount_program_id = req.params.discount_program_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-discount_program->get_one->get req -> error_number : 1", "message": error_send } ); 
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
		res.send({ "error" : "controllers-discount_program->get_one->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@ nếu không phải admin hoặt chủ sở hữ user thì return error
	if(
	check_datas_result.user_role == "admin"  
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "default" 
	|| check_datas_result.user_role == "bussiness" 	
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-discount_program->get_one->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}	
	
	
	//@
	//@
	//@
	//@
	try {
		models_discount_program.get_one_discount_program(discount_program_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {

			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
			res.send({ "error" : "controllers-discount_program->get_one->model-run -> error_number : 1", "message": error_send } ); 
			return;	

		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
			res.send({ "error" : "controllers-discount_program->get_one->model-run -> error_number : 2", "message": error_send } ); 
			return;	
	}	
}

//@ end of * 3. [get_one_discount_program]




//
//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 4. [update_discount_program]
async  function update_discount_program(req, res, next) {
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var discount_program_id = req.params.discount_program_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-discount_program->update->get req -> error_number : 1", "message": error_send } ); 
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
		res.send({ "error" : "controllers-discount_program->update->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-discount_program->update->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}		
	

	//@
	try {
		models_discount_program.update_discount_program(datas,discount_program_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "controller_store->models_discount_program.update_discount_program->error_number : 1", "message": error_send } ); 
			return;
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi update store, vui lòng liên hệ admin" );
			res.send({ "error" : "controller_store->models_discount_program.update_discount_program->error_number : 2", "message": error_send } ); 
			return;
	}	
}

//@@ * end of  4. [update_discount_program]


//@@
//@@
//@@
//@@
//@@
//@* 5. [delete_discount_program]
async  function delete_discount_program(req, res, next) {
	//@
	//@
	//@	get datas req
	try {
		var discount_program_id = req.params.discount_program_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controllers-discount_program->delete->get req -> error_number : 1", "message": error_send } ); 
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
		res.send({ "error" : "controllers-discount_program->delete->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}



	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controllers-discount_program->delete->get req -> error_number : 3", "message": error_send } ); 
		return;			
	}		
	
	
	

	//##
	//##
	//#end of check chủ sỡ hữu 
	//@
	try {
		models_discount_program.delete_discount_program(discount_program_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "1.4.controllers-discount_program->delete ", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete data - liên hệ admin" );
			res.send({ "error" : "2.6.model_sotres->discount_program/delete ", "message": error_send } ); 
			return;	
	}	
}
//@* end of  5. [delete_discount_program]






//@@
//@@
//@@
//6. [search] 
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
		res.send({ "error" : "controller_discount_program>search->get req -> error_number : 1", "message": error_send } ); 
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
		res.send({ "error" : "controllers-discount_program->delete->get req -> error_number : 2", "message": error_send } ); 
		return;			
	}










	if(check_datas_result.user_role == "admin" 
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "default" 
	|| check_datas_result.user_role == "bussiness" 	
	
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác, chỉ có admin mới search all", "Bạn không đủ quyền thao tác, chỉ có admin mới search all" );
		res.send({ "error" : "controllers-store->search->check_condition_id -> error_number : 1", "message": error_send } ); 
		return;	
	}		

	
	
	
	//@
	//@
	//@
	//@ run
	try {
		models_discount_program.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : error, "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : "2_controller_store->search", "message": error_send } ); 
			return;	
	}

}

//end of 6. [search] 









module.exports = { 
		search,
		insert_discount_program,
		get_one_discount_program,
		update_discount_program,
		delete_discount_program,
		get_all_discount_program
};


























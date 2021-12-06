
/*

* 1. [insert_discount_program]

* 2. [get_all_discount_program]

* 2.2. [get_all_discount_program_by_product]

* 2.3 [get_all_discount_program_by_position]

* 3. [get_one_discount_program]

* 4. [update_discount_program]

* 5. [delete_discount_program]

* 6. [search]

* 7. [search_discount_program_sale]




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
try {	
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		if(!datas.discount_program_store_id_created){
			res.send({ "error" : "1", "position":"ctl-discount-program->insert", "message": "Chưa có id cửa hàng"} );
			return;			
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "2", "position":"ctl-discount-program->insert", "message": error_send } );
		return;	
	}	



	//res.send(datas);	
	//return;	 
	
	
	
	try{
		var datas_check = {
			"token":token,
			"store_id":datas.discount_program_store_id_created
		}		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "3", "position":"ctl-discount-program->insert", "message": error_send } );
		return;			
	}
	
	
	//@
	//@
	//@
	//kiem tra role
	if(
	check_datas_result.user_role == "admin"
	|| check_datas_result.owner_store == "1" 
	){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "4", "position":"ctl-discount-program->insert", "message": error_send } );
		return;			
	}		
	

	//@
	//@
	//@
	//kiem tra role
	if(	check_datas_result.user_role == "admin"	){}else{
		delete datas.discount_program_status_admin;
		delete datas.discount_program_status_update;
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
		res.send({ "error" : "5", "position":"ctl-discount-program->insert", "message": error_send } );
		return;	
	}			
	
	//res.send(datas_assign);
	//return;



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
			res.send({ "error" : "6", "position":"ctl-discount-program->insert", "message": error_send } );
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert discount_program , Liên hệ admin" );
		res.send({ "error" : "7", "position":"ctl-discount-program->insert", "message": error_send } );
		return;
	}		
	
}
catch(error){
	var evn = ojs_configs.evn;
	////evn = "dev";;
	var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert discount_program , Liên hệ admin" );
	res.send({ "error" : "113", "position":"ctl-discount-program->insert", "message": error_send } );
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
try {	
	// lấy data request
	try {
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "1", "position":"ctl-discount-program->get all", "message": error_send } );
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
		res.send({ "error" : "2", "position":"ctl-discount-program->get all", "message": error_send } );
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
	|| check_datas_result.user_role == "customer" 
	){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3", "position":"ctl-discount-program->get all", "message": error_send } );
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
			//evn = "dev";			
			let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list discount_program" );
			res.send({ "error" : "4", "position":"ctl-discount-program->get all", "message": error_send } );
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";			
		let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list discount_program" );
		res.send({ "error" : "5", "position":"ctl-discount-program->get all", "message": error_send } );
		return;
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	evn = "dev";			
	let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list discount_program" );
	res.send({ "error" : "113", "position":"ctl-discount-program->get all", "message": error_send } );
	return;
}	
}

//@ end of * 2. [get_all_discount_program_store]





//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 2.2. [get_all_discount_program_by_product]
async  function get_all_discount_program_by_product(req, res, next) {
try {	
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var c1 = req.query.c1;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-discount-program->get_all_discount_program_by_product", "message": error_send } );
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
		res.send({ "error" : "2", "position":"ctl-discount-program->get_all_discount_program_by_product", "message": error_send } );
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
	|| check_datas_result.user_role == "customer" 
	){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3", "position":"ctl-discount-program->get_all_discount_program_by_product", "message": error_send } );
		return;			
	}		
	
	
	//@
	//@
	//@
	//@ lấy product list
	try {
		var model_result = await models_discount_program.get_all_discount_program_by_product({"c1":c1});	
		var model_product_arr = [];
		if(model_result.length > 0){
			for(x in model_result){
				model_product_arr.push(model_result[x].products_speciality_ID);
			}
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";			
		let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list discount_program" );
		res.send({ "error" : "5", "position":"ctl-discount-program->get_all_discount_program_by_product", "message": error_send } );
		return;
	}	
	
	//res.send( { "error" : "", "datas" : model_result} );
	//return;		

	//res.send( { "error" : "", "datas" : model_product_arr} );
	//return;
	
	//@
	//@
	//@
	//@ lấy số lượng bán
	var sale_product_result = [];
	try {
		if(model_product_arr.length > 0){
			sale_product_result = await models_discount_program.get_product_sale(model_product_arr);	
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";			
		let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list discount_program" );
		res.send({ "error" : "6", "position":"ctl-discount-program->get_all_discount_program_by_product", "message": error_send } );
		return;
	}	
	
	
	//res.send( { "error" : "", "datas" : sale_product_result } );
	//return;			
		
	//@
	//@
	//@
	//@ gôm data return	
	var so_luong_ban = 0;
	for(x in model_result){
		for(y in sale_product_result){
			if(model_result[x].products_speciality_ID == sale_product_result[y].f1_product_id){
				so_luong_ban = sale_product_result[y].f2_so_luong_ban;
			}							
		}
		model_result[x].so_luong_da_ban = so_luong_ban;
	}

	
	//@
	//@
	//return data;
	res.send( { "error" : "", "datas" : model_result } );
	return;		
}
catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-discount-program->get_all_discount_program_by_product", "message": error_send } ); 
		return;	
}		
}




//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 2.3 [get_all_discount_program_by_position]
async  function get_all_discount_program_by_position(req, res, next) {
try {	
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var c1 = req.query.c1;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-discount-program->get_all_discount_program_by_position", "message": error_send } );
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
		res.send({ "error" : "2", "position":"ctl-discount-program->get_all_discount_program_by_position", "message": error_send } );
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
	|| check_datas_result.user_role == "customer" 
	){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3", "position":"ctl-discount-program->get_all_discount_program_by_position", "message": error_send } );
		return;			
	}		
	
	
	//@
	//@
	//@
	//@ lấy product list
	try {
		var model_result = await models_discount_program.get_all_discount_program_by_position({"c1":c1});	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";			
		let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list discount_program" );
		res.send({ "error" : "5", "position":"ctl-discount-program->get_all_discount_program_by_position", "message": error_send } );
		return;
	}	

	//@
	//@
	//return data;
	res.send( { "error" : "", "datas" : model_result } );
	return;		
}
catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-discount-program->get_all_discount_program_by_position", "message": error_send } ); 
		return;	
}		
}












//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 3. [get_one_discount_program]
async  function get_one_discount_program(req, res, next) {
try {	
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
		res.send({ "error" : "1", "position":"ctl-discount-program->get one", "message": error_send } );
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
		res.send({ "error" : "2", "position":"ctl-discount-program->get one", "message": error_send } ); 
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
	|| check_datas_result.user_role == "customer" 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-discount-program->get one", "message": error_send } );
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
			res.send({ "error" : "4", "position":"ctl-discount-program->get one", "message": error_send } ); 
			return;	

		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
			res.send({ "error" : "5", "position":"ctl-discount-program->get one", "message": error_send } ); 
			return;	
	}	
}
catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-discount-program->get one", "message": error_send } ); 
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
try {	
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
		res.send({ "error" : "1", "position":"ctl-discount-program->update", "message": error_send } );
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"discount_program_id" : discount_program_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-discount-program->update", "message": error_send } ); 
		return;			
	}
	
	
	
	//res.send(check_datas_result);
	//return;
	
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(
	check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_discount_program == "1" 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-discount-program->update", "message": error_send } );
		return;			
	}		
	
	
	
	//@
	//@
	//@
	// lấy thông tin chương trình check update status
	try {
		var push_check = await models_discount_program.get_one_discount_program(discount_program_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check.error, "lỗi truy xuất database, liên hệ admin dala" );
			res.send({ "error" : "4", "position":"ctl-discount-program->update", "message": error_send } );
			return;			
		}
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Không có danh mục " ,"Không có danh mục" );
			res.send({ "error" : "5", "position":"ctl-discount-program->update", "message": error_send } );
			return;
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database danh mục" );
		res.send({ "error" : "6", "position":"ctl-discount-program->update", "message": error_send } );
		return;
	}			
	
	
	
	
	//@
	//@
	//@
	//@ nếu chương trình đang chạy thì không thể update
	try{
		//@
		//@
		if(push_check[0].discount_program_status_admin == "1" && check_datas_result.user_role != "admin" ){
			res.send({ "error" : "7", "position":"ctl-discount-program->update", "message": "Chương trình đang chạy không thể update" } );
			return;			
		}

	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "8", "position":"ctl-discount-program->update", "message": error_send } );
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
			delete datas.discount_program_status_admin;
			delete datas.discount_program_status_update;
		}		
		
		//@
		//@
		if(check_datas_result.user_role != "admin" && push_check[0].discount_program_status_update == "1"){
			Object.assign(datas,  { 'discount_program_status_admin' : 2 } );
		}

		if(check_datas_result.user_role == "admin"){
			Object.assign(datas, { 'discount_program_status_update' : 1 });
		}		
	
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "9", "position":"ctl-discount-program->update", "message": error_send } ); 
			return;
	}			
	
	

	//@	
	//@	
	//@	
	//@
	//@
	try {
		models_discount_program.update_discount_program(datas,discount_program_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "10", "position":"ctl-discount-program->update", "message": error_send } ); 
			return;
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi update store, vui lòng liên hệ admin" );
			res.send({ "error" : "11", "position":"ctl-discount-program->update", "message": error_send } );
			return;
	}	
	
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi update store, vui lòng liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-discount-program->update", "message": error_send } );
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
try {	
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
		res.send({ "error" : "1", "position":"ctl-discount-program->delete", "message": error_send } );
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"discount_program_id" : discount_program_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-discount-program->delete", "message": error_send } ); 
		return;			
	}



	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(
	check_datas_result.user_role == "admin" 
	|| check_datas_result.owner_discount_program == "1"  
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-discount-program->delete", "message": error_send } );
		return;			
	}		
	
	
	
	//@
	//@
	//@
	// lấy thông tin chương trình check update status
	try {
		var push_check = await models_discount_program.get_one_discount_program(discount_program_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check.error, "lỗi truy xuất database, liên hệ admin dala" );
			res.send({ "error" : "4", "position":"ctl-discount-program->delete", "message": error_send } );
			return;			
		}
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Không có danh mục " ,"Không có danh mục" );
			res.send({ "error" : "5", "position":"ctl-discount-program->delete", "message": error_send } );
			return;
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database danh mục" );
		res.send({ "error" : "7", "position":"ctl-discount-program->delete", "message": error_send } );
		return;
	}			
	
	
	
	
	//@
	//@
	//@
	//@ nếu chương trình đang chạy thì không thể update
	try{
		//@
		//@
		if(push_check[0].discount_program_status_admin == "1" && check_datas_result.user_role != "admin" ){
			res.send({ "error" : "8", "position":"ctl-discount-program->delete", "message":  "Chương trình đang chạy không thể update" } );
			return;			
		}

	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "9", "position":"ctl-discount-program->delete", "message": error_send } );
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
			res.send({ "error" : "10", "position":"ctl-discount-program->delete", "message": error_send } );
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete data - liên hệ admin" );
			res.send({ "error" : "11", "position":"ctl-discount-program->delete", "message": error_send } );
			return;	
	}	
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete data - liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-discount-program->delete", "message": error_send } );
		return;	
}	
	
	
}
//@* end of  5. [delete_discount_program]






//@@
//@@
//@@
//6. [search] 
async  function search(req, res, next) {
try {	
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
		res.send({ "error" : "1", "position":"ctl-discount-program->search", "message": error_send } );
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
		res.send({ "error" : "2", "position":"ctl-discount-program->search", "message": error_send } ); 
		return;			
	}










	if(check_datas_result.user_role == "admin" 
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "default" 
	|| check_datas_result.user_role == "bussiness" 	
	|| check_datas_result.user_role == "customer" 
	
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( 
		evn, 
		"Bạn không đủ quyền thao tác, chỉ có admin mới search all", 
		"Bạn không đủ quyền thao tác, chỉ có admin mới search all" );
		res.send({ "error" : "3", "position":"ctl-discount-program->search", "message": error_send } );
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
			res.send({ "error" : "4", "position":"ctl-discount-program->search", "message": error_send } );
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : "5", "position":"ctl-discount-program->search", "message": error_send } );
			return;	
	}
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
		res.send({ "error" : "5", "position":"ctl-discount-program->search", "message": error_send } );
		return;	
}	
}






//@@
//@@
//@@
//7. [search_discount_program_sale] 
async  function search_discount_program_sale(req, res, next) {
try {	
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
		res.send({ "error" : "1", "position":"ctl-discount-program->search_discount_program_sale", "message": error_send } );
		return;			
	}	



	//@
	//@
	//@
	//@ run
	try {
		models_discount_program.search_discount_program_sale(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : "4", "position":"ctl-discount-program->search_discount_program_sale", "message": error_send } );
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : "5", "position":"ctl-discount-program->search_discount_program_sale", "message": error_send } );
			return;	
	}
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
		res.send({ "error" : "5", "position":"ctl-discount-program->search_discount_program_sale", "message": error_send } );
		return;	
}	
}




module.exports = { 
		search,
		insert_discount_program,
		get_one_discount_program,
		update_discount_program,
		delete_discount_program,
		get_all_discount_program,
		search_discount_program_sale,
		get_all_discount_program_by_product,
		get_all_discount_program_by_position
};


























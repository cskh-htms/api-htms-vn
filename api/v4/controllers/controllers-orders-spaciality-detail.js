
/*


* 1. [insert_ordres_spaciality_details]

* 2. [update_ordres_spaciality_details]

* 3. [delete_ordres_spaciality_details]


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
const default_field = require('../const-tables/const-tables-orders-spaciality-detail');


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
const models_orders_spaciality_detail = require('../models/models-orders-spaciality-detail');





//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////




//@
//@
//@
//@
//@
//@
//@ * 1. [insert_orders_spaciality_detail]
async  function insert_orders_spaciality_detail(req, res, next) {
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		//res.send(datas);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controllers_orders_speciality_detail->insert->request->error_number : 1", "message": error_send } ); 
		return;	
	}	

	//res.send(datas);
	//return;	


	//@
	//@
	//@
	//@
	try{
		var datas_check = {
			"token":token
		}		
		//res.send(datas_check);
		//return;				
		
		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
		
		
		//res.send(check_datas_result);
		//return;		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "controllers_orders_speciality_detail->insert-> check owner->number_error : 1 ", "message": error_send } ); 
		return;			
	}
	

	
	//res.send(check_datas_result);
	//return;	
	
	
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role == "admin"){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"Không đủ quyền truy cập dữ liệu, vui lòng đăng nhập user khác", 
			"Không đủ quyền truy cập dữ liệu, vui lòng đăng nhập user khác" 
		);
		res.send({ "error" : "controllers_orders_speciality_detail->insert-> check owner->number_error : 2 ", "message": error_send } ); 
		return;			
	}		
	
			
	//res.send(check_datas_result);
	//return;	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	
	//@
	//@
	//@
	//@
	
	//res.send(default_field.default_fields);
	//return;		
	
	var datas_assign;
	try {
		//gop voi data drfault field in mysql database
		datas_assign = Object.assign(default_field.default_fields, datas);
		
		//neu data không hợp lệ thì return loi;
		var data_check = default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({"error" : "controllers_orders_speciality_detail->insert-> check datas->number_error : 1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi check datas, liên hệ admin" );
		res.send({ "error" : "controllers_orders_speciality_detail->insert-> check datas->number_error : 2", "message": error_send } ); 
		return;	
	}			
	
	
	
	
	//@
	//@
	//@
	//@
	//@
	try {
		models_orders_spaciality_detail.insert_orders_spaciality_detail(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var message_error = default_field.get_message_error(error);
			
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "controllers_orders_speciality_detail->insert-> run->number_error : 1 ", "message": error_send } ); 
			return;				
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi insert datas, liên hệ admin" );
		res.send({ "error" : "controllers_orders_speciality_detail->insert-> run->number_error : 2", "message": error_send } ); 
		return;	
	}	
	
	
	
}
//@
//@ end of * 1. [insert_orders_spaciality_detail]







//@
//@
//@
//@
//@
//@
//@ * 2. [update_orders_spaciality_detail]
async function update_orders_spaciality_detail(req, res, next) {
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		var detail_id = req.params.detail_id;
		var token = req.headers['token'];
		
		//res.send([datas,detail_id]);
		//return;
		
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controllers_orders_speciality_detail->update->request->error_number : 1", "message": error_send } ); 
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
		//res.send(datas_check);
		//return;				
		
		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
		
		
		//res.send(check_datas_result);
		//return;		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "controllers_orders_speciality_detail->update-> check owner->number_error : 1 ", "message": error_send } ); 
		return;			
	}
	

	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role == "admin"){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"Không đủ quyền truy cập dữ liệu, vui lòng đăng nhập user khác", 
			"Không đủ quyền truy cập dữ liệu, vui lòng đăng nhập user khác" 
		);
		res.send({ "error" : "controllers_orders_speciality_detail->update-> check owner->number_error : 2 ", "message": error_send } ); 
		return;			
	}		
	
			
	//res.send(check_datas_result);
	//return;	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
		
	
	//@
	//@
	//@
	//@
	//@ check data
	try {
		var data_check = default_field.check_datas(datas);
		if(data_check != 0){
			res.send({"error" : "controllers_orders_speciality_detail->update-> check datas->number_error : 1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update, vui lòng liên hệ admin" );
		res.send({ "error" : "controllers_orders_speciality_detail->update-> check datas->number_error : 2 ", "message": error_send } ); 
		return;	
	}		

	
	
	
	//@
	//@
	//@
	//@
	//@
	try {
		models_orders_spaciality_detail.update_orders_spaciality_detail(datas,detail_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var message_error = default_field.get_message_error(error);
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "controllers_orders_speciality_detail->update-> run->number_error : 1 ", "message": error_send } ); 
			return;		
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update, vui lòng liên hệ admin" );
			res.send({ "error" : "controllers_orders_speciality_detail->update-> run->number_error : 2 ", "message": error_send } ); 
			return;		
	}	
}
//@
//@ end of * 2. [update_orders_spaciality_detail]











//@
//@
//@
//@
//@
//@
//@ * 3. [delete_orders_spaciality_detail]
async  function delete_orders_spaciality_detail(req, res, next) {
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var detail_id = req.params.detail_id;
		var token = req.headers['token'];	
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controllers_orders_speciality_detail->delete->request->error_number : 1", "message": error_send } ); 
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
		//res.send(datas_check);
		//return;				
		
		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
		
		
		//res.send(check_datas_result);
		//return;		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "controllers_orders_speciality_detail->delete-> check owner->number_error : 1 ", "message": error_send } ); 
		return;			
	}
	

	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role == "admin"){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"Không đủ quyền truy cập dữ liệu, vui lòng đăng nhập user khác", 
			"Không đủ quyền truy cập dữ liệu, vui lòng đăng nhập user khác" 
		);
		res.send({ "error" : "controllers_orders_speciality_detail->delete-> check owner->number_error : 2 ", "message": error_send } ); 
		return;			
	}		
	
			
	//res.send(check_datas_result);
	//return;	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
		

	//@
	//@
	//@
	//@	
	//@
	try {
		models_orders_spaciality_detail.delete_orders_spaciality_detail(detail_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "ỗi delete data, liên hệ admin" );
			res.send({ "error" : "controllers_orders_speciality_detail->delete-> run->number_error : 1 ", "message": error_send } ); 
			return;		
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,error, "ỗi delete data, liên hệ admin" );
		res.send({ "error" : "controllers_orders_speciality_detail->delete-> run->number_error : 2 ", "message": error_send } ); 
		return;		
	}	
}
//@
//@ * 3. [delete_orders_spaciality_detail]




/*
@@@@
@@@@@
@@@@@
@@@@@
*/
module.exports = { 
	update_orders_spaciality_detail,
	insert_orders_spaciality_detail,
	delete_orders_spaciality_detail
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/
























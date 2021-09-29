
/*

* 1. [insert_users_tracking]

* 2. [get_all_users_tracking]

* 3. [get_one_users_tracking]

* 4. [update_users_tracking]

* 5. [delete_users_tracking]

* 6. [search]

7. [unlock_users_tracking]

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
const default_field = require('../const-tables/const-tables-users-tracking');


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
const models_users_tracking = require('../models/models-users-tracking');




///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////



//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 7. [unlock_users_tracking]
async  function unlock_users_tracking(req, res, next) {
try {	
	//@
	//@	get datas req
	try {
		var user_tracking_id = req.params.user_tracking_id;
		var token = req.headers['token'];
		
		
		//res.send([token]);
		//return;
		
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-users-tracking->unlock", "message": error_send } );
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
		res.send({ "error" : "2", "position":"ctl-users-tracking->unlock", "message": error_send } );
		return;			
	}
	
	
	
	//res.send(check_datas_result);
	//return;
		

	
	//@
	//@	
	//@
	//@
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin") {} else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"Bạn không đủ quyền thao tác, hoặc đơn hàng đã hoàn thành , không thể update", 
			"Bạn không đủ quyền thao tác" 
		);
		res.send({ "error" : "3", "position":"ctl-users-tracking->unlock", "message": error_send } );
		return;		
		
	}		
	
	
	//res.send(["ok"]);
	//return;
	
	
	//@
	//@
	//@
	//@
	//@
	//@
	try {
		models_users_tracking.unlock_users_tracking(user_tracking_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "4", "position":"ctl-users-tracking->unlock", "message": error_send } ); 
			return;
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi update store, vui lòng liên hệ admin" );
			res.send({ "error" : "5", "position":"ctl-users-tracking->unlock", "message": error_send } );
			return;
	}	
}
catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi update store, vui lòng liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-users-tracking->unlock", "message": error_send } );
		return;
}		
}

//@@ * end of  4. [update_users_tracking]
//@
//@
//@
//@
//@ 1. [insert_users_tracking]
async function insert_users_tracking(req, res, next) {
	
try {	
	//res.send(["ok"]);
	//return;
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
		if(!datas.users_tracking_user_id){
			res.send({ "error" : "1",
			"position":"ctl-users-tracking->insert",
			"message":  " Chưa nhập id user (users_tracking_users_id) "} );			
			return;
		}
	
		//res.send([datas,token]);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "2", "position":"ctl-users-tracking->insert", "message": error_send } );
		return;	
	}	
	//res.send(datas_check );	
	//return;	 
	try{
		var datas_check = {
			"token"				:	token
		}		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "3", "position":"ctl-users-tracking->insert", "message": error_send } );
		return;			
	}
	
	
	//res.send(check_datas_result);
	//return;
	
	
	
	//@
	//@
	//@
	//kiem tra role
	if(
	check_datas_result.user_role == "admin"	){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "4", "position":"ctl-users-tracking->insert", "message": error_send } );
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
			res.send({ "error" : "5", "position":"ctl-users-tracking->insert", "message": data_check } );			
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi check data type, liên hệ admin dala" );
		res.send({ "error" : "6", "position":"ctl-users-tracking->insert", "message": error_send } );
		return;	
	}			
	

	//@
	//@
	//@
	//@
	//@
	try {
		models_users_tracking.insert_users_tracking(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "7", "position":"ctl-users-tracking->insert", "message": error_send } );
			return;
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert users_tracking , Liên hệ admin" );
			res.send({ "error" : "8", "position":"ctl-users-tracking->insert", "message": error_send } );
			return;
	}		
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi insert users_tracking , Liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-users-tracking->insert", "message": error_send } );
		return;
}		
}


//@ end of 1. [insert_users_tracking]





//@@
//@@
//@@
//@@
//@@
//@@
//@* 2. [get_all_users_tracking_store]
async  function get_all_users_tracking(req, res, next) {
try {	
	// lấy data request
	try {
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "1", "position":"ctl-users-tracking->get all", "message": error_send } );
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
		res.send({ "error" : "2", "position":"ctl-users-tracking->get all", "message": error_send } );
		return;			
	}
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.user_role == "supper-job"  
	|| check_datas_result.user_role == "default"  
	|| check_datas_result.user_role == "customer" 
	
	
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "3", "position":"ctl-users-tracking->get all", "message": error_send } );
		return;			
	}			
	
	
	//@
	//@
	//@
	//@
	try {
		models_users_tracking.get_all_users_tracking().then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";			
			let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list users_tracking" );
			res.send({ "error" : "4", "position":"ctl-users-tracking->get all", "message": error_send } );
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";			
		let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list users_tracking" );
		res.send({ "error" : "4", "position":"ctl-users-tracking->get all", "message": error_send } );
		return;
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";			
	let error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database list users_tracking" );
	res.send({ "error" : "113", "position":"ctl-users-tracking->get all", "message": error_send } );
	return;
}		
}

//@ end of * 2. [get_all_users_tracking_store]





//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 3. [get_one_users_tracking]
async  function get_one_users_tracking(req, res, next) {
try {	
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var user_tracking_id = req.params.user_tracking_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-users-tracking->get one", "message": error_send } ); 
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
		res.send({ "error" : "2", "position":"ctl-users-tracking->get one", "message": error_send } ); 
		return;			
	}
	
	//@
	//@
	//@ nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.user_role == "supper-job"
	|| check_datas_result.user_role == "default" 
	|| check_datas_result.user_role == "customer" 
	
	
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-users-tracking->get one", "message": error_send } ); 
		return;			
	}	
	
	
	//@
	//@
	//@
	//@
	try {
		models_users_tracking.get_one_users_tracking(user_tracking_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {

			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
			res.send({ "error" : "4", "position":"ctl-users-tracking->get one", "message": error_send } ); 
			return;	

		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
			res.send({ "error" : "5", "position":"ctl-users-tracking->get one", "message": error_send } ); 
			return;	
	}	
}
catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get user, liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-users-tracking->get one", "message": error_send } ); 
		return;	
}	
}

//@ end of * 3. [get_one_users_tracking]




//
//@@
//@@
//@@
//@@
//@@
//@@
//@@ * 4. [update_users_tracking]
async  function update_users_tracking(req, res, next) {
try {	
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var user_tracking_id = req.params.user_tracking_id;
		var token = req.headers['token'];
		
		
		//res.send([token]);
		//return;
		
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-users-tracking->update", "message": error_send } ); 
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
		res.send({ "error" : "2", "position":"ctl-users-tracking->update", "message": error_send } );
		return;			
	}
	
	
	
	//res.send(check_datas_result);
	//return;
		

	
	//@
	//@	
	//@
	//@
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin") {} else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"Bạn không đủ quyền thao tác, hoặc đơn hàng đã hoàn thành , không thể update", 
			"Bạn không đủ quyền thao tác" 
		);
		res.send({ "error" : "3", "position":"ctl-users-tracking->update", "message": error_send } ); 
		return;		
		
	}		
	
	
	//res.send(["ok"]);
	//return;
	
	
	//@
	//@
	//@
	//@
	//@
	//@
	try {
		models_users_tracking.update_users_tracking(datas,user_tracking_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			//@trích thông tin lỗi hiễn thị cho khách hàng
			var message_error = default_field.get_message_error(error);

			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "4", "position":"ctl-users-tracking->update", "message": error_send } ); 
			return;
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi update store, vui lòng liên hệ admin" );
			res.send({ "error" : "5", "position":"ctl-users-tracking->update", "message": error_send } );
			return;
	}	
}
catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi update store, vui lòng liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-users-tracking->update", "message": error_send } );
		return;
}		
}

//@@ * end of  4. [update_users_tracking]


//@@
//@@
//@@
//@@
//@@
//@* 5. [delete_users_tracking]
async  function delete_users_tracking(req, res, next) {
try {	
	//@
	//@	get datas req
	try {
		var user_tracking_id = req.params.user_tracking_id;
		var token = req.headers['token'];
		
		//res.send([token]);
		//return;
		
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-users-tracking->delete", "message": error_send } );
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
		res.send({ "error" : "2", "position":"ctl-users-tracking->delete", "message": error_send } );
		return;			
	}
	
	
	
	
	
	//res.send(check_datas_result);
	//return;
		
	
	//@
	//@	
	//@
	//@
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin") {} else{
		
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"Bạn không đủ quyền thao tác, hoặc đơn hàng đã hoàn thành , không thể update", 
			"Bạn không đủ quyền thao tác" 
		);
		res.send({ "error" : "3", "position":"ctl-users-tracking->delete", "message": error_send } );
		return;		
		
	}		
	
	
	//res.send(["ok"]);
	//return;
	



	//@
	//@
	//@ 
	//@
	//@ 
	//@	
	try {
		models_users_tracking.delete_users_tracking(user_tracking_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "4", "position":"ctl-users-tracking->delete", "message": error_send } );
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete data - liên hệ admin" );
			res.send({ "error" : "5", "position":"ctl-users-tracking->delete", "message": error_send } );
			return;	
	}	
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete data - liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-users-tracking->delete", "message": error_send } );
		return;	
}	
}
//@* end of  5. [delete_users_tracking]






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
		res.send({ "error" : "1", "position":"ctl-users-tracking->search", "message": error_send } ); 
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
		res.send({ "error" : "2", "position":"ctl-users-tracking->search", "message": error_send } ); 
		return;			
	}




	//res.send(check_datas_result);
	//return;




	//@
	//@
	if(check_datas_result.user_role == "admin" 
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "default"  
	|| check_datas_result.user_role == "customer" 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, 
		"Bạn không đủ quyền thao tác, chỉ có admin mới search all", 
		"Bạn không đủ quyền thao tác, chỉ có admin mới search all" );
		res.send({ "error" : "3", "position":"ctl-users-tracking->search", "message": error_send } ); 
		return;	
	}		

	
	
	
	//@
	//@
	//@
	//@ run
	try {
		models_users_tracking.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : "4", "position":"ctl-users-tracking->search", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
			res.send({ "error" : "5", "position":"ctl-users-tracking->search", "message": error_send } ); 
			return;	
	}
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search cửa hàng, liên hệ admin" );
		res.send({ "error" : "113", "position":"ctl-users-tracking->search", "message": error_send } ); 
		return;	
}
}

//end of 6. [search] 









module.exports = { 
		search,
		insert_users_tracking,
		get_one_users_tracking,
		update_users_tracking,
		delete_users_tracking,
		get_all_users_tracking,
		unlock_users_tracking
};


























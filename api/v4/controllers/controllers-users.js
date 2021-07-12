/*


@
@
@
@

* 1. [register-app]

* 2. [login-app]

* 3. [get_all_users]

* 4. [get_one_user]

* 5. [update_users]

* 6. [get_verification_code]


* 7. [verification_code]

* 8. [lost_password]

* 9. [login]


* 10. [insert_users]



* 11. [search]


* 12. [delete]


* 13. [check_token]




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
const default_field = require('../const-tables/const-tables-users');


//@
//@
//configs/config
const ojs_configs = require('../../../configs/config');



//@
//@
//function share
const ojs_shares_show_errors = require('../../../models/ojs-shares-show-errors');
const ojs_shares_send_code_to_phone = require('../../../models/ojs-shares-send-code-to-phone');
const ojs_shares_others = require('../../../models/ojs-shares-others');
const ojs_shares_send_email = require('../../../models/ojs-shares-send-email');
const ojs_shares_owner = require('../function-shares/ojs-shares-owner');
const ojs_shares_date = require('../../../models/ojs-shares-date');
const ojs_shares_fetch_data= require('../../../models/ojs-shares-fetch-data');




//@
//@
//model
const models_token = require('../models/models-token');
const models_users = require('../models/models-users');










//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//1. [register-app]
//đăng ký user trên app
//
async function register_app(req, res, next) {
	
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controller_users->register_app->error_number : 1", "message": error_send } ); 
		return;	
	}		
	//@
	//@
	//@
	// gộp data database version
	
	try {
		var datas_assign;
		var version_default = {
			"users_router_version":ojs_configs.router_version,
			"users_js_css_version":ojs_configs.js_css_version,
			"users_api_version":ojs_configs.api_version,
			"users_view_version":ojs_configs.view_version,
		};
		
		datas_assign = Object.assign(default_field.default_fields, version_default);
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi gộp đầu vào data version, vui lòng liên hệ cskh dala" );
		res.send({ "error" : "controller_users->register_app->error_number : 2", "message": error_send } ); 
		return;	
	}		
	

	//@
	//@
	//@
	// check đầu vào data	
	try {
		//@
		//gop voi data drfault field in mysql database
		var datas_assign_check = Object.assign(datas_assign, datas);
		
		//@
		//neu data không hợp lệ thì return loi;
		let data_check = default_field.check_datas(datas_assign_check);
		
		//@
		//return data check
		if(data_check != 0){
			res.send({"error" : "1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi check đầu vào data, Vui lòng liên hệ cskh DALA" );
		res.send({ "error" : "controller_users->register_app->error_number : 3", "message": error_send } ); 
		return;	
	}			

	
	//@
	//@
	//@
	//insert users
	try {
		//@
		//@
		// cố định user_type = 15 (user type customer)
		var datas_insert_users_type = {
			"users_users_type_id":15
		};
		//@
		var datas_insert = Object.assign(datas_assign_check, datas_insert_users_type);
		
		//@
		//@
		// register
		models_users.insert_users(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			//@
			//@
			//datatype error
			var message_error = default_field.get_message_error(error);
			
			//@
			//@
			//return				
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error );
			res.send({ "error" : "controller_users->register_app->error_number : 4", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "controller_users->register_app->error_number : 5", "message": error_send } ); 
		return;
	}	
}

//1. end of [register-app] 





//@
//@
//@
//@
//2. [login-app] 
//@
const login_app = async function (req, res, next) {
	
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		//res.send(datas);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controller_users->login_app->error_number : 1", "message": error_send } ); 
		return;	
	}	
	
	//@
	//@
	//@
	//@
	try{
		var login_one = await models_users.login(datas);
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controller_users->login_app->error_number : 1", "message": error_send } ); 
		return;	
	}	
	
	
	//@
	//@
	//@
	try{
		var login_one_lost = await models_users.login_lost(datas);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controller_users->login_app->error_number : 1", "message": error_send } ); 
		return;	
	}		
	
	
	//@
	//@
	//@
	//nếu pass word đúng
	if(login_one.length > 0 || login_one_lost.length > 0){
		//@
		//@
		//@
		var results;
		if(login_one.length > 0){
			results = login_one;
		}else{
			results = login_one_lost;
		}
		

		

		try {	
			//@
			//@
			// lấy role text
			var role_text = ojs_shares_others.check_role(results[0].users_type_infomation);
			
			//res.send(role_text);
			//return;
			
			if(role_text =="admin"){
				res.send("Lỗi phân quyền -> Admin chỉ login trên web manage");
				return;
			}
			if(role_text =="default"){
				res.send("Lỗi phân quyền -> guest users không cần  login ");
				return;
			}
			if(role_text =="supper-job"){
				res.send("Lỗi phân quyền -> supper-job users không cần  login ");
				return;
			}				
			//@
			//@
			//tạo token send data
			var payload = { 
				"users_ID": results[0].users_ID, 
				"users_full_name" :  results[0].users_full_name, 
				"user_role":role_text
			};
			var token = jwt.sign(payload, ojs_configs.jwt_secret, {});
	
		}
		catch (error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi jwt, liên hệ CSKH DALA" );
			res.send({ "error" : "controller_users->login_app->error_number : 6", "message": error_send } ); 
			return;	
		}
		
		//res.send(token);
		//return;
		

		
		//@
		//@
		//@
		//@
		try {
	
			//@
			//@
			//tạo token database data				
			var payload_database = { 
				"users_ID": results[0].users_ID, 
				"users_full_name": results[0].users_full_name,
				"users_phone": results[0].users_phone,
				"users_email": results[0].users_email,
				"users_password":results[0].users_password,
				"user_role":role_text
			};
			
			var token_database = jwt.sign(payload_database, ojs_configs.jwt_secret, {});				
			
			
			var data_insert = {
				"datas": {
					"token_key": token,
					"token_value": token_database
				}
			}
		}
		catch (error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi jwt 2, liên hệ CSKH DALA" );
			res.send({ "error" : "controller_users->login_app->error_number : 7", "message": error_send } ); 
			return;	
		}


		//res.send(token);
		//return;
		
		//@
		//@
		//@
		//update lost qua password
		try{
			if(login_one_lost.length > 0){
				var update_lost = await models_users.update_lost_password(datas);		
			}
		}
		catch (error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi jwt 2, liên hệ CSKH DALA" );
			res.send({ "error" : "controller_users->login_app->error_number : 7", "message": error_send } ); 
			return;	
		}

		//res.send({ "error" : "", "datas": update_lost } ); 
		//return;	


		try {
			models_token.insert_token(data_insert).then( results => {
				let datas_return = { "error" : "","token" : token,"datas" : payload };
				res.send( datas_return );
				return;
			}, error => {
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi insert token database, Liên hệ CSKH DALA" );
				res.send({ "error" : "controller_users->login_app->error_number : 3", "message": error_send } ); 
				return;
			});
		}
		catch (error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi đăng nhập users, liên hệ CSKH DALA" );
			res.send({ "error" : "controller_users->login_app->error_number : 8", "message": error_send } ); 
			return;	
		}	
		
	//@
	//@
	//@
	//@ nếu mật khẩu không đúng
	}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "user hoat mật khẩu không đúng", "user hoat mật khẩu không đúng" );
		res.send({ "error" : "controller_users->login_app->error_number : 4", "message": error_send } ); 
		return;		
	}
	
	//@
	//@

}//end of functions login;

//2. end of [login-app] 











//
//@@
//@@
//@@
//@@
//3.  [get_all_users]
//@
async function get_all_users(req, res, next) {
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
		res.send({ "error" : "controller_users->get_all_users->get req -> error_number : 1", "message": error_send } ); 
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
		res.send({ "error" : "controller_users->get_all_users->check_role -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	//res.send(check_datas_result);
	//return;
	
	
	if(check_datas_result.user_role == "admin" || check_datas_result.user_role == "supper-job" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controller_users->get_all_users->check_role -> error_number : 3", "message": error_send } ); 
		return;				
	}
		
	//@
	//@
	//@
	// lấy users list
	try {
		models_users.get_all_users().then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get datas user, Liên hệ bộ phận HTKT dala" );
			res.send({ "error" : "controller_users->get_all_users->error_number : 6", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi get datas user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controller_users->get_all_users->error_number : 5", "message": error_send } ); 
		return;
	}	
}

//3. end of  [get_all_users]



//
//@@
//@@
//@@
//@@
//4. [get_one_users]
async function get_one_users(req, res, next) {
	
	
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var user_id = req.params.user_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controller_users->get_one_users->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//
	
	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		return { "error" : "ojs_shares->get_one_users->check_token_empty->error_number : 2", "message": error_send } ; 			
	}	
		
	
	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"user_id":user_id
		}
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controller_users->get_one_users->check_role -> error_number : 2", "message": error_send } ); 
		return;			
	}
	

	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_user == "1" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controller_users->get_one_users->check_role -> error_number : 3", "message": error_send } ); 
		return;			
	}
		
		
	//@;
	//@
	//@
	//@ * get data 
	try {
		models_users.get_one_users(user_id).then( results => {
			
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

//4. end of  [get_one_users]







//
//@@
//@@
//@@
//@@
//5. [update_users]
// chỉ có admin và chủ sỡ hữ mới uodate được
async function update_users(req, res, next) {
	
	

	
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var user_id = req.params.user_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controller_users->update_users->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		return { "error" : "ojs_shares->update_users->check_token_empty->error_number : 2", "message": error_send } ; 			
	}	
		
	//res.send(datas);
	//return;

	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"user_id":user_id
		}
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controller_users->update_users->check_role -> error_number : 2", "message": error_send } ); 
		return;			
	}
	


	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_user == "1" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controller_users->update_users->check_role -> error_number : 3", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	// nếu là user guest thì kho6nf cho update
	if( check_datas_result.user_role == "default" ){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Users guest không update", "Users guest không update" );
		res.send({ "error" : "controller_users->update_users->check_role -> error_number : 4", "message": error_send } ); 
		return;			
	}	

	//@
	//@
	// nếu có users type và không pahi3 admin thi thoat ra
	if(datas.users_users_type_id  &&  check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Chỉ có admin mới có quyền thay đổi users type ", "Chỉ có admin mới có quyền thay đổi users type" );
		res.send({ "error" : "controller_users->update_users->check_role -> error_number : 5", "message": error_send } ); 
		return;	
	}	



	//@
	//@
	// check data user login type
	if(datas.users_login_name){
		try{
			var regex = /^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$/;
			var name_check = datas.users_login_name;
			//@
			//@
			//check type
			if (regex.test(name_check)) {
				//@
				//if data type là email			
				var datas_email_field = {
					"users_email":name_check
				};
				//@
				var datas_insert = Object.assign(datas, datas_email_field);


			} else {
				//@
				//if data type là phone
				var datas_phone_field = {
					"users_phone":name_check
				};
				//@
				var datas_insert = Object.assign(datas, datas_phone_field);
			}
			
			delete datas_insert.users_login_name;
			
		}
		catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi chuyển đổi data type, Liên hệ bộ phan HTKT dala" );
				res.send({ "error" : "controller_users->update_users->change type->error_number : 1", "message": error_send } ); 
				return;	
		}		
	}
	
	
	//@
	//@
	//@
	var datas_insert = datas;

	//res.send([datas_insert,user_id]);
	//return;

	//@
	//@
	//@
	try {
		models_users.update_users(datas_insert,user_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			
			let message_error = default_field.get_message_error(error);
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error );
			res.send({ "error" : "controller_users->update_users-> error_number : 4", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
			res.send({ "error" : "controller_users->update_users-> catch-end->error_number : 5", "message": error_send } ); 
			return;	
	}	
}


//5. end of  [update_users]







//
//@@
//@@
//@@
//@@
//* 6. [get_verification_code]
async function get_verification_code(req, res, next) {
	
	//@
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var de_token = jwt.decode(token);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req get_verification_code, Liên hệ HTKT dala" );
		res.send({ "error" : "controller_users->get_verification_code->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	

	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		return { "error" : "ojs_shares->get_verification_code->check_token_empty->error_number : 2", "message": error_send } ; 			
	}	
		
	
	//@
	//@
	//@lấy data users
	try {
		models_users.get_one_users(de_token.users_ID).then( results => {
			//@
			//@
			//@ nếu có datas
			if(results.length > 0){
				//@
				//@
				//kiểm tra user đã xác thực số dt chưa
				//nếu xác thực rùi thì return
				//nếu chưa xác thực thì gữi max xác thực
				if(results[0].users_verification_status == "0"){
					//@
					//@
					var verification_code = Math.floor(1000 + Math.random() * 9000);
					//@
					//@
					//@
					// lưu code vào database
					try {
						
						var datas_verification = {
							"users_verification_code":verification_code,
							"users_verification_time":ojs_shares_date.get_current_date_now()
						}
						//res.send(datas_verification);
						//return;	
						
						//@
						//@
						//@ lưu verification code
						models_users.update_users(datas_verification,de_token.users_ID).then( results2 => {
							//@
							//@
							//send data
							
							
							ojs_shares_send_code_to_phone.send_code_to_phone(res,verification_code,results[0].users_phone);
							
							//res.send( {"error" : "", "code" : verification_code} );
							//return;
								
						}, error => {
							
							let message_error = default_field.get_message_error(error);
							
							var evn = ojs_configs.evn;
							//evn = "dev";
							var error_send = ojs_shares_show_errors.show_error( evn, error, message_error );
							res.send({ "error" : "controller_users->get_verification_code->update_users-> error_number : 4", "message": error_send } ); 
							return;	
						});
					}
					catch(error){
						var evn = ojs_configs.evn;
						//evn = "dev";
						var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
						res.send({ "error" : "controller_users->get_verification_code->update_users-> catch-end->error_number : 5", "message": error_send } ); 
						return;	
					}	
					
				}else{
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, "users đã xác thực", "users đã xác thực" );
					res.send({ "error" : "controller_users->get_verification_code->update_users-> catch-end->error_number : 6", "message": error_send } ); 
					return;					
				}
			//@
			//@
			//@ nếu không có datas
			}else{
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, error, "Không tìm thấy users" );
					res.send({ "error" : "controller_users->get_verification_code->update_users-> catch-end->error_number : 7", "message": error_send } ); 
					return;				
			}
			
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data user, liên hệ bộ phận HTKT dala" );
			res.send({ "error" : "controller_users->get_verification_code->update_users-> catch-end->error_number : 8", "message": error_send } ); 
			return;			
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data user, liên hệ bộ phận HTKT dala" );
			res.send({ "error" : "controller_users->get_verification_code->update_users-> catch-end->error_number : 9", "message": error_send } ); 
			return;	
	}	

}
//* end of  6. [get_verification_code]





//
//@@
//@@
//@@
//@@
//* 7. [verification_code]
async function verification_code(req, res, next) {
	
	//@
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var datas = req.body.datas;
		var user_id = datas.users_ID;
		//res.send([token,datas,user_id]);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req get_verification_code, Liên hệ HTKT dala" );
		res.send({ "error" : "controller_users->verification_code->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	

	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		return { "error" : "ojs_shares->verification_code->check_token_empty->error_number : 2", "message": error_send } ; 			
	}	
		
	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"user_id":user_id
		}
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controller_users->verification_code->check_role -> error_number : 2", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	// nếu không phải chủ sở hữ user thì return error
	if(check_datas_result.owner_user != "1" ){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controller_users->verification_code->check_role -> error_number : 3", "message": error_send } ); 
		return;			
	}	

	try{
		models_users.get_one_users(user_id).then( results => {
			//@
			//@
			//@ nếu có datas
			if(results.length > 0){
				//@
				//@
				//kiểm tra user đã xác thực số dt chưa
				//nếu xác thực rùi thì return
				//nếu chưa xác thực thì gữi max xác thực
				if(results[0].users_verification_status == "1"){
					res.send({ "error" : "controller_users->verification_code->get_one_users->->error_number : 10", "message": "User này đã xác thực rồi"} ); 
					return;						
				}
				
				//@
				//@
				// kiểm tra mã xác thực
				if(results[0].users_verification_code == datas.users_verification_code){
					//@
					//@
					//@
					//@
					//@
					//tinh htoi gian song cua code
					try {
						var date_now = Date.now();
						var date_database = Date.parse(results[0].users_verification_time);
						var date_live = date_now - date_database;
						var date_minute = Math.floor(date_live / ( 60 * 1000 ));
						//@
						//@
						// nếu quá hạn 10 phú thì là hết hạn
						if(date_minute > 10 ){
							res.send({ "error" : "controller_users->verification_code->get_one_users->->error_number : 5", "message": "hết thời gian"} ); 
							return;	
						}
						
					}
					catch(error){
						var evn = ojs_configs.evn;
						//evn = "dev";
						var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi tính thời gian code live, Liên hệ bộ phan HTKT dala" );
						res.send({ "error" : "controller_users->verification_code->get_one_users->->error_number : 5", "message": error_send } ); 
						return;	
					}		

					//@
					//@
					// update verification status
					try {
						
						var datas_verification = {
							"users_verification_code":"",
							"users_verification_status":1
						}
						//res.send(datas_verification);
						//return;	
						
						//@
						//@
						//@ lưu verification code
						models_users.update_users(datas_verification,user_id).then( results => {
							//@
							//@
							//send data
							res.send( {"error" : "", "message" : "verification ok "} );
							return;

						}, error => {
							
							let message_error = default_field.get_message_error(error);
							
							var evn = ojs_configs.evn;
							//evn = "dev";
							var error_send = ojs_shares_show_errors.show_error( evn, error, message_error );
							res.send({ "error" : "controller_users->verification_code->update_users-> error_number : 4", "message": error_send } ); 
							return;	
						});
					}
					catch(error){
						var evn = ojs_configs.evn;
						//evn = "dev";
						var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
						res.send({ "error" : "controller_users->verification_code->update_users-> catch-end->error_number : 5", "message": error_send } ); 
						return;	
					}	
					
				}else{
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, "Mã xác thực không đúng hoặc đã hết hạn", "Mã xác thực không đúng hoặc đã hết hạn" );
					res.send({ "error" : "controller_users->verification_code->update_users-> catch-end->error_number : 6", "message": error_send } ); 
					return;					
				}
			//@
			//@
			//@ nếu không có datas
			}else{
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, error, "Không tìm thấy users" );
					res.send({ "error" : "controller_users->get_verification_code->update_users-> catch-end->error_number : 7", "message": error_send } ); 
					return;				
			}
			
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data user, liên hệ bộ phận HTKT dala" );
			res.send({ "error" : "controller_users->verification_code->update_users-> catch-end->error_number : 8", "message": error_send } ); 
			return;			
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data user, liên hệ bộ phận HTKT dala" );
			res.send({ "error" : "controller_users->verification_code->update_users-> catch-end->error_number : 9", "message": error_send } ); 
			return;	
	}	


}
//* end of  7. [verification_code]










//
//@@
//@@
//@@
//@@
//* 8. [lost_password]
async function lost_password(req, res, next) {
	
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		//res.send([datas]);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req get_verification_code, Liên hệ HTKT dala" );
		res.send({ "error" : "controller_users->lost_password->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	
	
	
	
	var regex = /^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$/;
	var name_check = datas.email_or_phone;

	if (regex.test(name_check)) {
		//@
		//@
		//@ nếu là email
		//get user data
		try {
			models_users.search_email( datas.email_or_phone ).then( results => {
				if(results.length  > 0) {
					
					
					var users_role = ojs_shares_others.check_role(results[0].users_type_infomation);
					//@
					//@
					// chỉ có khách hàng với chủ cửa hàng mới dc thay đổi mật khẩu
					if(users_role == "customer" || users_role == "bussiness"){
					}else{
						res.send({ "error" : "controller_users->verification_code->update_users-> error_number : 10", "message": "chỉ có customer hoặc bussiness mới dc lost password" } ); 
						return;					
					}
					
					//@
					//@
					//@ 
					let txt_md5 = md5(results[0].users_ID + Math.random());
					var txt_code = txt_md5.substring(1, 9);				
					
					//@
					//@
					// update verification status
					try {
						
						var datas_verification = {
							"users_password" : txt_code
						}
						//@
						//@
						//@ lưu verification code
						models_users.update_users_email(datas_verification,results[0].users_ID).then( results2 => {
							//@
							//@
							//send data
							
							var email_to = datas.email_or_phone;
							var email_title = "test email";
							var email_content = '<p> mật khẩu mới tại dala app : [' + txt_code + ']</p>';
							//@
							//@
							ojs_shares_send_email.send_email_lost_password(res,email_to,email_title,email_content);

						}, error => {
							
							let message_error = default_field.get_message_error(error);
							
							var evn = ojs_configs.evn;
							//evn = "dev";
							var error_send = ojs_shares_show_errors.show_error( evn, error, message_error );
							res.send({ "error" : "controller_users->verification_code->update_users-> error_number : 4", "message": error_send } ); 
							return;	
						});
					}
					catch(error){
						var evn = ojs_configs.evn;
						//evn = "dev";
						var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
						res.send({ "error" : "controller_users->lost_password->update_users_email->error_number : 5", "message": error_send } ); 
						return;	
					}					
				}else{
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
					res.send({ "error" : "controller_users->lost_password->update_users_email->error_number : 6", "message": error_send } ); 
					return;	
				}		
			}, error => {
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
				res.send({ "error" : "controller_users->lost_password->search_email->error_number : 7", "message": error_send } ); 
				return;		
			});
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
			res.send({ "error" : "controller_users->lost_password->search_email->error_number : 8", "message": error_send } ); 
			return;		
		}



	//@
	//@
	//@
	//@nếu data là số điện thoại
	//*
	//* 1. get all user theo phone
	//* 2. nếu có user thì update user password lost -> gữi tin nhắn về số DT
	//* 3. nếu ko có thì bào  user không tồn tại	
	} else {
		try{
			var datas_users =  await models_users.search_phone(datas.email_or_phone);
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search user phone, Liên hệ bộ phan HTKT dala" );
			res.send({ "error" : "controller_users->lost_password->search_phone->error_number : 1", "message": error_send } ); 
			return;				
		}
		
		//res.send(datas_users);
		//return;
		
		//@
		//nếu có users		
		if(datas_users.length > 0){
			
			//@
			//@
			//@tạo mật khẩu mới
			try{
				var n_password = Math.floor(1000 + Math.random() * 9000);
				var datas_users_update =  await models_users.update_users_phone(n_password,datas.email_or_phone);
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search user phone, Liên hệ bộ phan HTKT dala" );
				res.send({ "error" : "controller_users->lost_password->update_users_phone->error_number : 1", "message": error_send } ); 
				return;				
			}		

			//res.send( datas_users_update ); 
			//return;					
			
			//@
			//@
			//@gữi đến số điện thoại	
			try{
				ojs_shares_send_code_to_phone.send_code_to_phone(res,n_password,datas.email_or_phone);
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi gữi tin nhắn, Liên hệ bộ phan HTKT dala" );
				res.send({ "error" : "controller_users->lost_password->send_phone->error_number : 1", "message": error_send } ); 
				return;				
			}				
	
		}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "số Điện thoại không có trong hệ thống", "số Điện thoại không có trong hệ thống" );
			res.send({ "error" : "controller_users->lost_password->lost_password->check->error_number : 1", "message": error_send } ); 
			return;					
		}
		//res.send([datas_users_update]);
		//return;		
	}
}
//* end of  8. [lost_password]







//@
//@
//@
//@
//9. [login] 
//@
const login = function (req, res, next) {
	
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		//res.send(datas);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controller_users->login->error_number : 1", "message": error_send } ); 
		return;	
	}	
	//@
	//@
	//@
	//login
	models_users.login(datas).then( results => {
		//res.send(results);
		//return;
		//@//nếu login thành công
		if(results.length  > 0) {
			try {	
				//@
				//@
				// lấy role text
				var role_text = ojs_shares_others.check_role(results[0].users_type_infomation);
				if(role_text =="customer"){
					res.send("Lỗi phân quyền -> khách hàng chỉ login trên app");
					return;
				}
				if(role_text =="default"){
					res.send("Lỗi phân quyền -> guest users không cần  login ");
					return;
				}
				
				if(role_text =="supper-job"){
					res.send("Lỗi phân quyền -> job users không cần  login ");
					return;
				}				
				//@
				//@
				//tạo token send data
				var payload = { 
					"users_ID": results[0].users_ID, 
					"users_full_name" :  results[0].users_full_name, 
					"user_role":role_text
				};
				var token = jwt.sign(payload, ojs_configs.jwt_secret, {expiresIn: "2h"});
		
			}
			catch (error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi jwt, liên hệ CSKH DALA" );
				res.send({ "error" : "controller_users->login->error_number : 6", "message": error_send } ); 
				return;	
			}

			try {
		
				//@
				//@
				//tạo token database data				
				var payload_database = { 
					"users_ID": results[0].users_ID, 
					"users_full_name": results[0].users_full_name,
					"users_phone": results[0].users_phone,
					"users_email": results[0].users_email,
					"users_password":results[0].users_password,
					"user_role":role_text
				};
				
				var token_database = jwt.sign(payload_database, ojs_configs.jwt_secret, {expiresIn: "2h"});				
				
				
				var data_insert = {
					"datas": {
						"token_key": token,
						"token_value": token_database
					}
				}
			}
			catch (error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi jwt 2, liên hệ CSKH DALA" );
				res.send({ "error" : "controller_users->login->error_number : 7", "message": error_send } ); 
				return;	
			}



			try {
				models_token.insert_token(data_insert).then( results => {
					let datas_return = { "error" : "","token" : token,"datas" : payload };
					res.send( datas_return );
					return;
				}, error => {
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi insert token database, Liên hệ CSKH DALA" );
					res.send({ "error" : "controller_users->login->error_number : 3", "message": error_send } ); 
					return;
				});
			}
			catch (error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi đăng nhập users, liên hệ CSKH DALA" );
				res.send({ "error" : "controller_users->login->error_number : 8", "message": error_send } ); 
				return;	
			}	
			
		}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "user hoat mật khẩu không đúng", "user hoat mật khẩu không đúng" );
			res.send({ "error" : "controller_users->login->error_number : 4", "message": error_send } ); 
			return;
		}
	}, error => {
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi đăng nhập users, liên hệ CSKH DALA" );
		res.send({ "error" : "controller_users->login->error_number : 2", "message": error_send } ); 
		return;
	});	

}//end of functions login;

//9. end of [login] 




//@
//@
//@
//@
//10. [insert_users] 
//@
async function insert_users(req, res, next) {
	
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
		res.send({ "error" : "controller_users->register->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	
	//@
	//neu không có token thì trỏ ra login page
	if(typeof token == "undefined" || token == "" || token == null ){
		var evn = ojs_configs.evn;
		
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền truy cập  ", "Bạn không đủ quyền truy cập" );
		res.send({ "error" : "controller_users->register->error_number : 5", "message": error_send } ); 
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
		res.send({ "error" : "controller_users->insert_users->check_role -> error_number : 4", "message": error_send } ); 
		return;			
	}
	


	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controller_users->register->check_role -> error_number : 3", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	//@
	//@ gộp datas
	try {
		var datas_assign;
		var version_default = {
			"users_router_version":ojs_configs.router_version,
			"users_js_css_version":ojs_configs.js_css_version,
			"users_api_version":ojs_configs.api_version,
			"users_view_version":ojs_configs.view_version,
		};
		
		datas_assign = Object.assign(default_field.default_fields, version_default);
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi gộp đầu vào data version, vui lòng liên hệ cskh dala" );
		res.send({ "error" : "controller_users->register->error_number : 2", "message": error_send } ); 
		return;	
	}		
	

	//@
	//@
	//@
	// check đầu vào data	
	try {
		//@
		//gop voi data drfault field in mysql database
		var datas_assign_check = Object.assign(datas_assign, datas);
		
		//@
		//neu data không hợp lệ thì return loi;
		let data_check = default_field.check_datas(datas_assign_check);
		
		//@
		//return data check
		if(data_check != 0){
			res.send({"error" : "1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi check đầu vào data, Vui lòng liên hệ cskh DALA" );
		res.send({ "error" : "controller_users->register->error_number : 3", "message": error_send } ); 
		return;	
	}			

	
	//@
	//@
	//@
	//insert users
	try {
		//@
		//@
		// register
		models_users.insert_users(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			//@
			//@
			//datatype error
			var message_error = default_field.get_message_error(error);
			
			//@
			//@
			//return				
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error );
			res.send({ "error" : "controller_users->register->error_number : 4", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "controller_users->register->error_number : 5", "message": error_send } ); 
		return;
	}	
}

//10. end of [register-app] 



//@
//@
//@
//@
//11. [search] 
//@
const search = async function (req, res, next) {
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
		res.send({ "error" : "controller_users->search->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	//@ kiểm tra xem có phải search user theo ids
	//@ nếu search theo id thì phải chủ sở hữu id mới dc searhc
	//@ nếu không pahỉ search theo id thì pahỉ là admin mới dc search
	try{
		var check_condition_id = 0;
		var user_id = 0;
		if ( datas.condition  && typeof datas.condition !== 'undefined' ){
			
			for ( x in datas.condition){
				if(datas.condition[x].hasOwnProperty('where') && datas.condition[x].where.length > 0){
					
					for ( z in datas.condition[x].where){
						if( datas.condition[x].where[z].hasOwnProperty('field')  
							&& datas.condition[x].where[z].field == "users_ID"  
							&& datas.condition[x].where[z].hasOwnProperty('compare')    
							&& datas.condition[x].where[z].compare == "="  
						){
							check_condition_id = 1;
							user_id = datas.condition[x].where[z].value;
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
		res.send({ "error" : "controller_users->search->check_condition_id -> error_number : 1", "message": error_send } ); 
		return;			
	}		
	

	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		
		if(check_condition_id == 1){
			var datas_check = {
				"token":token,
				"user_id": user_id
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
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controller_users->search->check_role -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	
	//@
	//@
	//@ nếu không có lộc theo users id thì phải là admin
	if(check_condition_id == 0){
	if(check_datas_result.user_role == "admin" || check_datas_result.user_role == "supper-job" ){}else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác, chỉ có dmin mới search all", "Bạn không đủ quyền thao tác, chỉ có dmin mới search all" );
			res.send({ "error" : "controller_users->search->check_condition_id -> error_number : 2", "message": error_send } ); 
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_user != "1" &&  check_datas_result.user_role != "admin"){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user", "Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "controller_users->search->check_condition_id -> error_number : 2", "message": error_send } ); 
			return;			
		}			
	}

	

	//@@
	//@@
	//@@
	try {
		models_users.search(datas).then( results => {
			
			if(results.length  > 0) {
				res.send( { "error" : "", "datas" : results } );
				return;
			}else{
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi search users, liên hệ bộ phẫn HTKT dala", "Lỗi search users, liên hệ bộ phẫn HTKT dala" );
				res.send({ "error" : "controller_users->search->models_users.search -> error_number : 2", "message": error_send } ); 
				return;		
			}		
		}, error => {
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi search users, liên hệ bộ phẫn HTKT dala" );
				res.send({ "error" : "controller_users->search->models_users.search -> error_number : 3", "message": error_send } ); 
				return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi search users, liên hệ bộ phẫn HTKT dala" );
		res.send({ "error" : "controller_users->search->models_users.search -> error_number : 4", "message": error_send } ); 
		return;	
	}

}//

//11. end of  [search] 





//@
//@
//@
//@
//12. [delete] 
//@
async function delete_users(req, res, next) {
	//@
	//@
	//@
	//@	get datas req
	try {
		var user_id = req.params.user_id;
		var token = req.headers['token'];
		//@
		//@
		//@

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controller_users->delete_users->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	
	//@
	//neu không có token thì trỏ ra login page
	if(typeof token == "undefined" || token == "" || token == null ){
		var evn = ojs_configs.evn;
		
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền truy cập  ", "Bạn không đủ quyền truy cập" );
		res.send({ "error" : "controller_users->delete_users->error_number : 5", "message": error_send } ); 
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
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controller_users->delete_users->check_role -> error_number : 2", "message": error_send } ); 
		return;			
	}	
	
	
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controller_users->delete_users->error_number : 6", "message": error_send } ); 
		return;				
	}
	
	
	
	//@
	//@
	try {
		models_users.delete_users(user_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi delete users, liên hệ bộ phẫn HTKT dala" );
			res.send( { "error": "controller_users->delete_users->error_number : 7", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi delete users, liên hệ bộ phẫn HTKT dala" );
		res.send( { "error": "controller_users->delete_users->error_number : 8", "message" : error_send  } );
	}	

}






//@
//@
//@
//@
//13. [check-token] 
//@
const check_token = async function (req, res, next) {
	
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		
		if(!datas.token){
			res.send({ "error" : "controller_users->check-token->error_number : 1", "message": "Không có token" });
			return;
		}
		//@
		//@
		var token = datas.token;
		var newPayload = jwt.decode(token);
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controller_users->check-token->error_number : 2", "message": error_send } ); 
		return;	
	}	
	
	
	//@
	//@		
	//@
	//@
	//checktoken
	try{	
		//@
		//@
		//xac thực token
		jwt.verify(token, ojs_configs.jwt_secret, (err, decoded) =>{  
			//@
			//@
			//neu token het han
			if (err) {
				res.send({"error":"1","message":"Phiên làm việc đã hết hạn, hoặc token không hợp lệ"}); 
				return;		
			}else{
				//@
				//@
				//@				
				//kiểm tra mật khẩu lần nữa
				models_token.search(token).then( results => {

					//@
					//@
					//nếu có token database
					//giai decode token database lấy user_id
					if(Object.entries(results).length  > 0) {
						//@
						//@
						//@
						//decode token database
						var token_value_decode = jwt.decode(results[0].token_value);
						//res.send(token_value_decode);
						//return;
						//@
						//@
						//đăng nhập bằng user mật khẩu token database
						//nếu đăng nhập thành cong thì so sánh user đã thay đổi mật khẩu chưa
						models_users.get_one_users(token_value_decode.users_ID).then( results2 => {
	
							if(Object.entries(results2).length  > 0) {
								//res.send({"error":"sdda","message":results2})
								//return;
								//@
								//@
								//neu user va mat khau van trung khop thì tao mới token
								if(token_value_decode.users_phone == results2[0].users_phone   && token_value_decode.users_password == results2[0].users_password){
									res.send({ "error" : "0", "datas": newPayload} ); 
									return;	
								//@
								//@
								//nếu user đã thay đổi mật khẩu
								}else{
									res.send({ "error" : "routers_users->error_number-> 3", "message": "User đã thay đổi mật khẩu, vui lòng đăng nhập lại"} ); 
									return;								
								}
							}else{
								var evn = ojs_configs.evn;
								//evn = "dev";
								var error_send = ojs_shares.show_error( evn, "Phiên làm việc đã hết hạn", "Phiên làm việc đã hết hạn" );
								res.send({ "error" : "routers_users->error_number-> 4", "message": error_send } ); 
								return;	 				
							}
						//@
						//@
						//nếu đăng nhập không có user theo id token database
						}, error => {
							var evn = ojs_configs.evn;
							evn = "dev";
							var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy token database, Vui lòng liên hệ CSKH dala" );
							res.send({ "error" : "routers_users->error_number-> 5", "message": error_send } ); 
							return;	 		
						});		
					//@
					//@
					//nếu mật khẩu đã bị thay đổi							
					}else{
						var evn = ojs_configs.evn;
						//evn = "dev";
						var error_send = ojs_shares.show_error( evn, "token đã hết hạn hoặc user đã thây đổi mật khẩu", "token đã hết hạn hoặc user đã thây đổi mật khẩu" );
						res.send({ "error" : "routers_users->error_number-> 6", "message": error_send } ); 
						return;			
					}
					
				//@
				//@
				//@
				//	kiểm tra đăng nhập lần nữa thất bại				
				}, error => {
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares.show_error( evn, "không có database token", "không có database token" );
					res.send({ "error" : "routers_users->error_number-> 7", "message": error_send } ); 
					return;	
				});	
			}//  end of token error check
		});
		//@
		//@
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, "token đã hết hạn hoặc không hợp lệ", "server đang bận, truy cập lại sau" );
		res.send({ "error" : "routers_users->error_number-> 8", "message": error_send } ); 
		return;	  
	}	
	
	//@
	//@	
}//end of functions login;

//2. end of [login-app] 

















module.exports = { 
		login,
		search,
		get_all_users,
		get_one_users,
		update_users,
		insert_users,
		delete_users,
		register_app,
		login_app,
		get_verification_code,
		verification_code,
		lost_password,
		check_token
};







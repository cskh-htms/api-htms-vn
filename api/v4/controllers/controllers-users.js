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




*/


//@ app express
var express = require('express');
var router = express.Router();

//@
//@
//@
// npm exstands
const jwt = require('jsonwebtoken');
const md5 = require('md5');

//database model
const default_field = require('../const-tables/const-tables-users');


//@
//@
//configs/config
//function share
const ojs_configs = require('../../../configs/config');
const ojs_shares = require('../../../models/ojs-shares');



const models_token = require('../models/models-token');
const models_users = require('../models/models-users');
const models_stores = require('../models/models-stores');
const models_orders_spaciality = require('../models/models-orders-spaciality');
const models_reviews_spaciality = require('../models/models-reviews-spaciality');
const models_comments_spaciality = require('../models/models-comments-spaciality');











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
		var error_send = ojs_shares.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
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
		var error_send = ojs_shares.show_error( evn, error, "Lỗi gộp đầu vào data version, vui lòng liên hệ cskh dala" );
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
		var error_send = ojs_shares.show_error( evn, error, "Lỗi check đầu vào data, Vui lòng liên hệ cskh DALA" );
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
			var error_send = ojs_shares.show_error( evn, error, message_error );
			res.send({ "error" : "controller_users->register_app->error_number : 4", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
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
const login_app = function (req, res, next) {
	
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
		var error_send = ojs_shares.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "controller_users->login_app->error_number : 1", "message": error_send } ); 
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
				var role_text = ojs_shares.check_role(results[0].users_type_infomation);
				if(role_text =="admin"){
					res.send("Lỗi phân quyền -> Admin chỉ login trên web manage");
					return;
				}
				if(role_text =="default"){
					res.send("Lỗi phân quyền -> guest users không cần  login ");
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
				var error_send = ojs_shares.show_error( evn,error, "Lỗi jwt, liên hệ CSKH DALA" );
				res.send({ "error" : "controller_users->login_app->error_number : 6", "message": error_send } ); 
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
				var error_send = ojs_shares.show_error( evn,error, "Lỗi jwt 2, liên hệ CSKH DALA" );
				res.send({ "error" : "controller_users->login_app->error_number : 7", "message": error_send } ); 
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
					var error_send = ojs_shares.show_error( evn, error, "Lỗi insert token database, Liên hệ CSKH DALA" );
					res.send({ "error" : "controller_users->login_app->error_number : 3", "message": error_send } ); 
					return;
				});
			}
			catch (error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn,error, "Lỗi đăng nhập users, liên hệ CSKH DALA" );
				res.send({ "error" : "controller_users->login_app->error_number : 8", "message": error_send } ); 
				return;	
			}	
			
		}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn, "user hoat mật khẩu không đúng", "user hoat mật khẩu không đúng" );
			res.send({ "error" : "controller_users->login_app->error_number : 4", "message": error_send } ); 
			return;
		}
	}, error => {
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "Lỗi đăng nhập users, liên hệ CSKH DALA" );
		res.send({ "error" : "controller_users->login_app->error_number : 2", "message": error_send } ); 
		return;
	});	

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
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controller_users->get_all_users->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//
	
	//@
	//@
	//neu không có token thì return
	if(token == "" || token == null || token == undefined){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		return { "error" : "ojs_shares->get_all_users->check_token_empty->error_number : 2", "message": error_send } ; 			
	}	
	
	
	
	
	
	
	
	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token
		}
		
		var check_datas_result;		
		check_datas_result = await ojs_shares.get_check_data(datas_check);
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controller_users->get_all_users->check_role -> error_number : 2", "message": error_send } ); 
		return;			
	}
	
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
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
			var error_send = ojs_shares.show_error( evn, error, "Lỗi get datas user, Liên hệ bộ phận HTKT dala" );
			res.send({ "error" : "controller_users->get_all_users->error_number : 6", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn,error, "Lỗi get datas user, Liên hệ bộ phận HTKT dala" );
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
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
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
		var error_send = ojs_shares.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
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
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controller_users->get_one_users->check_role -> error_number : 2", "message": error_send } ); 
		return;			
	}
	

	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_user == "1" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
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

			let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_api_2", "message" : error_send  } );	

		});
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
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
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "controller_users->update_users->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		return { "error" : "ojs_shares->update_users->check_token_empty->error_number : 2", "message": error_send } ; 			
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
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controller_users->update_users->check_role -> error_number : 2", "message": error_send } ); 
		return;			
	}
	


	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_user == "1" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "controller_users->update_users->check_role -> error_number : 3", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	// nếu là user guest thì kho6nf cho update
	if(check_datas_result.user_role == "default" ){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Users guest không update", "Users guest không update" );
		res.send({ "error" : "controller_users->update_users->check_role -> error_number : 4", "message": error_send } ); 
		return;			
	}	

	//@
	//@
	// nếu có users type và không pahi3 admin thi thoat ra
	if(datas.users_users_type_id  &&  check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Chỉ có admin mới có quyền thay đổi users type ", "Chỉ có admin mới có quyền thay đổi users type" );
		res.send({ "error" : "controller_users->update_users->check_role -> error_number : 5", "message": error_send } ); 
		return;	
	}	



	//@
	//@
	// check data user login type
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
			var error_send = ojs_shares.show_error( evn, error, "Lỗi chuyển đổi data type, Liên hệ bộ phan HTKT dala" );
			res.send({ "error" : "controller_users->update_users->change type->error_number : 1", "message": error_send } ); 
			return;	
	}


	//res.send(datas_insert ); 
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
			var error_send = ojs_shares.show_error( evn, error, message_error );
			res.send({ "error" : "controller_users->update_users-> error_number : 4", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
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
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy data req get_verification_code, Liên hệ HTKT dala" );
		res.send({ "error" : "controller_users->get_verification_code->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	

	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
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
							"users_verification_time":ojs_shares.get_current_date_now()
						}
						//res.send(datas_verification);
						//return;	
						
						//@
						//@
						//@ lưu verification code
						models_users.update_users(datas_verification,de_token.users_ID).then( results => {
							//@
							//@
							//send data
							res.send( {"error" : "", "code" : verification_code} );
							return;
							
							
							
							
							
						}, error => {
							
							let message_error = default_field.get_message_error(error);
							
							var evn = ojs_configs.evn;
							//evn = "dev";
							var error_send = ojs_shares.show_error( evn, error, message_error );
							res.send({ "error" : "controller_users->get_verification_code->update_users-> error_number : 4", "message": error_send } ); 
							return;	
						});
					}
					catch(error){
						var evn = ojs_configs.evn;
						//evn = "dev";
						var error_send = ojs_shares.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
						res.send({ "error" : "controller_users->get_verification_code->update_users-> catch-end->error_number : 5", "message": error_send } ); 
						return;	
					}	
					
				}else{
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares.show_error( evn, "users đã xác thực", "users đã xác thực" );
					res.send({ "error" : "controller_users->get_verification_code->update_users-> catch-end->error_number : 6", "message": error_send } ); 
					return;					
				}
			//@
			//@
			//@ nếu không có datas
			}else{
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares.show_error( evn, error, "Không tìm thấy users" );
					res.send({ "error" : "controller_users->get_verification_code->update_users-> catch-end->error_number : 7", "message": error_send } ); 
					return;				
			}
			
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn, error, "Lỗi get data user, liên hệ bộ phận HTKT dala" );
			res.send({ "error" : "controller_users->get_verification_code->update_users-> catch-end->error_number : 8", "message": error_send } ); 
			return;			
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn, error, "Lỗi get data user, liên hệ bộ phận HTKT dala" );
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
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy data req get_verification_code, Liên hệ HTKT dala" );
		res.send({ "error" : "controller_users->verification_code->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	

	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
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
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "controller_users->verification_code->check_role -> error_number : 2", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	// nếu không phải chủ sở hữ user thì return error
	if(check_datas_result.owner_user != "1" ){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
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
						var error_send = ojs_shares.show_error( evn, error, "Lỗi tính thời gian code live, Liên hệ bộ phan HTKT dala" );
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
							var error_send = ojs_shares.show_error( evn, error, message_error );
							res.send({ "error" : "controller_users->verification_code->update_users-> error_number : 4", "message": error_send } ); 
							return;	
						});
					}
					catch(error){
						var evn = ojs_configs.evn;
						//evn = "dev";
						var error_send = ojs_shares.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
						res.send({ "error" : "controller_users->verification_code->update_users-> catch-end->error_number : 5", "message": error_send } ); 
						return;	
					}	
					
				}else{
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares.show_error( evn, "Mã xác thực không đúng hoặc đã hết hạn", "Mã xác thực không đúng hoặc đã hết hạn" );
					res.send({ "error" : "controller_users->verification_code->update_users-> catch-end->error_number : 6", "message": error_send } ); 
					return;					
				}
			//@
			//@
			//@ nếu không có datas
			}else{
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares.show_error( evn, error, "Không tìm thấy users" );
					res.send({ "error" : "controller_users->get_verification_code->update_users-> catch-end->error_number : 7", "message": error_send } ); 
					return;				
			}
			
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn, error, "Lỗi get data user, liên hệ bộ phận HTKT dala" );
			res.send({ "error" : "controller_users->verification_code->update_users-> catch-end->error_number : 8", "message": error_send } ); 
			return;			
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn, error, "Lỗi get data user, liên hệ bộ phận HTKT dala" );
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
		var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy data req get_verification_code, Liên hệ HTKT dala" );
		res.send({ "error" : "controller_users->lost_password->get req -> error_number : 1", "message": error_send } ); 
		return;			
	}	
	
	
	//@
	//@
	//@
	//get user data
	try {
		models_users.search_email(datas.users_email ).then( results => {
			if(results.length  > 0) {
				res.send( { "error" : "", "datas" : results } );
			}else{
				res.send( { "error": "ctl_1", "message" :  results } );
			}		
		}, error => {
			let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_2", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_3", "message" : error_send  } );
	}




}
//* end of  8. [lost_password]





















//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//register
async function register_users(req, res, next) {
	let datas = req.body.datas;
	//res.send(datas);
	//return;
	//@
	let datas_assign;
	
	
	try {
		var version_default = {
			"users_router_version":ojs_configs.router_version,
			"users_js_css_version":ojs_configs.js_css_version,
			"users_api_version":ojs_configs.api_version,
			"users_view_version":ojs_configs.view_version
		};
		
		datas_assign = Object.assign(default_field.default_fields, version_default);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "1_controller_users->register_users->version_default", "message": error_send } ); 
		return;	
	}		
	
	
	
	
	try {
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
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2_controller_users->register_users->datas_assign", "message": error_send } ); 
		return;	
	}			
	

	//@
	//@
	//@
	//insert users
	try {
		models_users.insert_users(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
			res.send({ "error" : "3_controller_users->register_users->models_users.insert_users", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "4_controller_users->register_users->models_users.insert_users", "message": error_send } ); 
		return;
	}	
}




//login 
const login = function (req, res, next) {
	let datas = req.body.datas;
	
	models_users.login(datas).then( results => {
		try {
			if(results.length  > 0) {
				const payload = { 
					"users_ID": results[0].users_ID, 
					"users_full_name" :  results[0].users_last_name + " " + results[0].users_first_name, 
					"users_name": results[0].users_name,
					"users_nice_name": ojs_shares.encrypt(datas.users_password), 
					"users_users_type_id": results[0].users_users_type_id,
					"users_type_infomation" : results[0].users_type_infomation
				};
				
				//res.send( { "error": "", "message" : payload } );
				//return;	
				
				
				
				var token = jwt.sign(payload, ojs_configs.jwt_secret, {
					expiresIn: "20d"
				});
				
				let datas_return = { "error" : "","token" : token,"datas" : payload };
				res.send( datas_return );	
			}else{
				res.send( { "error": "2", "message" : " users hoặc mật khẩu không đúng " } );
				return;
			}
		}
		catch (error){
			let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "server đang bận, truy cập lại sau" );
			res.send( { "error": "3", "message" : error_send } );	
		}
	}, error => {
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "4", "message" : error_send  } );
		return;
	});	
}//end of functions login;



//login 
const login_default = async function (req, res, next) {
	let datas = req.body.datas;
	models_users.login(datas).then( results => {
		try {
			if(results.length  > 0) {
				const payload = { 
					"users_ID": results[0].users_ID, 
					"users_full_name" :  results[0].users_last_name + " " + results[0].users_first_name, 
					"users_name": results[0].users_name,
					"users_nice_name": ojs_shares.encrypt(datas.users_password), 
					"users_users_type_id": results[0].users_users_type_id,
					"users_type_infomation" : results[0].users_type_infomation
				};
			
				var token = jwt.sign(payload, ojs_configs.jwt_secret, {
					expiresIn: "20d"
				});
				
				let datas_return = { "error" : "","token" : token,"datas" : payload };
				res.send( datas_return );	
			}else{
				res.send( { "error": "2", "message" : " users hoặc mật khẩu không đúng " } );
				return;
			}
		}
		catch (error){
			let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "server đang bận, truy cập lại sau" );
			res.send( { "error": "3", "message" : error_send } );	
		}
	}, error => {
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "4", "message" : error_send  } );
		return;
	});	
}//end of functions login;




//check token
function check_token(req, res, next) {
	let token = req.body.datas.token;
	var newPayload = jwt.decode(token);
	
	//res.send({ "error" : "", "datas": newPayload });
	//return;	
	
    if (token) {
	try{	
		jwt.verify(token, ojs_configs.jwt_secret, (err, decoded) =>{  
			if (err) {
		
				if(ojs_shares.check_role_default(newPayload.users_type_infomation) == true){
					//kiểm tra mật khẩu neu dung thi cap them token
					var datas_check = {
						"users_name" : newPayload.users_name,
						"users_password" : ojs_shares.decrypt(newPayload.users_nice_name)
					}
					
					models_users.check_token(datas_check).then( results => {
						if(Object.entries(results).length  > 0) {
							var  payload = { 
								"users_ID": newPayload.users_ID, 
								"users_full_name" :  newPayload.users_last_name + " " + newPayload.users_first_name, 
								"users_name": newPayload.users_name,
								"users_nice_name": newPayload.users_nice_name, 
								"users_users_type_id": newPayload.users_users_type_id,
								"users_type_infomation": newPayload.users_type_infomation
							};
							//@
							var token_new = jwt.sign(payload, ojs_configs.jwt_secret, {
								expiresIn: "20d"
							});
							//@
							res.send({ "error" : "", "token": token_new, "datas": payload });
							return;
						}else{
							let error_send = ojs_shares.show_error( ojs_configs.api_evn, " User hoặc mật khẩu không đúng", "server đang bận, truy cập lại sau" );
							res.send({ "error" : "111", "message": error_send } );   
							return;
						}
						
					}, error => {
						let error_send = ojs_shares.show_error( ojs_configs.api_evn,error, "server đang bận, truy cập lại sau" );
						res.send({ "error" : "3333", "message": error_send } );   
						return;
					});						
					
				}else{
					let error_send = ojs_shares.show_error( ojs_configs.api_evn, "Phiên làm việc đã hết hạn", "server đang bận, truy cập lại sau" );
					res.send({ "error" : "333", "message": error_send , "decode" : newPayload }); 
					return;					
				}

			} else {
				//tao pay load moi de tao token moi
				var newPayload = {
					"users_ID": decoded.users_ID, 
					"users_full_name" :  decoded.users_full_name,
					"users_name": decoded.users_name,
					"users_nice_name": decoded.users_nice_name, 
					"users_users_type_id": decoded.users_users_type_id,	
					"users_type_infomation": decoded.users_type_infomation									
				};
				//res.send({ "error" : "1111", "message": "token het han", "datas": newPayload });
				//return;
				
				
				var token_new = jwt.sign(newPayload, ojs_configs.jwt_secret, {
					expiresIn: "20d" 
				});

				//res.send({ "error" : "1111", "message": "token het han", "datas": token_new });
				//return;
				
				var datas_check = {
						"users_name" : newPayload.users_name,
						"users_password" : ojs_shares.decrypt(decoded.users_nice_name)
					}
					
				//res.send({ "error" : "1111", "message": "token het han", "datas": datas_check });
				//return;					
					
				//kiểm tra mật khẩu lần nữa
				models_users.check_token(datas_check).then( results => {
					if(Object.entries(results).length  > 0) {
						res.send({ "error" : "", "token": token_new, "datas": decoded });
					}else{
						let error_send = ojs_shares.show_error( ojs_configs.api_evn, " User hoặc mật khẩu không đúng", "server đang bận, truy cập lại sau" );
						res.send({ "error" : "2", "message": error_send } );   
					}
				}, error => {
					let error_send = ojs_shares.show_error( ojs_configs.api_evn,error, "server đang bận, truy cập lại sau" );
					res.send({ "error" : "3", "message": error_send } );   
				});	
				
			}
		});
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn,"Chuỗi token không hợp lệ hoặc token đã hết hạn", "server đang bận, truy cập lại sau" );
		res.send({ "error" : "3", "message": error_send } );   
	}		
	}

}





//check token
function check_token_app(req, res, next) {
	let token = req.body.datas.token;
	
	//res.send({ "error" : "", "datas": newPayload });
	//return;	
	
    if (token) {
		try{	
			jwt.verify(token, ojs_configs.jwt_secret, (err, decoded) =>{  
				if (err) {
					res.send({ "error" : "", "datas": "0" });
					return;

				} else {
					res.send({ "error" : "", "datas": "1" });
					return;				
				}
			});
		}
		catch(error){
			let error_send = ojs_shares.show_error( ojs_configs.api_evn,"Chuỗi token không hợp lệ hoặc token đã hết hạn", "server đang bận, truy cập lại sau" );
			res.send({ "error" : "1", "message": error_send } );   
		}		
	}else{
		res.send({ "error" : "2", "message": "không có token" });
		return;		
	}

}







//search users
const search = async function (req, res, next) {
	let datas = req.body.datas;
	//res.send(datas);
	try {
		models_users.search(datas).then( results => {
			if(results.length  > 0) {
				res.send( { "error" : "", "datas" : results } );
			}else{
				res.send( { "error": "ctl_1", "message" :  results } );
			}		
		}, error => {
			let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_2", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_3", "message" : error_send  } );
	}

}//end of functions login;





//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
function insert_users(req, res, next) {
	let datas = req.body.datas;
	//res.send(datas);
	//@
	let datas_assign;
	try {
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
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_1", "message" : error_send  } );
	}			
	
	//res.send(datas_assign);
	
	
	//@
	try {
		models_users.insert_users(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_2", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_3", "message" : error_send  } );
	}	
}


//
//@@
//@@
//@@@@@@@@@@
//@@@@@@@@@@
//@@
//@@
//insert
async function delete_users(req, res, next) {
	let user_id = req.params.user_id;
	let token = req.headers['token'];
	//
	//@@
	//@@
	let datas_check = {
		"token":token
	}
	
	//res.send(datas_check );	
	//return;		
	let check_datas_result;
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "1.controller_users->delete_users", "message": error_send } ); 
		return;			
	}
	
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		////evn = "dev";;
		var error_send = ojs_shares.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "11.controller_users->delete_users", "message": error_send } ); 
		return;				
	}
	
	
	
	//@
	//@
	try {
		models_users.delete_users(user_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "2_controller_Users->models_users.delete_users", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "3_controller_Users.delete_users", "message" : error_send  } );
	}	

}



module.exports = { 
		login,
		login_default,
		search,
		check_token,
		get_all_users,
		get_one_users,
		update_users,
		insert_users,
		delete_users,
		register_users,
		check_token_app,
		register_app,
		login_app,
		get_verification_code,
		verification_code,
		lost_password
};







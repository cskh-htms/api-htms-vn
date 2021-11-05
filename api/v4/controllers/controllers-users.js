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
const models_users_tracking = require('../models/models-users-tracking');









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
try {	
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn="dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "1", "position":"ctl-users->register_app", "message": error_send } );
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
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi gộp đầu vào data version, vui lòng liên hệ cskh dala" );
		res.send({ "error" : "2", "position":"ctl-users->register_app", "message": error_send } );
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
			res.send({ "error" : "3", "position":"ctl-users->register_app", "message": data_check } );
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn="dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi check đầu vào data, Vui lòng liên hệ cskh DALA" );
		res.send({ "error" : "4", "position":"ctl-users->register_app", "message": error_send } );
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
			res.send({ "error" : "5", "position":"ctl-users->register_app", "message": error_send } );
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn="dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "6", "position":"ctl-users->register_app", "message": error_send } ); 
		return;
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn="dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
	res.send({ "error" : "113", "position":"ctl-users->register_app", "message": error_send } ); 
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
try {	
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
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "1", "position":"ctl-users->login_app", "message": error_send } );  
		return;	
	}	
	
	
	
	//@
	//@
	//@
	//@ check login lock	
	try{
		var check_lock = await models_users.get_user_check_lock(datas);
		//res.send(check_lock);
		//return;
		//@
		//@
		//@
		if(check_lock.length > 0){
			if(check_lock[0].users_status == 1){
				res.send({ "error" : "2", "position":"ctl-users->login_app", "message": "Tài khoản đang bị lock, vui lòng liên hệ CSKH DALA"} );
				return;					
			}			
		}else{
			res.send({ "error" : "3", "position":"ctl-users->login_app", "message": "Không tìm thấy tài khoản trong hệ thống dala" } );
			return;				
		}

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "4", "position":"ctl-users->login_app", "message": error_send } );
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
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "5", "position":"ctl-users->login_app", "message": error_send } ); 
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
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "6", "position":"ctl-users->login_app", "message": error_send } ); 
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
			var token_type=0;
			var role_text = ojs_shares_others.check_role(results[0].users_type_infomation);
			
			//res.send(role_text);
			//return;
			
			if(role_text =="admin"){
				res.send({ "error" : "7", "position":"ctl-users->login_app", "message": "Lỗi phân quyền -> Admin chỉ login trên web manage" } ); 
				return;
			}
			if(role_text =="default"){
				res.send({ "error" : "8", "position":"ctl-users->login_app", "message": "Lỗi phân quyền -> guest users không cần  login "} ); 				
				return;
			}
			if(role_text =="supper-job"){
				res.send({ "error" : "9", "position":"ctl-users->login_app", "message": "Lỗi phân quyền -> supper-job users không cần  login "} ); 	
				return;
			}	

			if(role_text =="bussiness"){
				res.send({ "error" : "999", "position":"ctl-users->login_app", "message": "Lỗi phân quyền -> tài khoản doanh nghiệp không thể mua hàng"} ); 	
				return;
			}				

			if(role_text =="admin"){
				token_type = 1;
			}
			if(role_text =="bussiness"){
				token_type = 2;
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
			res.send({ "error" : "10", "position":"ctl-users->login_app", "message": error_send } );
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
				"users_password":md5(datas.users_password),
				"user_role":role_text
			};
			
			var token_database = jwt.sign(payload_database, ojs_configs.jwt_secret, {});				
			
			
			var data_insert = {
				"datas": {
					"token_key": token,
					'token_type':token_type,
					"token_value": token_database
				}
			}
		}
		catch (error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi jwt 2, liên hệ CSKH DALA" );
			res.send({ "error" : "11", "position":"ctl-users->login_app", "message": error_send } );
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
			res.send({ "error" : "12", "position":"ctl-users->login_app", "message": error_send } );
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
				res.send({ "error" : "13", "position":"ctl-users->login_app", "message": error_send } );
				return;
			});
		}
		catch (error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi đăng nhập users, liên hệ CSKH DALA" );
			res.send({ "error" : "14", "position":"ctl-users->login_app", "message": error_send } ); 
			return;	
		}	
		
	//@
	//@
	//@
	//@ nếu mật khẩu không đúng
	}else{
		
		//@
		//@
		//@
		//@ insert users tracking
		var datas_tracking = {
			"users_tracking_user_id": check_lock[0].users_ID,
			"users_tracking_action": "0",			
			"users_tracking_status": "1",
		}
		models_users_tracking.insert_users_tracking(datas_tracking);
		
		
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "user hoặc mật khẩu không đúng", "user hoặc mật khẩu không đúng" );
		res.send({ "error" : "15", "position":"ctl-users->login_app", "message": error_send } );
		return;		
	}
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi không xác định, Vui lòng liên hệ admin" );
	res.send({ "error" : "113", "position":"ctl-users->login_app", "message": error_send } );  
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
try {
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
		res.send({ "error" : "1", "position":"ctl-users->get_all_users", "message": error_send } ); 
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
		res.send({ "error" : "2", "position":"ctl-users->get_all_users", "message": error_send } ); 
		return;			
	}
	
	
	//res.send(check_datas_result);
	//return;
	
	
	if(check_datas_result.user_role == "admin" || check_datas_result.user_role == "supper-job" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-users->get_all_users", "message": error_send } ); 
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
			res.send({ "error" : "4", "position":"ctl-users->get_all_users", "message": error_send } );
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi get datas user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "5", "position":"ctl-users->get_all_users", "message": error_send } );
		return;
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi get datas user, Liên hệ bộ phận HTKT dala" );
	res.send({ "error" : "113", "position":"ctl-users->get_all_users", "message": error_send } );
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
try {	
	
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
		res.send({ "error" : "1", "position":"ctl-users->get_one", "message": error_send } );
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
		res.send({ "error" : "2", "position":"ctl-users->get_one", "message": error_send } );
		return;		
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
		res.send({ "error" : "3", "position":"ctl-users->get_one", "message": error_send } );
		return;			
	}
	

	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_user == "1" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "4", "position":"ctl-users->get_one", "message": error_send } ); 
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
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi lấy danh sách users, vui lòng liên hệ admin" );
			res.send({ "error" : "5", "position":"ctl-users->get_one", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi lấy danh sách users, vui lòng liên hệ admin" );
		res.send({ "error" : "6", "position":"ctl-users->get_one", "message": error_send } ); 
		return;	
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";;
	var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi lấy danh sách users, vui lòng liên hệ admin" );
	res.send({ "error" : "113", "position":"ctl-users->get_one", "message": error_send } ); 
	return;	
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
try {
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var datas_c = {...datas};
		var user_id = req.params.user_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-users->update", "message": error_send } ); 
		return;			
	}	
	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		res.send({ "error" : "2", "position":"ctl-users->update", "message": error_send } ); 
		return;		
	}	
		
	//res.send([datas,user_id]);
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
		res.send({ "error" : "3", "position":"ctl-users->update", "message": error_send } ); 
		return;			
	}
	

	//res.send(check_datas_result);
	//return;	



	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_user == "1" ){
		
		if( check_datas_result.user_role == "default" || check_datas_result.user_role == "supper-job"  ){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, "Users default - supper-job không update", "Users guest không update" );
			res.send({ "error" : "55", "position":"ctl-users->update", "message": error_send } );  
			return;	
		}
		
		
	}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "4", "position":"ctl-users->update", "message": error_send } ); 
		return;			
	}	
	
	//@
	//@
	// nếu là user guest thì kho6nf cho update
	if( check_datas_result.user_role == "default" || check_datas_result.user_role == "supper-job"  ){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Users guest không update", "Users guest không update" );
		res.send({ "error" : "5", "position":"ctl-users->update", "message": error_send } );  
		return;			
	}	

	//@
	//@
	// nếu có users type và không pahi3 admin thi thoặc ra
	if(datas.users_users_type_id  &&  check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, 
		"Chỉ có admin mới có quyền thay đổi users type ", 
		"Chỉ có admin mới có quyền thay đổi users type" );
		res.send({ "error" : "6", "position":"ctl-users->update", "message": error_send } ); 
		return;	
	}	




	//res.send(check_datas_result);
	//return;	



	//@
	//@
	// check data user login type
	var data_insert = {...datas};
	
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
				data_insert = Object.assign(datas_c, datas_email_field);


			} else {
				//@
				//if data type là phone
				var datas_phone_field = {
					"users_phone":name_check
				};
				//@
				data_insert = Object.assign(datas_c, datas_phone_field);
			}
			
			delete data_insert.users_login_name;
			
		}
		catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi chuyển đổi data type, Liên hệ bộ phan HTKT dala" );
				res.send({ "error" : "7", "position":"ctl-users->update", "message": error_send } ); 
				return;	
		}		
	}
	
	
	//@
	//@
	//@ nếu dữ liệu ko thâ đổi thì lấy dữ liệu gốc

	

	
	
	//@
	//@
	//@
	if(datas.users_password && datas.users_password.length > 0){
		var datas_p= {
			"users_password_lost":""
		};
		//@
		Object.assign(data_insert, datas_p);
	}
	

	
	

	//res.send([data_insert,user_id]);
	//return;

	//@
	//@
	//@
	try {
		models_users.update_users(data_insert,user_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			
			let message_error = default_field.get_message_error(error);
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error );
			res.send({ "error" : "8", "position":"ctl-users->update", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
		res.send({ "error" : "9", "position":"ctl-users->update", "message": error_send } );  
		return;	
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
	res.send({ "error" : "113", "position":"ctl-users->update", "message": error_send } );  
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
try {	
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
		res.send({ "error" : "1", "position":"ctl-users->get_verification_code", "message": error_send } );  
		return;			
	}	

	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		res.send({ "error" : "2", "position":"ctl-users->get_verification_code", "message": error_send } ); 
		return;
	}	
		
	//res.send(de_token);
	//return;
		
	
		
	//@
	//@
	//@
	//@ check login lock	
	try{
		var user_taget = await models_users.get_one_users(de_token.users_ID);
		
		if(user_taget.length > 0){
			var check_lock = await models_users.get_user_check_lock({"users_login_name": user_taget[0].users_phone });
			//@
			//@
			//@
			if(check_lock.length > 0){
				if(check_lock[0].users_status == 1){
					res.send({ 
					"error" : "3", 
					"position":"ctl-users->get_verification_code", 
					"message": "Tài khoản đang bị lock, vui lòng liên hệ CSKH DALA"  } ); 
					return;					
				}			
			}else{
				res.send({ 
				"error" : "4", 
				"position":"ctl-users->get_verification_code", 
				"message": "Không tìm thấy tài khoản trong hệ thống dala"} ); 
				return;					
			}			
		}else{			
			res.send({ 
			"error" : "5", 
			"position":"ctl-users->get_verification_code", 
			"message": "Không tìm thấy tài khoản trong hệ thống dala"} ); 
			return;					
		}

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "6", "position":"ctl-users->get_verification_code", "message": error_send } ); 
		return;	
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

							//@
							//@
							//@
							//@ insert users tracking
							var datas_tracking = {
								"users_tracking_user_id": de_token.users_ID,
								"users_tracking_action": "3",			
								"users_tracking_status": "1",
							}
							models_users_tracking.insert_users_tracking(datas_tracking);

							
							//res.send( {"error" : "", "code" : verification_code} );
							//return;
								
						}, error => {
							
							let message_error = default_field.get_message_error(error);
							
							var evn = ojs_configs.evn;
							//evn = "dev";
							var error_send = ojs_shares_show_errors.show_error( evn, error, message_error );
							res.send({ "error" : "7", "position":"ctl-users->get_verification_code", "message": error_send } ); 
							return;	
						});
					}
					catch(error){
						var evn = ojs_configs.evn;
						//evn = "dev";
						var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
						res.send({ "error" : "8", "position":"ctl-users->get_verification_code", "message": error_send } ); 
						return;	
					}	
					
				}else{
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, "users đã xác thực", "users đã xác thực" );
					res.send({ "error" : "9", "position":"ctl-users->get_verification_code", "message": error_send } );  
					return;					
				}
			//@
			//@
			//@ nếu không có datas
			}else{
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, error, "Không tìm thấy users" );
					res.send({ "error" : "10", "position":"ctl-users->get_verification_code", "message": error_send } ); 
					return;				
			}
			
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data user, liên hệ bộ phận HTKT dala" );
			res.send({ "error" : "11", "position":"ctl-users->get_verification_code", "message": error_send } ); 
			return;			
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data user, liên hệ bộ phận HTKT dala" );
			res.send({ "error" : "12", "position":"ctl-users->get_verification_code", "message": error_send } ); 
			return;	
	}	
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data user, liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "113", "position":"ctl-users->get_verification_code", "message": error_send } ); 
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
try {	
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
		res.send({ "error" : "1", "position":"ctl-users->verification_code", "message": error_send } ); 
		return;			
	}	

	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		res.send({ "error" : "2", "position":"ctl-users->verification_code", "message": error_send } );  
		return;
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
		res.send({ "error" : "3", "position":"ctl-users->verification_code", "message": error_send } ); 
		return;			
	}
	

	//@
	//@
	// nếu không phải chủ sở hữ user thì return error
	if(check_datas_result.owner_user != "1" ){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "4", "position":"ctl-users->verification_code", "message": error_send } ); 
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
					res.send({ 
					"error" : "5", 
					"position":"ctl-users->verification_code", 
					"message": "User này đã xác thực rồi" } ); 
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
							res.send({ 
							"error" : "6", 
							"position":"ctl-users->verification_code", 
							"message": "hết thời gian"} ); 
							return;								
						}
						
					}
					catch(error){
						var evn = ojs_configs.evn;
						//evn = "dev";
						var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi tính thời gian code live, Liên hệ bộ phan HTKT dala" );
						res.send({ "error" : "7", "position":"ctl-users->verification_code", "message": error_send } );  
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
							res.send({ "error" : "8", "position":"ctl-users->verification_code", "message": error_send } ); 
							return;	
						});
					}
					catch(error){
						var evn = ojs_configs.evn;
						//evn = "dev";
						var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
						res.send({ "error" : "9", "position":"ctl-users->verification_code", "message": error_send } ); 
						return;	
					}	
					
				}else{
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, 
					"Mã xác thực không đúng hoặc đã hết hạn", 
					"Mã xác thực không đúng hoặc đã hết hạn" );
					res.send({ "error" : "10", "position":"ctl-users->verification_code", "message": error_send } ); 
					return;					
				}
			//@
			//@
			//@ nếu không có datas
			}else{
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, error, "Không tìm thấy users" );
					res.send({ "error" : "11", "position":"ctl-users->verification_code", "message": error_send } );  
					return;				
			}
			
		}, error => {
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data user, liên hệ bộ phận HTKT dala" );
			res.send({ "error" : "12", "position":"ctl-users->verification_code", "message": error_send } ); 
			return;			
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data user, liên hệ bộ phận HTKT dala" );
			res.send({ "error" : "13", "position":"ctl-users->verification_code", "message": error_send } ); 
			return;	
	}	
}
catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data user, liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "113", "position":"ctl-users->verification_code", "message": error_send } ); 
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
	
try {	
	
	//res.send(md5(3993));
	//return;
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
		res.send({ "error" : "1", "position":"ctl-users->lost_password", "message": error_send } ); 
		return;			
	}	
	
	
	
	//@
	//@
	//@
	//@ check login lock	
	try{
		var check_lock = await models_users.get_user_check_lock({"users_login_name": datas.email_or_phone});
		//res.send(check_lock);
		//return;
		//@
		//@
		//@
		if(check_lock.length > 0){
			if(check_lock[0].users_status == 1){
				res.send({
					"error" : "2", 
					"position":"ctl-users->lost_password", 
					"message":"Tài khoản đang bị lock, vui lòng liên hệ CSKH DALA" } 
				); 
				return;					
			}			
		}else{
			res.send({
				"error" : "3", 
				"position":"ctl-users->lost_password", 
				"message": "Không tìm thấy tài khoản trong hệ thống dala" } 
			); 			
			return;				
		}

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn="dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "4", "position":"ctl-users->lost_password", "message": error_send } ); 
		return;	
	}	
	
	
	
	//@
	//@
	//@
	//@ insert users tracking
	var datas_tracking = {
		"users_tracking_user_id": check_lock[0].users_ID,
		"users_tracking_action": "1",			
		"users_tracking_status": "1",
	}
	models_users_tracking.insert_users_tracking(datas_tracking);	
	
	
	
	
	
	
	var regex = /^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$/;
	var name_check = datas.email_or_phone;

	//res.send([name_check]);
	//return;

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
						res.send({ 
						"error" : "5",
						"position":"ctl-users->lost_password", 
						"message": "chỉ có customer hoặc bussiness mới dc lost password" } ); 						
						return;					
					}
					
					
					//res.send([users_role]);
					//return;					
					//@
					//@
					//@ 
					//let txt_md5 = md5(results[0].users_ID + Math.random());
					//var txt_code = txt_md5.substring(1, 9);				
					var n_password = Math.floor(1000 + Math.random() * 9000);
					n_password = n_password.toString();
					
					
					//res.send([n_password]);
					//return;
					
					
					//@
					//@
					// update verification status
					try {
						
						var datas_verification = {
							"users_password" : n_password
						}
						//@
						//@
						//@ lưu verification code
						models_users.update_users_email(datas_verification,results[0].users_ID).then( results2 => {
							//@
							//@
							//send data
							//res.send(results2);
							//return;
							
							
							
							var email_to = datas.email_or_phone;
							var email_title = "test email";
							var email_content = '<p> mật khẩu mới tại dala app : [' + n_password + ']</p>';
							//@
							//@
							ojs_shares_send_email.send_email_lost_password(res,email_to,email_title,email_content);

						}, error => {
							
							let message_error = default_field.get_message_error(error);
							
							var evn = ojs_configs.evn;
							//evn = "dev";
							var error_send = ojs_shares_show_errors.show_error( evn, error, message_error );
							res.send({ "error" : "6", "position":"ctl-users->lost_password", "message": error_send } ); 
							return;	
						});
					}
					catch(error){
						var evn = ojs_configs.evn;
						//evn = "dev";
						var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
						res.send({ "error" : "7", "position":"ctl-users->lost_password", "message": error_send } );  
						return;	
					}					
				}else{
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( 
					evn, "Không tìm thấy email trong hệ thống DALA",
					"Không tìm thấy email trong hệ thống DALA" );
					res.send({ "error" : "8", "position":"ctl-users->lost_password", "message": error_send } ); 
					return;	
				}		
			}, error => {//enf model run
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
				res.send({ "error" : "9", "position":"ctl-users->lost_password", "message": error_send } );  
				return;		
			});
		}//enf of try cat
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi update user, Liên hệ bộ phan HTKT dala" );
			res.send({ "error" : "10", "position":"ctl-users->lost_password", "message": error_send } ); 
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
		
		//res.send([datas.email_or_phone]);
		//return;
		
		try{
			var datas_users =  await models_users.search_phone(datas.email_or_phone);
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search user phone, Liên hệ bộ phan HTKT dala" );
			res.send({ "error" : "11", "position":"ctl-users->lost_password", "message": error_send } ); 
			return;				
		}
		
		//res.send(datas_users);
		//return;
		
		//@
		//nếu có users		
		if(datas_users.length > 0){
			
			var users_role = ojs_shares_others.check_role(datas_users[0].users_type_infomation);
			//@
			//@
			// chỉ có khách hàng với chủ cửa hàng mới dc thay đổi mật khẩu
			if(users_role == "customer" || users_role == "bussiness"){
			}else{
				res.send({ 
				"error" : "12", 
				"position":"ctl-users->lost_password", 
				"message": "chỉ có customer hoặc bussiness mới dc lost password"} ); 				
				return;					
			}			
			
			
			//@
			//@
			//@tạo mật khẩu mới
			try{
				var n_password = Math.floor(1000 + Math.random() * 9000);
				n_password = n_password.toString();
				
				var datas_users_update =  await models_users.update_users_phone(n_password,datas.email_or_phone);
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi search user phone, Liên hệ bộ phan HTKT dala" );
				res.send({ "error" : "13", "position":"ctl-users->lost_password", "message": error_send } ); 
				return;				
			}		

			//res.send( datas_users_update ); 
			//return;					
			
			//@
			//@
			//@gữi đến số điện thoại	
			try{
				ojs_shares_send_code_to_phone.send_code_to_phone_lost_pass(res,n_password,datas.email_or_phone);
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi gữi tin nhắn, Liên hệ bộ phan HTKT dala" );
				res.send({ "error" : "14", "position":"ctl-users->lost_password", "message": error_send } );  
				return;				
			}				
	
		}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "số Điện thoại không có trong hệ thống", "số Điện thoại không có trong hệ thống" );
			res.send({ "error" : "15", "position":"ctl-users->lost_password", "message": error_send } ); 
			return;					
		}
		//res.send([datas_users_update]);
		//return;		
	}
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi không xác định, Liên hệ bộ phan HTKT dala" );
	res.send({ "error" : "113", "position":"ctl-users->lost_password", "message": error_send } );  
	return;				
}	
}
//* end of  8. [lost_password]



//@
//@
//@
//@
//9. [login] 
//@
const login = async function (req, res, next) {
try {	
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
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "1", "position":"ctl-users->login", "message": error_send } );  
		return;	
	}	
	
	
	//@
	//@
	//@
	//@ check login lock	
	//@ nếu bị kháo thì trả về
	try{
		var check_lock = await models_users.get_user_check_lock(datas);
		//res.send(check_lock);
		//return;
		//@
		//@
		//@
		if(check_lock.length > 0){
			if(check_lock[0].users_status == 1){
				res.send({ 
				"error" : "2", 
				"position":"ctl-users->login", 
				"message": "Tài khoản đang bị lock, vui lòng liên hệ CSKH DALA" } );  
				return;					
			}			
		}else{
			res.send({ 
			"error" : "3", 
			"position":"ctl-users->login", 
			"message": "Không tìm thấy tài khoản trong hệ thống dala, kiểm tra lại Email hoặc số điện thoại" } );  				
			return;				
		}

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn="dev";
		var error_send = ojs_shares_show_errors.show_error( evn,
		error, 
		"Lỗi check stauts lock, lấy trạng thái admin, Đây là lỗi hệ thống vui lòng liên hệ kỹ thuật DALA" );
		res.send({ "error" : "4", "position":"ctl-users->login", "message": error_send } ); 
		return;	
	}	
	
	//@
	//@
	//@
	//@ login bằng mật khẩu user
	try{
		var login_one = await models_users.login(datas);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi login, đây là lỗi hệ thống login, vui lòng liên hệ kỹ thuật" );
		res.send({ "error" : "5", "position":"ctl-users->login", "message": error_send } );
		return;	
	}	
	
	
	//@
	//@
	//@ logn bằng mật khẩu lost pass
	try{
		var login_one_lost = await models_users.login_lost(datas);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi login, đây là lỗi hệ thống login . vuilòng liên hệ admin" );
		res.send({ "error" : "6", "position":"ctl-users->login", "message": error_send } );
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
			var token_type=0;
			var role_text = ojs_shares_others.check_role(results[0].users_type_infomation);

			//res.send(role_text);
			//return;
			

			if(role_text =="default"){
				res.send({ 
				"error" : "7", 
				"position":"ctl-users->login", 
				"message": "Lỗi phân quyền -> guest users không cần  login "} );
				return;
			}
			if(role_text =="supper-job"){
				res.send({ 
				"error" : "8", 
				"position":"ctl-users->login", 
				"message":"Lỗi phân quyền -> supper-job users không cần  login "} );	
				return;
			}		
			

			if(role_text =="admin"){
				token_type = 1;
			}
			if(role_text =="bussiness"){
				token_type = 2;
			}		

			if(role_text =="shipping"){
				token_type = 3;
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
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi jwt role_text, liên hệ CSKH DALA" );
			res.send({ "error" : "9", "position":"ctl-users->login", "message": error_send } );
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
					'token_type':token_type,
					"token_value": token_database
				}
			}
		}
		catch (error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi jwt token_database, liên hệ CSKH DALA" );
			res.send({ "error" : "10", "position":"ctl-users->login", "message": error_send } );
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
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi update lost pass, liên hệ CSKH DALA" );
			res.send({ "error" : "11", "position":"ctl-users->login", "message": error_send } );
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
				res.send({ "error" : "12", "position":"ctl-users->login", "message": error_send } );
				return;
			});
		}
		catch (error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi đăng nhập users, liên hệ CSKH DALA" );
			res.send({ "error" : "13", "position":"ctl-users->login", "message": error_send } );
			return;	
		}	
		
	//@
	//@
	//@
	//@ nếu mật khẩu không đúng
	}else{
		
		//@
		//@
		//@
		//@ insert users tracking
		var datas_tracking = {
			"users_tracking_user_id": check_lock[0].users_ID,
			"users_tracking_action": "0",			
			"users_tracking_status": "1",
		}
		models_users_tracking.insert_users_tracking(datas_tracking);	
		
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "user hoặc mật khẩu không đúng", "user hoặc mật khẩu không đúng" );
		res.send({ "error" : "14", "position":"ctl-users->login", "message": error_send } );
		return;		
	}
	
	//@
	//@
}
catch (error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi không xác định, liên hệ CSKH DALA" );
	res.send({ "error" : "113", "position":"ctl-users->login", "message": error_send } );
	return;	
}	
}//end of functions login;

//9. end of [login] 




//@
//@
//@
//@
//10. [insert_users] 
//@
async function insert_users(req, res, next) {
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
		res.send({ "error" : "1", "position":"ctl-users->insert_users", "message": error_send } );
		return;			
	}	
	
	//@
	//neu không có token thì trỏ ra login page
	if(typeof token == "undefined" || token == "" || token == null ){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền truy cập  ", "Bạn không đủ quyền truy cập" );
		res.send({ "error" : "2", "position":"ctl-users->insert_users", "message": error_send } );
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
		res.send({ "error" : "3", "position":"ctl-users->insert_users", "message": error_send } );
		return;			
	}
	


	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "4", "position":"ctl-users->insert_users", "message": error_send } );
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
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi gộp đầu vào data version, vui lòng liên hệ cskh dala" );
		res.send({ "error" : "5", "position":"ctl-users->insert_users", "message": error_send } );
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
			res.send({ "error" : "6", "position":"ctl-users->insert_users", "message": data_check } );
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi check đầu vào data, Vui lòng liên hệ cskh DALA" );
		res.send({ "error" : "7", "position":"ctl-users->insert_users", "message": error_send } );
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
			res.send({ "error" : "8", "position":"ctl-users->insert_users", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "9", "position":"ctl-users->insert_users", "message": error_send } );
		return;
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
	res.send({ "error" : "113", "position":"ctl-users->insert_users", "message": error_send } );
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
		res.send({ "error" : "1", "position":"ctl-users->search", "message": error_send } );
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
		res.send({ "error" : "2", "position":"ctl-users->search", "message": error_send } ); 
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
		res.send({ "error" : "3", "position":"ctl-users->search", "message": error_send } );
		return;			
	}
	
	
	//@
	//@
	//@ nếu không có lộc theo users id thì phải là admin
	if(check_condition_id == 0){
	if(check_datas_result.user_role == "admin" || check_datas_result.user_role == "supper-job" ){}else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, 
			"Bạn không đủ quyền thao tác, chỉ có dmin mới search all", 
			"Bạn không đủ quyền thao tác, chỉ có dmin mới search all" );
			res.send({ "error" : "4", "position":"ctl-users->search", "message": error_send } );
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_user != "1" &&  check_datas_result.user_role != "admin"){
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, 
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user", 
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "5", "position":"ctl-users->search", "message": error_send } );
			return;			
		}			
	}

	

	//@@
	//@@
	//@@
	try {
		models_users.search(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		}, error => {
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi search users, liên hệ bộ phẫn HTKT dala" );
				res.send({ "error" : "6", "position":"ctl-users->search", "message": error_send } ); 
				return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi search users, liên hệ bộ phẫn HTKT dala" );
		res.send({ "error" : "7", "position":"ctl-users->search", "message": error_send } );
		return;	
	}
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi search users, liên hệ bộ phẫn HTKT dala" );
	res.send({ "error" : "113", "position":"ctl-users->search", "message": error_send } );
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
try {	
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
		res.send({ "error" : "1", "position":"ctl-users->delete", "message": error_send } );
		return;			
	}	
	
	//@
	//neu không có token thì trỏ ra login page
	if(typeof token == "undefined" || token == "" || token == null ){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền truy cập  ", "Bạn không đủ quyền truy cập" );
		res.send({ "error" : "2", "position":"ctl-users->delete", "message": error_send } );
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
		res.send({ "error" : "3", "position":"ctl-users->delete", "message": error_send } );
		return;			
	}	
	
	
	if(check_datas_result.user_role != "admin"){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "4", "position":"ctl-users->delete", "message": error_send } );
		return;				
	}
	
	
	
	//@
	//@
	try {
		models_users.delete_users(user_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var evn = ojs_configs.evn;
			var message_error = default_field.get_message_error(error);
			//evn = "dev";
			//@
			//@				
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error );
			res.send({ "error" : "5", "position":"ctl-users->delete", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		let error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi delete users, liên hệ bộ phẫn HTKT dala" );
		res.send({ "error" : "6", "position":"ctl-users->delete", "message": error_send } );
		return;
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";		
	let error_send = ojs_shares_show_errors.show_error( ojs_configs.api_evn, error, "lỗi delete users, liên hệ bộ phẫn HTKT dala" );
	res.send({ "error" : "113", "position":"ctl-users->delete", "message": error_send } );
	return;
}
}






//@
//@
//@
//@
//13. [check_token] 
//@
const check_token = async function (req, res, next) {
try {	
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		
		if(!datas.token){
			res.send({ "error" : "1", "position":"ctl-users->check_token", "message": "Không có token" } );
			return;
		}
		//@
		//@
		var token = datas.token;
		var newPayload = jwt.decode(token);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "2", "position":"ctl-users->check_token", "message": error_send } );
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
				res.send({ "error" : "3", 
				"position":"ctl-users->check_token", 
				"message": "Phiên làm việc đã hết hạn, hoặc token không hợp lệ" } );
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
									res.send({ "error" : "4", 
									"position":"ctl-users->check_token", 
									"message": "User đã thay đổi mật khẩu, vui lòng đăng nhập lại" } );
									return;										
								}
							}else{
								var evn = ojs_configs.evn;
								//evn = "dev";
								var error_send = ojs_shares.show_error( evn, "Phiên làm việc đã hết hạn", "Phiên làm việc đã hết hạn" );
								res.send({ "error" : "5", "position":"ctl-users->check_token", "message": error_send } );
								return;	 				
							}
						//@
						//@
						//nếu đăng nhập không có user theo id token database
						}, error => {
							var evn = ojs_configs.evn;
							//evn = "dev";
							var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy token database, Vui lòng liên hệ CSKH dala" );
							res.send({ "error" : "7", "position":"ctl-users->check_token", "message": error_send } );
							return;	 		
						});		
					//@
					//@
					//nếu mật khẩu đã bị thay đổi							
					}else{
						var evn = ojs_configs.evn;
						//evn = "dev";
						var error_send = ojs_shares.show_error( evn, 
						"token đã hết hạn hoặc user đã thây đổi mật khẩu", 
						"token đã hết hạn hoặc user đã thây đổi mật khẩu" );
						res.send({ "error" : "8", "position":"ctl-users->check_token", "message": error_send } );
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
					res.send({ "error" : "9", "position":"ctl-users->check_token", "message": error_send } );
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
		res.send({ "error" : "10", "position":"ctl-users->check_token", "message": error_send } );
		return;	  
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares.show_error( evn, error, "lỗi không xác định, vui lòng liên hệ dala" );
	res.send({ "error" : "113", "position":"ctl-users->check_token", "message": error_send } );
	return;	  
}	
	//@
	//@	
}//end of functions login;

//2. end of [login-app] 








//@
//@
//@
//@
//11. [search] 
//@
const search_bussiness = async function (req, res, next) {
try {
	//@
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		
		
		//res.send(datas);
		//return;
		//@
		//@
		//@

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-users->search_bussiness", "message": error_send } ); 
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
		res.send({ "error" : "2", "position":"ctl-users->search_bussiness", "message": error_send } ); 
		return;			
	}
	
	

	if(check_datas_result.user_role == "admin" || check_datas_result.user_role == "supper-job" ){}else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác, chỉ có dmin mới search all", "Bạn không đủ quyền thao tác, chỉ có dmin mới search all" );
			res.send({ "error" : "3", "position":"ctl-users->search_bussiness", "message": error_send } );
			return;	
	}		


	

	//@@
	//@@
	//@@
	try {
		models_users.search_bussiness(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
			return;
		
		}, error => {
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi search users, liên hệ bộ phẫn HTKT dala" );
				res.send({ "error" : "4", "position":"ctl-users->search_bussiness", "message": error_send } );
				return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi search users, liên hệ bộ phẫn HTKT dala" );
		res.send({ "error" : "5", "position":"ctl-users->search_bussiness", "message": error_send } ); 
		return;	
	}
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi không xác định, liên hệ bộ phẫn HTKT dala" );
	res.send({ "error" : "113", "position":"ctl-users->search_bussiness", "message": error_send } ); 
	return;	
}
}//

//11. end of  [search] 








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
		check_token,
		search_bussiness
};







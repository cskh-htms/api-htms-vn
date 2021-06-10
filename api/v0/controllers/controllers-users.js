
var express = require('express');
var router = express.Router();

// get test valiable
const models_users = require('../models/models-users');
const models_token = require('../models/models-token');
const default_field = require('../const-tables/const-tables-users');


const jwt = require('jsonwebtoken');
const md5 = require('md5');

const ojs_configs = require('../../../configs/config');
const ojs_shares = require('../../../models/ojs-shares');






//login 
const login = function (req, res, next) {
	let datas = req.body.datas;
	models_users.login(datas).then( results => {
		try {
			if(results.length  > 0) {
				var role_text = ojs_shares.check_role(results[0].users_type_infomation);
				
				
				const payload = { 
					"users_ID": results[0].users_ID, 
					"users_full_name" :  results[0].users_last_name + " " + results[0].users_first_name, 
					"users_name": results[0].users_name,
					"user_role":role_text
				};
				
				
				const payload_database = { 
					"users_ID": results[0].users_ID, 
					"users_name": results[0].users_name,
					"users_password":results[0].users_password,
					"user_role":role_text
				};
				
				
				
				var token = jwt.sign(payload, ojs_configs.jwt_secret, {
					expiresIn: "20d"
				});
				
				var token_database = jwt.sign(payload_database, ojs_configs.jwt_secret, {
					expiresIn: "20d"
				});				
				
				
				var data_insert = {
					"datas": {
						"token_key": token,
						"token_value": token_database
					}
				}
				
				models_token.insert_token(data_insert).then( results => {
					let datas_return = { "error" : "","token" : token,"datas" : payload };
					res.send( datas_return );
					return;
				}, error => {
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
					res.send({ "error" : "2_controller_users->login->models_token.insert_token", "message": error_send } ); 
					return;
				});
				
				
			}else{
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, "user hoat mật khẩu không đúng", "user hoat mật khẩu không đúng" );
				res.send({ "error" : "3_controller_users->login->models_token.insert_token", "message": error_send } ); 
				return;
			}
			
		}
		catch (error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn, "server đang bận", "server đang bận" );
			res.send({ "error" : "4_controller_users->login->models_token.insert_token", "message": error_send } ); 
			return;	
		}
	}, error => {
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "server đang bận" );
		res.send({ "error" : "5_controller_users->login->models_token.insert_token", "message": error_send } ); 
		return;
	});	

}//end of functions login;



//login 
const login_default = function (req, res, next) {
	let datas = req.body.datas;
	models_users.login(datas).then( results => {
		try {
			if(results.length  > 0) {
				var role_text = ojs_shares.check_role(results[0].users_type_infomation);
				
				
				const payload = { 
					"users_ID": results[0].users_ID, 
					"users_full_name" :  results[0].users_last_name + " " + results[0].users_first_name, 
					"users_name": results[0].users_name,
					"user_role":role_text
				};
				
				
				const payload_database = { 
					"users_ID": results[0].users_ID, 
					"users_name": results[0].users_name,
					"users_full_name" :  results[0].users_last_name + " " + results[0].users_first_name,
					"users_password":results[0].users_password,
					"user_role":role_text
				};
				
				
				
				var token = jwt.sign(payload, ojs_configs.jwt_secret, {
					expiresIn: "20d"
				});
				
				var token_database = jwt.sign(payload_database, ojs_configs.jwt_secret, {
					expiresIn: "20d"
				});				
				
				
				var data_insert = {
					"datas": {
						"token_key": token,
						"token_value": token_database
					}
				}
				
				models_token.insert_token(data_insert).then( results => {
					let datas_return = { "error" : "","token" : token,"datas" : payload };
					res.send( datas_return );
					return;
				}, error => {
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
					res.send({ "error" : "2_controller_users->login->models_token.insert_token", "message": error_send } ); 
					return;
				});
				
			}else{
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, "user hoat mật khẩu không đúng", "user hoat mật khẩu không đúng" );
				res.send({ "error" : "3_controller_users->login->models_token.insert_token", "message": error_send } ); 
				return;
			}
			
		}
		catch (error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn, "server đang bận", "server đang bận" );
			res.send({ "error" : "4_controller_users->login->models_token.insert_token", "message": error_send } ); 
			return;	
		}
	}, error => {
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "server đang bận" );
		res.send({ "error" : "5_controller_users->login->models_token.insert_token", "message": error_send } ); 
		return;
	});	

}//end of functions login;






//@
//@
//@
//@
//check token
async function check_token(req, res, next) {
	let token = req.body.datas.token;
	var newPayload = jwt.decode(token);
    if (token) {
	try{	
		jwt.verify(token, ojs_configs.jwt_secret, (err, decoded) =>{  
			//@
			//@
			//neu token het han
			if (err) {

				
				//@
				//@
				//nếu là token default thì tạo lại token mới thời hạn mới
				if(newPayload.user_role == "default"){
					
					//res.send({ "error" : "loai default", "message": "loai default" } ); 
					//return;
					//@
					//@
					//kiểm tra mật khẩu lần nữa
					
					models_token.search(token).then( results => {
						//res.send({"error":"sd","message":results})
						//return;

						//@
						//@
						//nếu có token database
						//giai decode token database lấy user_id
						if(Object.entries(results).length  > 0) {
							var token_value_decode = jwt.decode(results[0].token_value);
							//res.send({"error":"sasdasd","message":token_value_decode})
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
									if(token_value_decode.users_name == results2[0].users_name   && token_value_decode.users_password == results2[0].users_password){
										const payload = { 
											"users_ID": results2[0].users_ID, 
											"users_full_name" :  results2[0].users_last_name + " " + results2[0].users_first_name, 
											"users_name": results2[0].users_name,
											"user_role":results2[0].users_type_name
										};
										
										
										const payload_database = { 
											"users_ID": results2[0].users_ID, 
											"users_name": results2[0].users_name,
											"users_full_name" :  results2[0].users_last_name + " " + results2[0].users_first_name, 
											"users_password":results2[0].users_password,
											"user_role":results2[0].users_type_name
										};
										
										
										
										var token = jwt.sign(payload, ojs_configs.jwt_secret, {
											expiresIn: "20d"
										});
										
										var token_database = jwt.sign(payload_database, ojs_configs.jwt_secret, {
											expiresIn: "20d"
										});				
										
										
										var data_insert = {
											"datas": {
												"token_key": token,
												"token_value": token_database
											}
										}
										
										models_token.insert_token(data_insert).then( results => {
											let datas_return = { "error" : "","token" : token,"datas" : payload };
											res.send( datas_return );
											return;
										}, error => {
											var evn = ojs_configs.evn;
											//evn = "dev";
											var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
											res.send({ "error" : "2_controller_users->login->models_token.insert_token", "message": error_send } ); 
											return;
										});	
									//@
									//@
									//nếu user đã thay đổi mật khẩu
									}else{
										res.send({ "error" : "05->Controller_users->check_token", "message": "khong co version"} ); 
										return;								
									}
								}else{
									var evn = ojs_configs.evn;
									//evn = "dev";
									var error_send = ojs_shares.show_error( evn, "Lỗi máy chủ", "server đang bận, truy cập lại sau" );
									res.send({ "error" : "3_contreoller users->check_token", "message": error_send } ); 
									return;	 				
								}
							//@
							//@
							//nếu đăng nhập không có user theo id token database
							}, error => {
								var evn = ojs_configs.evn;
								//evn = "dev";
								var error_send = ojs_shares.show_error( evn, error, "Không đăng nhập được user token" );
								res.send({ "error" : "4_contreoller users->check_token", "message": error_send } ); 
								return;	 		
							});		
						//@
						//@
						//nếu mật khẩu đã bị thay đổi							
						}else{
								var evn = ojs_configs.evn;
								//evn = "dev";
								var error_send = ojs_shares.show_error( evn, "token đã hết hạn hoặc user đã thây đổi mật khẩu", "token đã hết hạn hoặc user đã thây đổi mật khẩu" );
								res.send({ "error" : "7_contreoller users->check_token->models_token.search->", "message": error_send } ); 
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
								res.send({ "error" : "8_contreoller users->check_token", "message": error_send } ); 
								return;	
					});	
					
				//@
				//@
				//nếu token  không phải loại default thì báo lỗi hết hạn đăng nhập lại		
				}else{
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares.show_error( evn, "Phiên làm việc đã hết hạn", "Phiên làm việc đã hết hạn" );
					res.send({ "error" : "4_contreoller users->check-token", "message": error_send } ); 
					return;					
				}
			//@
			//@
			//@

			//nếu token còn hạng thì tạo lại token mới
			} else {
				//res.send({ "error" : "2 token hop le con hang", "message": "token hop le con hang" } ); 
				//return;
	
				//đăng nhập bằng user mật khẩu token database
				//nếu đăng nhập thành cong thì so sánh user đã thay đổi mật khẩu chưa
				models_users.get_one_users(newPayload.users_ID).then( results2 => {
					if(Object.entries(results2).length  > 0) {
						//@
						//@
							const payload = { 
								"users_ID": results2[0].users_ID, 
								"users_name": results2[0].users_name,
								"users_full_name" :  results2[0].users_last_name + " " + results2[0].users_first_name, 
								"user_role":results2[0].user_role
							};
							
							
							const payload_database = { 
								"users_ID": results2[0].users_ID, 
								"users_name": results2[0].users_name,
								"users_full_name" :  results2[0].users_last_name + " " + results2[0].users_first_name, 
								"users_password":results2[0].users_password,
								"user_role":results2[0].user_role
							};
							
							
							
							var token = jwt.sign(payload, ojs_configs.jwt_secret, {
								expiresIn: "20d"
							});
							
							var token_database = jwt.sign(payload_database, ojs_configs.jwt_secret, {
								expiresIn: "20d"
							});				
							
							
							var data_insert = {
								"datas": {
									"token_key": token,
									"token_value": token_database
								}
							}
							
							models_token.insert_token(data_insert).then( results => {
								let datas_return = { "error" : "","token" : token,"datas" : payload };
								res.send( datas_return );
								return;
							}, error => {
								var evn = ojs_configs.evn;
								//evn = "dev";
								var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
								res.send({ "error" : "22_controller_users->login->models_token.insert_token", "message": error_send } ); 
								return;
							});	
					}else{
						var evn = ojs_configs.evn;
						//evn = "dev";
						var error_send = ojs_shares.show_error( evn, "Token không hợp lệ hoặc đã hết hạn", "Token không hợp lệ hoặc đã hết hạn" );
						res.send({ "error" : "33_contreoller users->check_token", "message": error_send } ); 
						return;	 				
					}
				//@
				//@
				//nếu đăng nhập không có user theo id token database
				}, error => {
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares.show_error( evn, error, "Không đăng nhập được user token" );
					res.send({ "error" : "44_contreoller users->check_token", "message": error_send } ); 
					return;	 		
				});	
				
			}
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, "token đã hết hạn hoặc không hợp lệ", "server đang bận, truy cập lại sau" );
		res.send({ "error" : "55_contreoller users->check_token", "message": error_send } ); 
		return;	  
	}	
	//@
	//@
	//nếu không có token thì send data loi	
	}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, "Vui lòng gữi token", "Vui lòng gữi token" );
		res.send({ "error" : "100.end_contreoller users->check_token->catch", "message": error_send } ); 
		return;	 		
	}

}



//
//@
//@
//@
//@
//check token
async function get_version(req, res, next) {
	let token = req.body.datas.token;
	
	
	//kiểm tra mật khẩu lần nữa
	models_token.search(token).then( results => {
		if(Object.entries(results).length  > 0) {
			var token_value_decode = jwt.decode(results[0].token_value);
			
			//check username password token_value
			//let data_check = {"datas":{"user_name":token_value_decode.users_name,"user_password":token_value_decode.users_password}}
			models_users.get_one_users(token_value_decode.users_ID).then( results2 => {
				if(Object.entries(results2).length  > 0) {
					
					if(token_value_decode.users_phone == results2[0].users_phone   && token_value_decode.users_password == results2[0].users_password){
						var data_return = {
							"api_version" : results2[0].users_api_version,
							"router_version" : results2[0].users_router_version,
							"view_version" : results2[0].users_view_version,
							"js_css_version" : results2[0].users_js_css_version,
						}
						res.send({ "error" : "", "datas": data_return });
						return;						
					}else{
						res.send({ "error" : "05->Controller_users->get_version->get_one_users", "message": "khong co version"} ); 
						return;								
					}
				}else{
					var evn = ojs_configs.evn;
					//evn = "dev";
					var error_send = ojs_shares.show_error( evn, "Lỗi máy chủ", "server đang bận, truy cập lại sau" );
					res.send({ "error" : "3_contreoller users->models_token.search", "message": error_send } ); 
					return;	 				
				}
			}, error => {
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
				res.send({ "error" : "4_contreoller users->models_token.search", "message": error_send } ); 
				return;	 		
			});				
		}else{
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, "Lỗi máy chủ", "server đang bận, truy cập lại sau" );
				res.send({ "error" : "7_contreoller users->models_token.search", "message": error_send } ); 
				return;			
		}
	}, error => {
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
				res.send({ "error" : "8_contreoller users->models_token.search", "message": error_send } ); 
				return;	
	});		

}


//
//@
//@
//@
//@
//.4
//get_role
//return-> string role
async function get_role(req, res, next) {
	
	//@
	// lấy token từ req
	let token = req.body.datas.token;
	
	//@
	//decode token
	var users_decode;
	try {
		users_decode = jwt.decode(token);
		if(typeof users_decode.users_ID == 'number' && users_decode.users_ID){
		}else{
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
				res.send({ "error" : "2_contreoller users->get_role", "message": error_send } ); 
				return;	
		}
	}
	catch (error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
				res.send({ "error" : "3_contreoller users->get_role", "message": error_send } ); 
				return;	
	}	
	
	//@
	//@
	//lấy datauser từ database
	//lấy role
	try {
		models_users.get_one_users(users_decode.users_ID).then( results => {
			if(results.length  > 0) {
				
				var role_text = ojs_shares.check_role(results[0].users_type_infomation);
				
				res.send( { "error": "", "datas" : role_text } );
				return;
			}else{
				var evn = ojs_configs.api_evn;
				evn = "dev";		
				
				var error_send = ojs_shares.show_error( evn, "Không có thông tin users", "server đang bận, truy cập lại sau" );
				
				res.send( { "error": "3_controller_users->get_role->models_users.get_one_users", "message" : error_send } );	
				return;
			}
		}, error => {
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
				res.send({ "error" : "5_contreoller users->get_role", "message": error_send } ); 
				return;	
		});	
	}
	catch (error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
				res.send({ "error" : "7_contreoller users->get_role", "message": error_send } ); 
				return;	
	}		

}

//
//@
//@
//@
//@
//.4
//get_role
//return-> string role
async function get_owner_user(req, res, next) {
	
	//@
	// lấy token từ req
	let token = req.body.datas.token;
	let user_id = req.body.datas.user_id;
	
	//@
	//decode token
	var users_decode;
	try {
		users_decode = jwt.decode(token);
		if(typeof users_decode.users_ID == 'number' && users_decode.users_ID){
		}else{
				var evn = ojs_configs.evn;
				evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
				res.send({ "error" : "2_contreoller users->get_owner_user", "message": error_send } ); 
				return;	
		}
	}
	catch (error){
				var evn = ojs_configs.evn;
				evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
				res.send({ "error" : "3_contreoller users->get_owner_user", "message": error_send } ); 
				return;	
	}	
	
	//@
	//@
	//so sành 2 user_id nếu = nhau thì return 1 khong = nhau thi return 0
	//
	if(users_decode.users_ID == user_id){
		res.send({ "error" : "", "datas": "1" } ); 
		return;	
	}else{
		res.send({ "error" : "", "datas": "0" } ); 
		return;			
	}


}
//@
//@end function
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
		evn = "dev";
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
		evn = "dev";
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
			
			
			var message_error = default_field.get_message_error(error);
			//var message_error = "sdasdasd";
			
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares.show_error( evn, message_error,message_error );
			res.send({ "error" : "3_controller_users->register_users->models_users.insert_users", "message": error_send } ); 
			return;
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "4_controller_users->register_users->models_users.insert_users", "message": error_send } ); 
		return;
	}	
}
//@
//@
//end function




module.exports = { 
		login,
		login_default,
		get_version,
		get_role,
		check_token,
		get_owner_user,
		register_users
};




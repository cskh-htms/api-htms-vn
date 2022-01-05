//@
//@
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
const models_users = require('../models/models-users');








const ojs_functions_shares = require('../functions-shares/api-functions-shares');

//@
//@
//configs/config
//function share
const ojs_configs = require('../../../configs/config');
const ojs_shares = require('../../../models/ojs-shares');





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
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
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
					"users_nice_name": ojs_functions_shares.encrypt(datas.users_password), 
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
			let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, error, "server đang bận, truy cập lại sau" );
			res.send( { "error": "3", "message" : error_send } );	
		}
	}, error => {
		let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
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
					"users_nice_name": ojs_functions_shares.encrypt(datas.users_password), 
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
			let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, error, "server đang bận, truy cập lại sau" );
			res.send( { "error": "3", "message" : error_send } );	
		}
	}, error => {
		let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
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
		
				if(ojs_functions_shares.check_role_default(newPayload.users_type_infomation) == true){
					//kiểm tra mật khẩu neu dung thi cap them token
					var datas_check = {
						"users_name" : newPayload.users_name,
						"users_password" : ojs_functions_shares.decrypt(newPayload.users_nice_name)
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
							let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, " User hoặc mật khẩu không đúng", "server đang bận, truy cập lại sau" );
							res.send({ "error" : "111", "message": error_send } );   
							return;
						}
						
					}, error => {
						let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn,error, "server đang bận, truy cập lại sau" );
						res.send({ "error" : "3333", "message": error_send } );   
						return;
					});						
					
				}else{
					let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, "Phiên làm việc đã hết hạn", "server đang bận, truy cập lại sau" );
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
						"users_password" : ojs_functions_shares.decrypt(decoded.users_nice_name)
					}
					
				//res.send({ "error" : "1111", "message": "token het han", "datas": datas_check });
				//return;					
					
				//kiểm tra mật khẩu lần nữa
				models_users.check_token(datas_check).then( results => {
					if(Object.entries(results).length  > 0) {
						res.send({ "error" : "", "token": token_new, "datas": decoded });
					}else{
						let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, " User hoặc mật khẩu không đúng", "server đang bận, truy cập lại sau" );
						res.send({ "error" : "2", "message": error_send } );   
					}
				}, error => {
					let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn,error, "server đang bận, truy cập lại sau" );
					res.send({ "error" : "3", "message": error_send } );   
				});	
				
			}
		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn,"Chuỗi token không hợp lệ hoặc token đã hết hạn", "server đang bận, truy cập lại sau" );
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
			let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn,"Chuỗi token không hợp lệ hoặc token đã hết hạn", "server đang bận, truy cập lại sau" );
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
			let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_2", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
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
//get all category chung
function get_all_users(req, res, next) {
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_users.get_all_users().then( results => {
			
			res.send( {"error" : "", "datas" : results} );
			
		}, error => {

			let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_2", "message" : error_send  } );	

		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
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
//get all category chung
function get_one_users(req, res, next) {
	let user_id = req.params.user_id;
	//res.send({ "title" : "welcome" });
	//return;
	//@
	try {
		models_users.get_one_users(user_id).then( results => {
			
			res.send( {"error" : "", "datas" : results} );
			
		}, error => {

			let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_api_2", "message" : error_send  } );	

		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
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
//insert
async function update_users(req, res, next) {
	let datas = req.body.datas;
	let user_id = req.params.user_id;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);	
	
	//res.send({"error":"","datas":datas});
	//return;
	//@
	try {
		models_users.update_users(datas,user_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
			res.send({ "error" : "10_contreoller_users->cupdate_users", "message": error_send } ); 
			return;	
		});
	}
	catch(error){
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
			res.send({ "error" : "11_contreoller_users->cupdate_users->catch", "message": error_send } ); 
			return;	
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
		let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "c_ctl_1", "message" : error_send  } );
	}			
	
	//res.send(datas_assign);
	
	
	//@
	try {
		models_users.insert_users(datas_assign).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "ctl_2", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
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
	user_id = req.params.user_id;
	let token = req.headers['token'];
	var token_decode = jwt.decode(token);	
	//res.send([link_id]);
	//@
	//chi co admin moi nhap lieu dc
	if(ojs_functions_shares.check_role_admin(token_decode.users_type_infomation) != true ){ 
		res.send( { "error": "2_ctrl_api_insert_category", "message" : "Bạn không đủ quyền "  } ); return;
	}


	/*
	//res.send([link_id]);
	//@
	//chi co admin moi nhap lieu dc
	if(ojs_functions_shares.check_role_default(token_decode.users_type_infomation) == true ){ 
		res.send( { "error": "1_check_role_default", "message" : " User mặc định không thể xoá "  } ); return;
	}


	res.send({"error": " 1" , "datas": user_id});
	return;
	*/

	//@
	//@
	//check xem user da co cua hang chua
	//neu co thi ko cho xoa
	//@@
	//@@	
	try {
		//
		store_check = await models_stores.check_users_link( user_id ).then( results => {
				if(typeof results.error == 'string' && results.error ){ 
					return  { "error" : "1_store_check", "message" : results } ;
				}else{
					if(Object.entries(results).length  > 0){
						return {"error":"2_store_check","message":" User đã có cữa hàng không thể xoá"} 
					}else{
						return {"error":"","message":"ok"} 
					}
				}
			}, error => {
				return {"error":"3_store_check","message":"Lỗi máy chủ"} 
			}
		);	
		
		//res.send( store_check );
		if(store_check.error.length > 0) { res.send(store_check); return ;}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "4_store_check", "message" : error_send  } );
	}	

	//res.send( store_check );
	//return;

	//@
	//@
	//check xem user da co đơn hàng chưa
	//neu co thi ko cho xoa
	//@@
	//@@	
	try {
		//
		check_order_link_user = await models_orders_spaciality.check_order_link_user( user_id ).then( results => {
				if(typeof results.error == 'string' && results.error ){ 
					return  { "error" : "1_check_order_link_user", "message" : results } ;
				}else{
					if(Object.entries(results).length  > 0){
						return {"error":"2_check_order_link_user","message":" User đã có đơn hàng không thể xoá"} 
					}else{
						return {"error":"","message":"ok"} 
					}
				}
			}, error => {
				return {"error":"3_check_order_link_user","message":"Lỗi máy chủ"} 
			}
		);	
		
		//res.send( store_check );
		if(check_order_link_user.error.length > 0) { res.send(check_order_link_user); return ;}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "4_check_order_link_user", "message" : error_send  } );
	}	






	//@
	//@
	//check xem user da co đánh giá chưa
	//neu co thi ko cho xoa
	//@@
	//@@	
	try {
		//
		check_review_link_user = await models_reviews_spaciality.check_review_link_user( user_id ).then( results => {
				if(typeof results.error == 'string' && results.error ){ 
					return  { "error" : "1_check_order_link_user", "message" : results } ;
				}else{
					if(Object.entries(results).length  > 0){
						return {"error":"2_check_order_link_user","message":" User đã có đánh giá không thể xoá"} 
					}else{
						return {"error":"","message":"ok"} 
					}
				}
			}, error => {
				return {"error":"3_check_order_link_user","message":"Lỗi máy chủ"} 
			}
		);	
		
		//res.send( store_check );
		if(check_review_link_user.error.length > 0) { res.send(check_review_link_user); return ;}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "4_check_order_link_user", "message" : error_send  } );
	}	




	//@
	//@
	//check xem user da co đánh giá chưa
	//neu co thi ko cho xoa
	//@@
	//@@	
	try {
		//
		check_comment_link_user = await models_comments_spaciality.check_comment_link_user( user_id ).then( results => {
				if(typeof results.error == 'string' && results.error ){ 
					return  { "error" : "1_check_order_link_user", "message" : results } ;
				}else{
					if(Object.entries(results).length  > 0){
						return {"error":"2_check_order_link_user","message":" User đã có bình luận không thể xoá"} 
					}else{
						return {"error":"","message":"ok"} 
					}
				}
			}, error => {
				return {"error":"3_check_order_link_user","message":"Lỗi máy chủ"} 
			}
		);	
		
		//res.send( store_check );
		if(check_comment_link_user.error.length > 0) { res.send(check_comment_link_user); return ;}
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "4_check_order_link_user", "message" : error_send  } );
	}	


	//res.send( check_comment_link_user );
	//return;


	//@
	//@
	try {
		models_users.delete_users(user_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
		}, error => {
			let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
			res.send( { "error": "1_models_users.delete_users", "message" : error_send  } );	
		});
	}
	catch(error){
		let error_send = ojs_functions_shares.show_error( ojs_configs.api_evn, error, "lỗi truy xuất database" );
		res.send( { "error": "2_models_users.delete_users", "message" : error_send  } );
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
		check_token_app
};







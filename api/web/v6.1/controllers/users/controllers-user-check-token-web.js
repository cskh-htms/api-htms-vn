const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');



const config_api = require('../../configs/config');




const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');




const user_check_lock = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-check-lock.js');
const user_login_one = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-login-one.js');
const user_login_lost = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-login-lost.js');
const update_lost_password = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/update-lost-password.js');
const token_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/token/token-search-web.js');
const get_one_user = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-get-one.js');



const user_tracking_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users-trackings/user-tracking-insert.js');



//@
async  function function_export(req, res, next) {
	try {
		var datas = req.body.datas;
		
		if(!datas.token){
			return res.send({ "error" : "1", "position":"ctl-users->check_token-web", "message": "Không có token" } );
			
		}
		//@
		//@
		var token = datas.token;
		var newPayload = jwt.decode(token);
		
		//return res.send([token,newPayload]);
		//
		
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		return res.send({ "error" : "2", "position":"ctl-users->check_token web", "message": error_send } );
			
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
		jwt.verify(token, config_api.jwt_secret, (err, decoded) =>{  
			//@
			//@
			//neu token het han
			if (err) {
				return res.send({ "error" : "3", 
				"position":"ctl-users->check_token web", 
				"message": "Phiên làm việc đã hết hạn, hoặc token không hợp lệ" } );
						
			}else{
				token_search(token,res).then( results => {
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
						//return res.send(token_value_decode);
						//
						//@
						//@
						//đăng nhập bằng user mật khẩu token database
						//nếu đăng nhập thành cong thì so sánh user đã thay đổi mật khẩu chưa
						
						//return res.send([token_value_decode.users_ID]);
						//
		
						get_one_user(token_value_decode.users_ID,res).then( results2 => {
							//return res.send(results2);
							//

							if(Object.entries(results2).length  > 0) {
								//return res.send({"error":"sdda","message":results2})
								//
								//@
								//@
								//neu user va mat khau van trung khop thì tao mới token
								if(token_value_decode.users_phone == results2[0].users_phone   && token_value_decode.users_password == results2[0].users_password){
									return res.send({ "error" : "", "datas": newPayload} ); 
										
								//@
								//@
								//nếu user đã thay đổi mật khẩu
								}else{
									return res.send({ "error" : "4", 
									"position":"ctl-users->check_token", 
									"message": "User đã thay đổi mật khẩu, vui lòng đăng nhập lại" } );
																			
								}
							}else{
								var evn = config_api.evn;
								////evn = "dev";
								var error_send = ojs_shares_show_errors.show_error( evn, "Phiên làm việc đã hết hạn", "Phiên làm việc đã hết hạn" );
								return res.send({ "error" : "5", "position":"ctl-users->check_token", "message": error_send } );
									 				
							}

						//@
						//@
						//nếu đăng nhập không có user theo id token database
						}, error => {
							var evn = config_api.evn;
							////evn = "dev";
							var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy token database, Vui lòng liên hệ CSKH dala" );
							return res.send({ "error" : "7", "position":"ctl-users->check_token web", "message": error_send } );
								 		
						});		
					//@
					//@
					//nếu mật khẩu đã bị thay đổi							
					}else{
						var evn = config_api.evn;
						////evn = "dev";
						var error_send = ojs_shares_show_errors.show_error( evn, 
						"token đã hết hạn hoặc user đã thây đổi mật khẩu", 
						"token đã hết hạn hoặc user đã thây đổi mật khẩu" );
						return res.send({ "error" : "8", "position":"ctl-users->check_token", "message": error_send } );
									
					}
					
				//@
				//@
				//@
				//	kiểm tra đăng nhập lần nữa thất bại				
				}, error => {
					var evn = config_api.evn;
					////evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, "không có database token", "không có database token" );
					return res.send({ "error" : "9", "position":"ctl-users->check_token", "message": error_send } );
						
				});	
			}//  end of token error check
		});
		//@
		//@
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "token đã hết hạn hoặc không hợp lệ", "server đang bận, truy cập lại sau" );
		return res.send({ "error" : "10", "position":"ctl-users->check_token web", "message": error_send } );
			  
	}		
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}

module.exports = function_export;
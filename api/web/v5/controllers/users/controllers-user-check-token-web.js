const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');


const ojs_configs = require('../../../../../configs/config');


const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

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
			res.send({ "error" : "1", "position":"ctl-users->check_token-web", "message": "Không có token" } );
			return;
		}
		//@
		//@
		var token = datas.token;
		var newPayload = jwt.decode(token);
		
		//res.send([token,newPayload]);
		//return;
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "2", "position":"ctl-users->check_token web", "message": error_send } );
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
				"position":"ctl-users->check_token web", 
				"message": "Phiên làm việc đã hết hạn, hoặc token không hợp lệ" } );
				return;		
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
						//res.send(token_value_decode);
						//return;
						//@
						//@
						//đăng nhập bằng user mật khẩu token database
						//nếu đăng nhập thành cong thì so sánh user đã thay đổi mật khẩu chưa
						
						//res.send([token_value_decode.users_ID]);
						//return;
		
						get_one_user(token_value_decode.users_ID,res).then( results2 => {
							//res.send(results2);
							//return;

							if(Object.entries(results2).length  > 0) {
								//res.send({"error":"sdda","message":results2})
								//return;
								//@
								//@
								//neu user va mat khau van trung khop thì tao mới token
								if(token_value_decode.users_phone == results2[0].users_phone   && token_value_decode.users_password == results2[0].users_password){
									res.send({ "error" : "", "datas": newPayload} ); 
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
								var error_send = ojs_shares_show_errors.show_error( evn, "Phiên làm việc đã hết hạn", "Phiên làm việc đã hết hạn" );
								res.send({ "error" : "5", "position":"ctl-users->check_token", "message": error_send } );
								return;	 				
							}

						//@
						//@
						//nếu đăng nhập không có user theo id token database
						}, error => {
							var evn = ojs_configs.evn;
							//evn = "dev";
							var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy token database, Vui lòng liên hệ CSKH dala" );
							res.send({ "error" : "7", "position":"ctl-users->check_token web", "message": error_send } );
							return;	 		
						});		
					//@
					//@
					//nếu mật khẩu đã bị thay đổi							
					}else{
						var evn = ojs_configs.evn;
						//evn = "dev";
						var error_send = ojs_shares_show_errors.show_error( evn, 
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
					var error_send = ojs_shares_show_errors.show_error( evn, "không có database token", "không có database token" );
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
		var error_send = ojs_shares_show_errors.show_error( evn, "token đã hết hạn hoặc không hợp lệ", "server đang bận, truy cập lại sau" );
		res.send({ "error" : "10", "position":"ctl-users->check_token web", "message": error_send } );
		return;	  
	}		
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}

module.exports = function_export;
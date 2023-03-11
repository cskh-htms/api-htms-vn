

const jwt    = require('jsonwebtoken');

const ojs_configs = require('../../../../configs/config');
const config_database = require('../../../configs/config-database');
const config_api = require('../../../configs/config-api');

const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const token_insert = require('../token/token-insert');
const token_search = require('../token/token-search');
const get_one_users = require('../users/get-one-users');


const traffic_update_web = require('../traffic/traffic-update-web');


async function middle_ware(req, res, next){
	try{	
		if( req.headers['token'] == null || req.headers['token'] == "" || req.headers['token'] == undefined ){
			res.send( {"error": "1","postition":"middle-ware", "message":"Chưa có token"} );
			return;
		}
		var token  = req.headers['token'];
		var newPayload = jwt.decode(token);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Lỗi lấy req middleware, vui lòng liên hệ admin", "Lỗi lấy req middleware, vui lòng liên hệ admin" );
		res.send({ "error" : "2","postition":"middle-ware", "message": error_send } ); 
		return;	  
	}	
	try{	
		jwt.verify(token, ojs_configs.jwt_secret, (err, decoded) =>{  
			if (err) {
				res.send("Phiên làm việc đã hết hạn, Vui lòng đăng nhập lại"); 
				return;		
			}else{
				token_search.search_token(token).then( results => {
					if(Object.entries(results).length  > 0) {
						var token_value_decode = jwt.decode(results[0].token_value);
						get_one_users.get_one_users(token_value_decode.users_ID).then( results2 => {
							if(Object.entries(results2).length  > 0) {
								if(token_value_decode.users_phone == results2[0].users_phone && token_value_decode.users_password == results2[0].users_password){
									
								//@
								//@
								//@ phan quyen
								if(token_value_decode.user_role == "bussiness"  
								|| token_value_decode.user_role == "shipping" 
								|| token_value_decode.user_role == "customer" 	
								|| token_value_decode.user_role == "default" 
								|| token_value_decode.user_role == "bo-cong-thuong" 								
								){
								}else{
									res.send({ "error" : "88", "position":"middle-ware", "message": "Lỗi phân quyền, vui lòng đổi user login"} ); 				
									return;
								}				

									traffic_update_web(res);
									next();
								}else{
									res.send({ "error" : "3", "postition":"middle-ware","message": "User đã thay đổi mật khẩu, vui lòng đăng nhập lại"} ); 
									return;								
								}
							}else{
								var evn = ojs_configs.evn;
								//evn = "dev";
								var error_send = ojs_shares_show_errors.show_error( evn, "Phiên làm việc đã hết hạn", "Phiên làm việc đã hết hạn" );
								res.send({ "error" : "4", "postition":"middle-ware","message": error_send } ); 
								return;	 				
							}
						}, error => {
							var evn = ojs_configs.evn;
							evn = "dev";
							var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy token database, Vui lòng liên hệ CSKH dala" );
							res.send({ "error" : "5", "postition":"middle-ware","message": error_send } ); 
							return;	 		
						});		
					}else{
						var evn = ojs_configs.evn;
						//evn = "dev";
						var error_send = ojs_shares_show_errors.show_error( evn, "token đã hết hạn hoặc user đã thây đổi mật khẩu", "token đã hết hạn hoặc user đã thây đổi mật khẩu" );
						res.send({ "error" : "6", "postition":"middle-ware","message": error_send } ); 
						return;			
					}
				}, error => {
					var evn = ojs_configs.evn;
					evn = "dev";
					var error_send = ojs_shares_show_errors.show_error( evn, error, "không tim thấy database token" );
					res.send({ "error" : "7", "postition":"middle-ware","message": error_send } ); 
					return;	
				});	
			}
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "token đã hết hạn hoặc không hợp lệ", "server đang bận, truy cập lại sau" );
		res.send({ "error" : "8", "postition":"middle-ware", "message": error_send } ); 
		return;	  
	}	
}

module.exports = middle_ware;









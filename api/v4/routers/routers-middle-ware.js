

const jwt    = require('jsonwebtoken');

const models_token = require('../models/models-token');
const models_users = require('../models/models-users');
//@
//@
//configs/config
//function share
const ojs_configs = require('../../../configs/config');
const ojs_shares = require('../../../models/ojs-shares');

//middleware check token
//@1-kiểm tra token - nếu con hạn thì kiểm tra mật khẩu. còn hết hạn thì văng ra. 
//@2check xem user va mat khau của token còn đún gkhông
//@3 kiểm tra user và mật khẩu còn đúng không nếu ko đúng thí văng ra
async function routers_middle_ware(req, res, next){
	

	//@
	//@
	//@ lấy data req
	try{	
		//@
		//@
		//@ nếu không có token thì đá ra
		if( req.headers['token'] == null || req.headers['token'] == "" || req.headers['token'] == undefined ){
			res.send( {"error": "routers_middle_ware->error_number-> 1", "message":"Bạn không có quyền truy cập API"} );
		}
	
		//@
		//@
		// lấy datas req
		var token  = req.headers['token'];
		var newPayload = jwt.decode(token);
		
		//res.send({ "error" : token, "message": newPayload} ); 
		//return;	 
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, "Lỗi lấy req middleware, vui lòng liên hệ admin", "Lỗi lấy req middleware, vui lòng liên hệ admin" );
		res.send({ "error" : "routers_middle_ware->error_number-> 2", "message": error_send } ); 
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
				res.send("Phiên làm việc đã hết hạn, Vui lòng đăng nhập lại"); 
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
									next();
								//@
								//@
								//nếu user đã thay đổi mật khẩu
								}else{
									res.send({ "error" : "routers_middle_ware->error_number-> 3", "message": "User đã thay đổi mật khẩu, vui lòng đăng nhập lại"} ); 
									return;								
								}
							}else{
								var evn = ojs_configs.evn;
								//evn = "dev";
								var error_send = ojs_shares.show_error( evn, "Phiên làm việc đã hết hạn", "Phiên làm việc đã hết hạn" );
								res.send({ "error" : "routers_middle_ware->error_number-> 4", "message": error_send } ); 
								return;	 				
							}
						//@
						//@
						//nếu đăng nhập không có user theo id token database
						}, error => {
							var evn = ojs_configs.evn;
							evn = "dev";
							var error_send = ojs_shares.show_error( evn, error, "Lỗi lấy token database, Vui lòng liên hệ CSKH dala" );
							res.send({ "error" : "routers_middle_ware->error_number-> 5", "message": error_send } ); 
							return;	 		
						});		
					//@
					//@
					//nếu mật khẩu đã bị thay đổi							
					}else{
						var evn = ojs_configs.evn;
						//evn = "dev";
						var error_send = ojs_shares.show_error( evn, "token đã hết hạn hoặc user đã thây đổi mật khẩu", "token đã hết hạn hoặc user đã thây đổi mật khẩu" );
						res.send({ "error" : "routers_middle_ware->error_number-> 6", "message": error_send } ); 
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
					res.send({ "error" : "routers_middle_ware->error_number-> 7", "message": error_send } ); 
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
		res.send({ "error" : "routers_middle_ware->error_number-> 8", "message": error_send } ); 
		return;	  
	}	
	//@
	//@	
}

module.exports = routers_middle_ware;









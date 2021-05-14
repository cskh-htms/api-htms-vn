

const jwt    = require('jsonwebtoken');

const models_users = require('../../v0/models/models-users');
const models_token = require('../../v0/models/models-token');
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
	let token  = req.headers['token'];
	var newPayload = jwt.decode(token);
	
	//next();
	if( req.headers['token'] == null || req.headers['token'] == "" || req.headers['token'] == undefined ){
		res.send( {"error": "1.routers_middle_ware", "message":"Bạn không có quyền truy cập API"} );
	}
	
	let check_maintenance  = ojs_configs.status_page;
	
	//@
	//@
	//nếu chế độ bảo trì 
	if(check_maintenance == "maintenance"){
		//@
		let newPayload = jwt.decode(token);
		if(newPayload.user_role != "admin"){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn, "Hệ thống đang bảo trì", "Hệ thống đang bảo trì" );
			res.send({ "error" : "01.routers_middle_ware", "message": error_send } ); 
			return;	 			
		}
	}

	
	
	try{	
		jwt.verify(token, ojs_configs.jwt_secret, (err, decoded) =>{  
			//@
			//@
			//neu token het han
			if (err) {

				
				//@
				//@
				//nếu là token default thì kiểm tra mật khẩu trong token database
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
										next();
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

			//nếu token còn hạng thì next
			} else {
				next();
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
}

module.exports = routers_middle_ware;









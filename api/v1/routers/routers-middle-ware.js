

const jwt    = require('jsonwebtoken');
const ojs_api_config = require('../api-configs/api-config');
const models_users = require('../models/models-users');
const ojs_functions_shares = require('../functions-shares/api-functions-shares');



//middleware check token
//@1-kiểm tra token - nếu con hạn thì kiểm tra mật khẩu. còn hết hạn thì văng ra. 
//@2check xem user va mat khau của token còn đún gkhông
//@3 kiểm tra user và mật khẩu còn đúng không nếu ko đúng thí văng ra
function routers_middle_ware(req, res, next){
	//next();
	
	try{
		if( req.headers['token'] == null || req.headers['token'] == "" || req.headers['token'] == undefined ){
			res.send( {"error": "m_w_1", "message":"Bạn không có quyền truy cập API"} );
		}else{	
			//next();
		
			//@1
			try {
				jwt.verify(req.headers['token'], ojs_api_config.jwt_secret, (err, decoded) =>{  
					if (err) {
						res.send({ "error" : "m_w_2", "message": "Bạn không có quyền truy cập API token đã hết hạn" });    
					} else {
						//next();
						
						
						//@2
						var newPayload = jwt.decode(req.headers['token']);
						
						
						//res.send (newPayload);
						//@3
						var datas_check = {
							"users_name" : newPayload.users_name,
							"users_password" : ojs_functions_shares.decrypt(decoded.users_nice_name)
						}
						models_users.check_token(datas_check).then( results => {
							if(Object.entries(results).length  > 0) {
								next();
							}else{
								let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn, results , "Phiên làm việc đã hết hạn" );
								res.send({ "error" : "m_w_3", "message": error_send } );   
							}
						}, error => {
							let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn,error, "server đang bận, truy cập lại sau" );
							res.send({ "error" : "m_w_4", "message": error_send } );   
						});
												
					}
				});	
			}
			catch(error){
				let error_send = ojs_functions_shares.show_error( ojs_api_config.api_evn,error, "server đang bận, truy cập lại sau" );
				res.send({ "error" : "m_w_5", "message": error_send } );   			
			}
			
		}
		
	}
	catch(error){
		res.send ( { "error" : "c_m_w_6", "message" : error } );
	}
}

module.exports = routers_middle_ware;









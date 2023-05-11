const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');


const config_api = require('../../configs/config');




const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');


const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const user_update = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-update.js');



//@
async  function function_export(req, res, next) {
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		var user_id = req.params.user_id;
		
		var de_token = jwt.decode(token);		
		if(user_id != de_token.users_ID){
			return res.send({ 
				"error" : "01", 
				"position" : "api/web/v5/ctronller/controllers-user-update-web",
				"message": "user không khớp với phiên làm việc"
			}); 	
						
		}		
		
		//return res.send([datas,user_id,de_token]);
		//
		
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		return res.send({ "error" : "2", "position":"ctl-users->change-password", "message": error_send } );
			
	}	
	





	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		return res.send({ "error" : "2", "position":"controllers-user-get-by-id-web", "message": error_send } ); 
		
	}	
		
	//return res.send(de_token);
	//






	//@ insert	
	var result = await user_update(datas,user_id,res);
	return res.send({"error":"","datas":result});
	

}

module.exports = function_export;
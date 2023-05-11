const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const config_api = require('../../configs/config');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_date = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-date.js');


const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/meta-adress/meta-adress-fields-insert.js');
const fields_get = require('../../../../lib/' + config_api.API_LIB_VERSION + '/meta-adress/meta-adress-fields-get.js');


const meta_adress_delete = require('../../../../lib/' + config_api.API_LIB_VERSION + '/meta-adress/meta-adress-delete.js');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_meta_adress = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-meta-adress');

//@
async  function function_export(req, res, next) {
	try {
		var token = req.headers['token'];
		var meta_adress_id = req.params.meta_adress_id;		
		var de_token = jwt.decode(token);		
		//return res.send([datas,user_id,de_token]);
		//
		
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		return res.send({ "error" : "2", "position":"api/app/v5/ctronller/controllers-meta-adress/delete-app", "message": error_send } );
			
	}	
	





	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		return res.send({ "error" : "2", "position":"api/app/v5/ctronller/controllers-meta-adress/delete-app", "message": error_send } ); 
		
	}	
		
	//return res.send(de_token);
	//





	//@ check chủ sở hữu
	const check_owner_result = await check_owner_meta_adress(token,meta_adress_id,res);
	//return res.send([check_owner_result]);
	//	

	if(
	check_owner_result == "1"
	){
		//go
	}
	else{
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				"Lỗi phân quyền chủ sở hữu user, Vui lòng liên hệ admin", 
				"Lỗi phân quyền chủ sở hữu user, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "22",
			"position" : "api/app/v5/ctronller/controllers-meta-adress/delete-app",
			"message": error_send 
		}); 
					
	}





	//@ insert	
	var result = await meta_adress_delete(meta_adress_id,res);
	return res.send({"error":"","datas":result});
	

}

module.exports = function_export;
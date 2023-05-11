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


const meta_adress_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/meta-adress/meta-adress-insert.js');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');





//@
async  function function_export(req, res, next) {
	
	//@
	//@
	//@
	// lấy data request
	try {
		var token = req.headers['token'];
		var datas  = req.body.datas;	
		var newPayload = jwt.decode(token);
		if(!datas.adress_meta_user_id){
			return res.send({ 
				"error" : "01", 
				"position" : "api/web/v5/controller/controllers-meta-adress-add-web",
				"message": "vui lòng nhập id user" 
			}); 
				
		}
		 
		//@
		//@
		if(datas.adress_meta_user_id != newPayload.users_ID){
			return res.send({ 
				"error" : "02", 
				"position" : "api/web/v5/controller/controllers-meta-adress-add-web",
				"message": "Quyền thao tác không hợp lệ" 
			}); 
				
		}		
		//return res.send([datas ,token]);
		//
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api/web/v5/controller/controllers-meta-adress-add-web",
			"message": error_send 
		}); 
			
	}	
	


	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		return res.send({ "error" : "2", "position":"api/web/v5/controller/controllers-meta-adress-add-web", "message": error_send } ); 
		
	}	
		
	//return res.send(de_token);
	//







	//@
	//@
	//@
	//@ check login lock	
	try{

		var meta_adress_insert_result= await meta_adress_insert(datas,res);
		
		return res.send(meta_adress_insert_result);
		return ;
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data  , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "5", 
			"position" : "api/web/v5/controller/controllers-meta-adress-add-web",
			"message": error_send 
		}); 
			
	}			
		

}

module.exports = function_export;
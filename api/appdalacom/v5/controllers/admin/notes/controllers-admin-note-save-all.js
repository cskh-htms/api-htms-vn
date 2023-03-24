


//@
//@
//@
//@
//@ file start
const express = require('express');
const router = express.Router();

const ojs_configs = require('../../../../../../configs/config');
const config_database = require('../../../../../configs/config-database');
const config_api = require('../../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');


const check_role = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const note_insert = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/notes/note-insert');




//@
//@
//@
//@
//@ file start
async  function function_export(req, res, next) {
	
	
	//@ lấy req data
	try {
		var token = req.headers['token'];
		var datas = req.body.datas;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api/appdalacom/controller/admin/notes/save",
			"message": error_send 
		}); 
			
	}	
	//return res.send(datas);
	//
	
	
	
	
	
	
	//@
	//@
	//@
	//@	
	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);
	if(
		check_role_result == "admin" 
	){
		//go
	}
	else{
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				check_role_result, 
				"Lỗi phân quyền, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3",
			"position" : "api/appdalacom/controller/admin/notes/save", 
			"message": error_send 
		}); 
					
	}
	//return res.send([check_role_result]);
	//

	
	
	
	
	
	//@
	//@
	//@
	//@go  
	var store_insert_result = await note_insert(datas,res);
	
	return res.send({"error":"","datas":store_insert_result});
	


}






//@
//@
//@
//@
//@ export
module.exports = function_export;







//@
//@
//@
//@
//@ file end












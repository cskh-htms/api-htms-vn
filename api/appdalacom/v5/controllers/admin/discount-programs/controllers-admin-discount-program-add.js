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
const ojs_shares_fetch_data = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-fetch-data.js');


const fields_insert = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-fields-insert');
const check_role = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_user = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-user');

const get_data_news_admin = require('../../../shares/get-data-news-admin-appdalacom-api.js');

const service_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/services/service-search');
const user_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-search');




//@
//@
//@
//@
//@ function export
async  function function_export(req, res, next) {

	//@
	//@
	//@
	//@ lấy req data
	try {
		var token = req.headers['token'];
		//@
		//@
		var store_id = 0;
		if(req.query.c1){
			store_id = req.query.c1;
		}else{
			res.send({ 
				"error" : "101", 
				"position" : "api/appdalacom/controller/admin/discount-programs/controllers-admin-discount-program-add",
				"message": "vui lòng nhập id"
			}); 	
			return;
		}			

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1", 
			"position" : "api/appdalacom/controller/admin/discount-programs/controllers-admin-discount-program-add",
			"message": error_send 
		}); 
		return;	
	}	
	

	//res.send([store_id]);
	//return;		
	
	
	
	
	//@
	//@
	//@	
	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);
	if(check_role_result == "admin" ){
		//go
	}
	else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				check_role_result, 
				"Lỗi phân quyền, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "3",
			"position" : "api/appdalacom/controller/admin/discount-programs/controllers-admin-discount-program-add",
			"message": error_send 
		}); 
		return;			
	}

	//res.send(["role-ok"]);
	//return;
	
		
	
	
	//@
	//@
	//@
	//@ promise
	try{	
		var promise_all = [];
		promise_all.push(0);

		//@ 1. lấy news admin
		var fn_get_data_news_admin = new Promise((resolve, reject) => {
			let result = get_data_news_admin(res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_news_admin);


		
		



		//@
		//@
		//@
		//@ promise go 
		var promise_result = await Promise.all(promise_all);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data review, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "100", 
			"position" : "api/appdalacom/controller/admin/discount-programs/controllers-admin-discount-program-add",
			"message": error_send 
		}); 
		return;	
	}	

	
	

	
	
	let notes = {
		"0":"no", 
		"1":"news admin",
		"5":"notes"
	}
	//promise_result.push(data_product);	
	//promise_result.push(category_resuilt);	
	
	
	promise_result.push(notes);

	res.send(promise_result);
	return;
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








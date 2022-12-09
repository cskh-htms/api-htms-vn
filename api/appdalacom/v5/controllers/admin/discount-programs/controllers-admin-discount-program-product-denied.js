const express = require('express');
const router = express.Router();


const ojs_configs = require('../../../../../../configs/config');
const config_database = require('../../../../../configs/config-database');
const config_api = require('../../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const fields_insert = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-fields-insert');
const check_role = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');


const discount_link_update = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/discounts-products/discount-product-update.js');



//@
//@
//@
//@ function export
async  function function_export(req, res, next) {
	//@ lấy req data
	try {
		var token = req.headers['token'];
		var datas = req.body;
		//@
		//@		
		var link_id = 0;
		if(req.query.c1){
			link_id = req.query.c1;
		}else{
			res.send({ 
				"error" : "01", 
				"position" : "controller->api-appdalacom->discount_program_product_denied",
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
			"position" : "controller->api-appdalacom->discount_program_product_denied",
			"message": error_send 
		}); 
		return;	
	}	
	


	//res.send([link_id,datas]);
	//return;



	// check role;
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
			"position" : "controller->api-appdalacom->discount_program_product_denied", 
			"message": error_send 
		}); 
		return;			
	}
	
	//res.send(["owner ok"] );
	//return;
	
	
	//@
	//@
	//@
	//@ goo 
	var discount_link_update_result = await discount_link_update(datas,link_id,res);
	
	res.send({"error":"","datas": discount_link_update_result});
	return;
}





//@
//@
//@
//@ export
module.exports = function_export;









//@
//@
//@
//@ file end










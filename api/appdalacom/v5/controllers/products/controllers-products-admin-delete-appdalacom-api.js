const express = require('express');
const router = express.Router();


const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const delete_product = require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-delete.js');



const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');



//@
async  function controllers_products_admin_delete(req, res, next) {

	//@ lấy req data
	try {
		var product_id = req.params.product_id;
		var token = req.headers['token'];	
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
			"position" : "ctroller->api-appdalacom->controllers-products-phe-duyet-appdalacom-api.js",
			"message": error_send 
		}); 
		return;	
	}	
	
	//res.send( [token] );
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
			"position" : "ctroller->api-appdalacom->controllers-products-admin_delete-appdalacom-api.js", 
			"message": error_send 
		}); 
		return;			
	}
	
	//res.send( [token] );
	//return;	
	
	try{		
		//@  admin_delete_product_resuilt
		var admin_delete_product_resuilt = await delete_product(product_id,res);
		res.send(admin_delete_product_resuilt);
		return;	
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check ownwr store, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "155", 
			"position" : "ctroller->api-appdalacom->controllers-products-admin_delete-appdalacom-api.js", 
			"message": error_send 
		}); 
		return;	
	}
}

module.exports = controllers_products_admin_delete;
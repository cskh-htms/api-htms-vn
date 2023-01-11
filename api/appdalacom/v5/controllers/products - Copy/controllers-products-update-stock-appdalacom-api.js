const express = require('express');
const router = express.Router();


const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const product_update_stock = require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-update-stock');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_product = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-product');


//@
async  function controllers_products_update_stock(req, res, next) {

	//@ lấy req data
	try {
		var datas = req.body.datas;
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
			"position" : "ctroller->api-appdalacom->controllers-products-update-stock-appdalacom-api.js",
			"message": error_send 
		}); 
		return;	
	}	
	

	// check role;
	const check_role_result = await check_role.check_role(token,res);
	if(
	check_role_result == "bussiness" 
	|| check_role_result == "admin" 
	){
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
			"position" : "ctroller->api-appdalacom->controllers-products-update-stock-appdalacom-api.js", 
			"message": error_send 
		}); 
		return;			
	}
	
	
	//@ check_owner_product
	try{		
		//@ check_owner_product
		var check_owner_product_resuilt = await check_owner_product(token,product_id,res);
	
		if(	
		check_owner_product_resuilt == "1" 
		|| check_role_result == "admin" 
		){
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
				"error" : "333",
				"position" : "ctroller->api-appdalacom->controllers-products-update-stock-appdalacom-api.js", 
				"message": error_send 
			}); 
			return;			
		}	
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
			"error" : "150", 
			"position" : "ctroller->api-appdalacom->controllers-products-update-stock-appdalacom-api.js", 
			"message": error_send 
		}); 
		return;	
	}	

	
	try{		
		//@  update_stock_resuilt
		var update_stock_resuilt = await product_update_stock(datas,product_id,res);
		res.send(update_stock_resuilt);
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
			"position" : "ctroller->api-appdalacom->controllers-products-update-stock-appdalacom-api.js", 
			"message": error_send 
		}); 
		return;	
	}
}

module.exports = controllers_products_update_stock;
const express = require('express');
const router = express.Router();

const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');


const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_user = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-user');
const check_owner_coupon = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-coupon');

const get_data_news_bussiness = require('../../shares/get-data-news-bussiness-appdalacom-api.js');
const get_data_count_bussiness = require('../../shares/get-data-count-bussiness-appdalacom-api.js');

const coupon_delete = require('../../../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-delete');
const store_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-search');

//@
async  function function_export(req, res, next) {
	
	
	//@ lấy req data
	try {
		var token = req.headers['token'];
		var coupon_id = req.params.coupon_id;
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
			"position" : "ctroller->api-appdalacom->controllers-coupon-delete-appdalacom-api.js",
			"message": error_send 
		}); 
		return;	
	}	
	
	//res.send([coupon_id]);
	//return;
	
	//@ check role phân quyền
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
			"position" : "ctroller->api-appdalacom->controllers-coupon-delete-appdalacom-api.js", 
			"message": error_send 
		}); 
		return;			
	}


	//res.send([check_role_result]);
	//return;
	
	
	//@ lấy id cửa để check owner store
	if(check_role_result == "bussiness"){
		//@ check owner store id
			
		var check_owner_coupon_resuilt = await check_owner_coupon(token,coupon_id,res);
		//res.send([check_owner_coupon_resuilt]);
		//return;		
		
		
		if(	check_owner_coupon_resuilt == "1" ){
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
				"error" : "232",
				"position" : "ctroller->api-appdalacom->controllers-coupon-delete-appdalacom-api.js", 
				"message": error_send 
			}); 
			return;			
		}		
	
	}//@enf fi check store owner
	
	
	//res.send([check_owner_coupon_resuilt]);
	//return;	
	
	
	var coupon_delete_result = await coupon_delete(coupon_id,res);
	
	res.send([coupon_delete_result]);
	return;


}

module.exports = function_export;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const multer = require('multer');
const WPAPI = require( 'wpapi' );

const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/fields-insert-reviews');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_review = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-review');

const get_data_news_bussiness = require('../../shares/get-data-news-bussiness-appdalacom-api.js');



//@
async  function controllers_bussiness_by_user_id(req, res, next) {
	
	//@ lấy req data
	try {
		var user_id = req.params.user_id;
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
			"position" : "ctroller->api-appdalacom->controllers-bussiness-by-user-id-appdalacom-api.js",
			"message": error_send 
		}); 
		return;	
	}	

	
	//@ check role phân quyền
	try{
		var check_role_result = await check_role.check_role(token);
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check role, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "2",
			"position" : "ctroller->api-appdalacom->controllers-bussiness-by-user-id-appdalacom-api.js", 
			"message": error_send 
			}); 
		return;			
	}

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
			"position" : "ctroller->api-appdalacom->controllers-bussiness-by-user-id-appdalacom-api.js", 
			"message": error_send 
		}); 
		return;			
	}

	
	//@ lấy news bussiness
	try{
		var get_data_news_bussiness_resuilt = await get_data_news_bussiness(user_id);
		res.send({"error":"","datas":[get_data_news_bussiness_resuilt]});
		return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi lấy data tin tuc bussisness, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "4",
			"position" : "ctroller->api-appdalacom->controllers-bussiness-by-user-id-appdalacom-api.js", 
			"message": error_send 
			}); 
		return;			
	}

	
	return;	

	
	
	
}

module.exports = controllers_bussiness_by_user_id;
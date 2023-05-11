const express = require('express');
const router = express.Router();


const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-fields-insert');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_user = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-user');

const review_delete = require('../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-delete');



//@
async  function controllers_review_delete(req, res, next) {
	
	
	//@ lấy req data
	try {
		var token = req.headers['token'];
		var review_id = req.params.review_id;
		var datas = req.body;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api/appdalacom/contriller/reviews/controllers-review-delete_giaappdalacom-api.js",
			"message": error_send 
		}); 
			
	}	
	
	
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
		return res.send({ 
			"error" : "3",
			"position" : "api/appdalacom/contriller/reviews/controllers-review-delete_giaappdalacom-api.js",
			"message": error_send 
		}); 
					
	}

	
	//@  update	
	try{		
		var delte_resuilt = await review_delete(review_id,res);
		return res.send(delte_resuilt);
			
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi xóa đánh giá, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "155", 
			"position" : "api/appdalacom/contriller/reviews/controllers-review-delete_giaappdalacom-api.js",
			"message": error_send 
		}); 
			
	}
}

module.exports = controllers_review_delete;
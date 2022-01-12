const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const multer = require('multer');
const WPAPI = require( 'wpapi' );

const ojs_configs = require('../../../../configs/config');
const config_database = require('../../../configs/config-database');
const ojs_shares_show_errors = require('../../../../shares/ojs-shares-show-errors');
const fields_insert = require('../../../lib/reviews/fields-insert-reviews');
const check_role = require('../../../shares/check-role');
const check_owner_review = require('../../../shares/check-owner-review');





//@
async  function update_reviews_spaciality_app(req, res, next) {

	//@ lấy req data
	try {
		var all_files = req.files;
		var datas = req.body;
		var token = req.headers['token'];
		var review_id = req.params.review_id
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
			"position" : "ctl-review->update_app",
			"message": error_send 
		}); 
		return;	
	}
	//res.send({"error":"","datas":[all_files,datas,token,review_id]}); 
	//return;	



	//@ check owner review
	try{
		var check_owner_review_resuilt = await check_owner_review.check_owner_review(token,review_id);
		res.send({ "error":"","datas":[check_owner_review_resuilt] }); 
		return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check owner review, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "21",
			"position" : "ctl-review->insert-app", 
			"message": error_send 
			}); 
		return;			
	}	
	
	if(check_owner_review_resuilt != 1){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				"Lỗi phân quyền user_id đánh giá không hợp lệ, Vui lòng liên hệ admin" , 
				"Lỗi phân quyền user_id đánh giá không hợp lệ, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "22",
			"position" : "ctl-review->insert-app", 
			"message": error_send 
		}); 
		return;			
	}	




	
	res.send({"error":"","datas":[all_files,datas,token]}); 
	return;
	
}

module.exports = { 
	update_reviews_spaciality_app
};
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const multer = require('multer');
const WPAPI = require( 'wpapi' );



const config_api = require('../configs/config');




const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_insert = require('../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-fields-insert');
const check_role = require('../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_review = require('../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-review');

const update_review = require('../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-update');


//@
async  function update_reviews_spaciality_app(req, res, next) {

	//@ lấy req data
	try {
		var all_files = req.files;
		var datas = req.body;
		var token = req.headers['token'];
		var review_id = req.params.review_id
		//return res.send(["sdfsdfsdf"]);
		//
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "ctl-review->update_app",
			"message": error_send 
		}); 
			
	}
	
	
	//@ check owner review
	const check_owner_review_resuilt = await check_owner_review.check_owner_review(token,review_id,res);
	if(check_owner_review_resuilt != "1"){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				"Lỗi phân quyền user_id đánh giá không hợp lệ, Vui lòng liên hệ admin" , 
				"Lỗi phân quyền user_id đánh giá không hợp lệ, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3",
			"position" : "ctl-review->update-app", 
			"message": error_send 
		}); 
					
	}	



	//@ upload hinh sang wp
	try {
		var url_images = "";
		var url_videos = "";
		if(all_files){
			var wp = new WPAPI({
				endpoint: 'https://appdala.net/wp-json',
				username: 'appdala',
				password: 'root@2021!@#$%^'
			});

			
			for (x in all_files){
				var upload_go = await wp.media().file(all_files[x].buffer,all_files[x].originalname).create();
				var myArray = upload_go.source_url.split(".");
				if(
				myArray[myArray.length -1] == "jpg" || 
				myArray[myArray.length -1] == "png" ){
					if(url_images == ""){
						url_images = url_images + upload_go.source_url
					}else{
						url_images = url_images + ";" + upload_go.source_url
					}
				}else{
					if(url_videos == ""){
						url_videos = url_videos + upload_go.source_url
					}else{
						url_videos = url_videos + ";" + upload_go.source_url
					}					
				}
			}
		}
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi upload hình , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "4",
			"position" : "ctl-review->update_app",
			"message": error_send 
			}); 
			
	}



	//@ update_review
	try {
		var datas_assign = {
			"reviews_speciality_images" :url_images,
			"reviews_speciality_videos" : url_videos
		}
		var datas_update = Object.assign(datas,datas_assign);			
		
		var update_review_resuilt = await update_review(datas_update,review_id,res);
		return res.send({"error":"","datas": update_review_resuilt});
		

	}
	catch(error){
		var message_error = fields_insert.get_message_error(error);
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error,
				message_error 
			);
		return res.send({ 
			"error" : "5",
			"position" : "ctl-review->update", 
			"message": error_send 
		}); 
		
	}


		
	
	return res.send({"error":"","datas":datas_update}); 
	
	
}

module.exports = { 
	update_reviews_spaciality_app
};
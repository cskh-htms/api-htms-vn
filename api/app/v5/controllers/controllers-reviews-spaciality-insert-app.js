const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const multer = require('multer');
const WPAPI = require( 'wpapi' );

const ojs_configs = require('../../../../configs/config');


const config_database = require('../../../configs/config-database');
const config_api = require('../../../configs/config-api');

const ojs_shares_show_errors = require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_insert = require('../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-fields-insert');
const check_role = require('../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_user = require('../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-user');

const reviews_insert = require('../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-insert.js');



//@
async  function insert_reviews_spaciality_app(req, res, next) {
	
	//@ lấy req data
	try {
		var all_files = req.files;
		var datas = req.body;
		var token = req.headers['token'];
		
		if(!datas.reviews_speciality_user_id){
			return res.send({ 
				"error" : "1" , 
				"position" : "api-ctl-review->insert", 
				"message" : " Chưa nhập mã khách hàng (user_id) " 
			});
			
		}
		if(!datas.reviews_speciality_product_id){
			return res.send({ 
				"error" : "11" , 
				"position" : "api-ctl-review->insert", 
				"message" : " Chưa nhập mã sản phẩm (user_id) " 
			});
			
		}			
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
			"error" : "111", 
			"position" : "api-ctl-review->insert", 
			"message": error_send 
		}); 
			
	}
	
	
	//@ check owner user
	const check_owner_user_resuilt = await check_owner_user.check_owner_user(token,datas.reviews_speciality_user_id,res);
	if(check_owner_user_resuilt != 1){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				"Lỗi phân quyền user_id đánh giá không hợp lệ, Vui lòng liên hệ admin" , 
				"Lỗi phân quyền user_id đánh giá không hợp lệ, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "122",
			"position" : "ctl-review->insert-app", 
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
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi upload hình , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "4",
			"position" : "api-ctl-review->insert", 
			"message": error_send 
			}); 
			
	}
	
	
	//@ save database
	var datas_assign = {
		"reviews_speciality_images" :url_images,
        "reviews_speciality_videos" : url_videos
	}
	var datas_insert = Object.assign(datas,datas_assign);	


	//@ insert data to database
	try {
		var inserted = await reviews_insert.insert_reviews_spaciality(datas_insert);
	}
	catch(error){
		var message_error = fields_insert.get_message_error(error);
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error,
				message_error 
			);
		return res.send({ 
			"error" : "5",
			"position" : "api-ctl-review->insert", 
			"message": error_send 
		}); 
		
	}	
	
	return res.send({"error":"","datas":inserted}); 
	
	
}

module.exports = { 
	insert_reviews_spaciality_app
};
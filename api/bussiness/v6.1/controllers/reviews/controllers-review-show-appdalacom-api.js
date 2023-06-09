const express = require('express');
const router = express.Router();




const config_api = require('../../configs/config');




const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-fields-insert');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_user = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-user');

const get_data_news_admin = require('../../shares/get-data-news-admin-appdalacom-api.js');

const review_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-search');



//@
async  function controllers_review_show(req, res, next) {
	
	
	//@ lấy req data
	try {
		var token = req.headers['token'];
		var review_id = req.params.review_id;
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api/appdalacom/contriller/reviews/controllers-review-show-giaappdalacom-api.js",
			"message": error_send 
		}); 
			
	}	
	
	
	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);
	if(check_role_result == "admin" ){
		//go
	}
	else{
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				check_role_result, 
				"Lỗi phân quyền, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3",
			"position" : "api/appdalacom/contriller/reviews/controllers-review-show-giaappdalacom-api.js",
			"message": error_send 
		}); 
					
	}

	
	/////////////////////
	////////////////////
	try{	
		var promise_all = [];
		promise_all.push(0);

		//@ 1. lấy news admin
		var fn_get_data_news_admin = new Promise((resolve, reject) => {
			let result = get_data_news_admin(res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_news_admin);

		
		//@ 2. review list
		var data_review = 		
			{
				"select_field" :
				[
					"reviews_speciality_user_id",
					"reviews_speciality_ID ",
					"reviews_speciality_date_created",
					"reviews_speciality_product_id",	
					"reviews_speciality_contents",
					"reviews_speciality_images",
					"reviews_speciality_videos",
					"reviews_speciality_status_admin",
					"reviews_speciality_number_star",
					"users_full_name",
					"products_speciality_name",
					"products_speciality_featured_image"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[  
							{
								"field" : "reviews_speciality_ID",
								"value" : review_id,
								"compare" : "="
							}						
						]    
					}         
				] 
			}

		var fn_get_data_review = new Promise((resolve, reject) => {
			let result = review_search.search_reviews_spaciality(data_review,res);
			resolve(result);
		});	
		promise_all.push(fn_get_data_review);		
		
		
		
		//@
		//@
		var promise_result = await Promise.all(promise_all);
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data review, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "api/appdalacom/contriller/reviews/controllers-review-show-appdalacom-api.js",
			"message": error_send 
		}); 
			
	}	
	
	let notes = {
		"0":"no", 
		"1":"news admin",
		"2":"review list"
	}
	promise_result.push(notes);

	return res.send(promise_result);
	
	
	
	
}

module.exports = controllers_review_show;
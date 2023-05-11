const express = require('express');
const router = express.Router();


const ojs_configs = require('../../../../../configs/config');


const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_get = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-fields-get.js');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');

const order_detail_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/order-details/order-detail-search-by-review.js');




//@
async  function function_export(req, res, next) {
	
	//@ lấy req data
	try {
		var token = req.headers['token'];
		
		var user_id = 0;
		if(req.query.c1){
			user_id = req.query.c1;
		}else{
			return res.send({ 
				"error" : "1", 
				"position" : "api/app/v5/controller/reviews/controller-review-get-product-no-review-by-user",
				"message": "vui lòng nhập id"
			}); 	
			
		}
		
		var limit = 20;
		if(req.query.c2){
			limit = req.query.c2;
		}	
		
		var offset = 0;
		if(req.query.c3){
			offset = req.query.c3;
		}			
		
		var sort_field = "orders_speciality_date_orders";
		if(req.query.c4){
			sort_filed = req.query.c4;
		}			
		
		var sort_type = "DESC";
		if(req.query.c5){
			sort_type = req.query.c5;
		}			
		
		
		//return res.send([user_id,limit,offset,sort_field,sort_type]);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api/app/v5/controller/reviews/controller-review-get-product-no-review-by-user",
			"message": error_send 
		}); 
			
	}



	
	//@
	//@ limit
	var limit_data = [];
	limit_data.push(
		{
			"limit_number" : limit
		}
	);		
	
	//@
	//@ offset
	limit_data.push(
		{
			"limit_offset" : offset
		}
	);		
	
	
	//@
	//@ order
	var order_data = []	;
	order_data.push(
		{
			"field"  :sort_field,
			"compare" : sort_type
		}
	)	

	

	//@
	//@ condition
	var condition_data = [];
	condition_data.push(	
	{   
		"field"     :"orders_speciality_user_id",
		"value"     : user_id,
		"compare" : "="
	})
	condition_data.push(	
	{   
		"field"     :"reviews_speciality_ID",
		"value"     : "",
		"compare" : "null"
	})	

	condition_data.push(	
	{   
		"field"     :"orders_details_speciality_line_order",
		"value"     : "product",
		"compare" : "="
	})		

	//@ lấy req data
	try {
		//@ 3. get model
		var data_get =    
		{
		   "select_field" :
		   [
				"products_speciality_ID",
				"products_speciality_name",
				"products_speciality_price",
				"products_speciality_sale_of_price_time_check",
				"products_speciality_price_caution",
				"products_speciality_featured_image",
				"orders_speciality_date_orders",
				"users_ID",
				"users_full_name",
				"reviews_speciality_ID"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :condition_data				
				}         
			],
			"order" :order_data,
			"limit" :limit_data  
		}
	
		//return res.send(data_get);
	
	
	
		//@ get datas
		var result = await order_detail_search(data_get,res);
		return res.send({ "error" : "", "datas": result } );
						
		

	}
	catch(error){
		var evn = ojs_configs.evn;
		//////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3", 
			"position" : "api/app/v5/controller/reviews/controller-review-get-product-no-review-by-user",
			"message": error_send 
		}); 
			
	}		
	
}

module.exports = function_export;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');


const ojs_configs = require('../../../../../configs/config');


const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_date = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-date.js');

const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-fields-insert.js');
const fields_get = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-fields-get.js');


const user_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-search.js');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');

const get_meta_user = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-user.js');

const order_detail_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/order-details/order-detail-search-by-marketing');




//@
async  function function_export(req, res, next) {
	
	//@
	//@
	//@
	// lấy data request
	try {
		var token = req.headers['token'];
		var de_token = jwt.decode(token);
		
		var user_id = 0;
		if(req.query.c1){
			user_id = req.query.c1;
		}	
		
		if(user_id != de_token.users_ID){
			return res.send({ 
				"error" : "01", 
				"position" : "api/app/v5/contronller/controllers-user-getmarketing-order",
				"message": "user không khớp với phiên làm việc"
			});						
		}		
		
		//@
		//@ limit
		var limit = 20;
		if(req.query.c2){
			limit = req.query.c2;
		}	
		
		var offset = 0;
		if(req.query.c3){
			offset = req.query.c3;
		}			
		
		
		//@
		//@ sort	
		var sort_field = "orders_speciality_date_orders";
		if(req.query.c4){
			sort_filed = req.query.c4;
		}			
		
		var sort_type = "DESC";
		if(req.query.c5){
			sort_type = req.query.c5;
		}		
		

	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api/app/v5/contronller/controllers-user-getmarketing-order",
			"message": error_send 
		}); 
			
	}	
	

	//return res.send([user_id,limit_data]);



	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		return res.send({ "error" : "2", "position":"api/app/v5/contronller/controllers-user-getmarketing-order", "message": error_send } ); 
		
	}	
		
	//return res.send(de_token);
	//




	//@
	//@
	//@lấy order list
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
			"field"     :"orders_details_speciality_line_order",
			"value"     : "coupon",
			"compare" : "="
		},		
		{   
			"field"     :"coupon_speciality_intro",
			"value"     : user_id,
			"compare" : "="
		},		
		{   
			"field"     :"payment_coupon_coupon_code",
			"value"     : "",
			"compare" : "null"
		}	
	)	
	
	
	var data_order_list =    
	{
	   "select_field" :
		[
			"orders_speciality_ID",
			"orders_speciality_date_orders",
			"orders_speciality_status_orders",
			
			"coupon_speciality_ID",
			"coupon_speciality_code",
			"coupon_speciality_featured_image",			
			
			"orders_speciality_total_qty",
			"orders_speciality_total_product",
			"orders_speciality_total_marketing",
			"coupon_speciality_intro_price",
			"coupon_speciality_intro_price_limit"
		],
		"condition" :
		[
			{    
			"relation": "and",
			"where" :condition_data		
			}         
        ],
		"limit" :limit_data	,
		"order" :order_data				
	 }
	
	var result = await order_detail_search(data_order_list,res);	
	return res.send({"error":"","datas":result});
		
	

}

module.exports = function_export;
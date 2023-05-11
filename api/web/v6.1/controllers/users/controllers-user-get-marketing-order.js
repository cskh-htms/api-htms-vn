const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');



const config_api = require('../../configs/config');




const ojs_shares_show_errors = 
	require('../../../../shares/' + 
		config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = 
	require('../../../../shares/' + 
		config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_date = 
	require('../../../../shares/' + 
		config_api.API_SHARES_VERSION + '/ojs-shares-date.js');

const fields_insert = 
	require('../../../../lib/' + 
		config_api.API_LIB_VERSION + '/users/user-fields-insert.js');
const fields_get = 
	require('../../../../lib/' + 
		config_api.API_LIB_VERSION + '/users/user-fields-get.js');


const user_search = 
	require('../../../../lib/' + 
		config_api.API_LIB_VERSION + '/users/user-search.js');
const check_role = 
	require('../../../../shares/' + 
		config_api.API_SHARES_VERSION + '/check-role');

const get_meta_user = 
	require('../../../../shares/' + 
		config_api.API_SHARES_VERSION + '/get-meta-user.js');

const order_detail_search = 
	require('../../../../lib/' + 
		config_api.API_LIB_VERSION + '/order-details/order-detail-search-by-marketing');




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
				"position" : "api/web/v5/contronller/controllers-user-getmarketing-order",
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
		
		var date_star = ojs_shares_date.get_current_month_now();
		if(req.query.c6){
			date_star = req.query.c6;
		}			
		
		var date_end = ojs_shares_date.get_current_date_end();
		if(req.query.c7){
			date_end = req.query.c7;
		}		
		
		
		var order_status = "all";
		if(req.query.c8){
			order_status = req.query.c8;
		}			
		
		
		var cong_no = "all";
		if(req.query.c9){
			cong_no = req.query.c9;
		}	
		
		
		var coupon = "all";
		if(req.query.c10){
			coupon = req.query.c10;
		}			
		
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api/web/v5/contronller/controllers-user-getmarketing-order",
			"message": error_send 
		}); 
			
	}	
	


	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		return res.send({ "error" : "2", "position":"api/web/v5/contronller/controllers-user-getmarketing-order", "message": error_send } ); 
		
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
			"field"     :"orders_speciality_date_orders",
			"value"     : date_star,
			"compare" : ">"
		},
		{   
			"field"     :"orders_speciality_date_orders",
			"value"     : date_end,
			"compare" : "<"
		}			
	)	
	
	
	
	
	//@
	//@ loc coupon
	if(coupon != "all"){
		condition_data.push(	
			{   
				"field"     :"coupon_speciality_code",
				"value"     : coupon,
				"compare" : "="
			}			
		)
	}	
	
	
	
	
	//@
	//@ loc cong no
	if(cong_no != "all"){
		if(cong_no == 1){
			condition_data.push(	
				{   
					"field"     :"payment_coupon_ID",
					"value"     : 0,
					"compare" : ">"
				}			
			)				
		}else{
			condition_data.push(	
				{   
					"field"     :"payment_coupon_ID",
					"value"     : "",
					"compare" : "null"
				}			
			)					
		}

	}
	//return res.send(condition_data);	
	
	
	
	
	
	
	
	//@
	//@ loc order status
	if(order_status != "all"){
		if(order_status == 1){
			condition_data.push(	
				{   
					"field"     :"orders_speciality_status_orders",
					"value"     : 100,
					"compare" : "="
				}			
			)				
		}else{
			condition_data.push(	
				{   
					"field"     :"orders_speciality_status_orders",
					"value"     : 21,
					"compare" : "="
				}			
			)					
		}
	}else{			
		condition_data.push(	
			{   
				"field"     :"orders_speciality_status_orders",
				"value"     : [-1,102],
				"compare" : "not in"
			}			
		)				
	}	
	
	
	
	
	
	//return res.send(condition_data);
	
	
	var data_order_list =    
	{
	   "select_field" :
		[
				"orders_speciality_ID",
				"orders_speciality_date_orders",
				"orders_speciality_status_orders",
				"orders_speciality_total_qty",
				"orders_speciality_total_product",
				"orders_speciality_total_shipping",
				"orders_speciality_total_coupon_store",
				"orders_speciality_total_coupon_dala",
				"orders_speciality_total_fee",					
				"orders_speciality_total_caution",
				"orders_speciality_total_marketing",
				
				
				"coupon_speciality_ID",
				"coupon_speciality_code",
				"coupon_speciality_intro" ,
				"coupon_speciality_intro_price",
				"coupon_speciality_intro_price_limit",				
				
				"payment_coupon_ID",
				
				"users_full_name",
				"users_ID"
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
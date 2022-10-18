const express = require('express');
const router = express.Router();


const ojs_configs = require('../../../../../configs/config');


const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-fields-insert');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_order_customer = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-order-customer.js');

const orders_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search-by-customer.js');






//@
//@
//@
//@  export
async  function function_export(req, res, next) {
	try {
		var token = req.headers['token'];
		
		var user_id = -1;
		if(req.query.c1){
			user_id = req.query.c1;
		}				
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request insert order, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "3", 
			"position" : "api/app/v5/ctroller/order/by-customer",
			"message": error_send 
		}); 
		return;	
	}

	//res.send([token,order_id]);
	//return;



	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);
	if(
	check_role_result == "customer" 
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
			"error" : "4",
			"position" : "api/app/v5/ctroller/order/by-customer",
			"message": error_send 
		}); 
		return;			
	}
	
	
	//res.send(check_role_result);
	//return;	





	//@ check status update
	try{
		var datas_order = 
		{
			"select_field" :
			[ 
                "orders_speciality_ID",
                "orders_speciality_date_orders",
                "orders_speciality_status_orders",
                "orders_details_speciality_line_order",
                "products_speciality_name",
                "orders_details_speciality_qty",
                "orders_details_speciality_price",
                "price_caution",
                "orders_speciality_adress",
                "orders_speciality_phone",
                "users_full_name",
                "orders_speciality_province",
                "orders_speciality_district",
                "orders_speciality_wards",
                "products_speciality_featured_image"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
						{   
							"field"     :"users_ID",
							"value"     : user_id,
							"compare" : "="
						} 						
					]    
				}         
			], 
			"order" :
			 [		 
				{    
					"field"  :"orders_speciality_date_orders",
					"compare" : "DESC"
				}			
			 ],			
		}
		//return datas;		
		
		var orders_search_result = await orders_search(datas_order,res);
		
		//@
		res.send({"error":"","datas":orders_search_result});
		return;
			
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error,
			"Lổi tìm cửa hàng" 
		);
		res.send({ 
			"error" : "8", 
			"position":"api/app/v5/ctroller/order/by-customer", 
			"message": error_send 
		});
		return;				
	}	





}










//@
//@
//@
//@  export
module.exports = function_export;




//@
//@
//@
//@  file end
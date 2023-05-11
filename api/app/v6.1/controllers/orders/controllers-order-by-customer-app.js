const express = require('express');
//@
//@
//@
//@
//@
//@
const router = express.Router();
const config_api = require('../../configs/config');

const ojs_shares_show_errors = 
	require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_insert = 
	require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-fields-insert');
const check_role = 
	require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_order_customer = 
	require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-order-customer.js');
const orders_search = 
	require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search-by-customer.js');






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
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request insert order, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3", 
			"position" : "api/app/v5/ctroller/order/by-customer",
			"message": error_send 
		}); 
			
	}

	//return res.send([token,user_id]);
	//



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
                "products_speciality_featured_image",
				
				
				
                "orders_speciality_master_adress",
                "orders_speciality_master_phone",				
				"orders_speciality_master_province",
                "orders_speciality_master_district",
                "orders_speciality_master_wards",								
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
		return res.send({"error":"","datas":orders_search_result});
		
			
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error,
			"Lổi tìm cửa hàng" 
		);
		return res.send({ 
			"error" : "8", 
			"position":"api/app/v5/ctroller/order/by-customer", 
			"message": error_send 
		});
						
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
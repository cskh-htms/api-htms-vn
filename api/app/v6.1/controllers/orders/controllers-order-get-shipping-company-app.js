const express = require('express');
const router = express.Router();


const config_api = require('../../configs/config');


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
		
		var order_id = -1;
		if(req.query.c1){
			order_id = req.query.c1;
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
			"position" : "api/app/v5/ctroller/order/get-shipping-company",
			"message": error_send 
		}); 
			
	}

	//return res.send([token,order_id]);
	//








	//@ check status update
	try{
		var datas_order = 
		{
			"select_type":"DISTINCT",
			"select_field" :
			[ 
                "orders_speciality_company"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
						{   
							"field"     :"orders_speciality_ID",
							"value"     : order_id,
							"compare" : "="
						} 						
					]    
				}         
			]		
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
			"position":"api/app/v5/ctroller/order/get-shipping-company", 
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

const jwt = require('jsonwebtoken');
const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const ojs_shares_show_errors = require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const orders_search_by_customer = require('../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search-by-customer.js');


const check_owner_order_customer = async function(token,order_id,res){
	//return "sdasdasd";
	try {
		var users_decode = jwt.decode(token);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "check_owner_store , liên hệ admin" );
		return res.send ({ 
			"error" : "1", 
			"position" : "check-owner-order-customer", 
			"message": error_send 
		});
		
	}

	try {
		var datas = 
		{
			"select_field" :
			[ 
				"orders_speciality_ID"
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
						},
						{   
							"field"     :"orders_speciality_user_id",
							"value"     : users_decode.users_ID,
							"compare" : "="
						}  						
					]    
				}         
			]  
		}
		//return datas;
		
		var orders_search_by_customer_resuilt = await orders_search_by_customer(datas,res);
		
		if(orders_search_by_customer_resuilt.length >  0 && orders_search_by_customer_resuilt[0].orders_speciality_ID > 0){
			return 1;
		}else{
			return 0;
		};
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check-owner store, Vui lòng liên hệ admin" 
			);
		return res.send ({ 
			"error" : "2",
			"position" : "check-owner-order-customer", 
			"message": error_send 
			}); 
			
	}

	
}
module.exports = check_owner_order_customer;











//@
//@
//@
//@
//@
//@ require
const jwt = require('jsonwebtoken');
const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const ojs_shares_show_errors = require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const orders_search = require('../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search.js');




//@
//@
//@
//@
//@
//@ export
const function_export = async function(token,order_id,res){
	//return "sdasdasd";
	try {
		var users_decode = jwt.decode(token);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "check_owner , liên hệ admin" );
		return res.send ({ 
			"error" : "1", 
			"position" : "lib->share->check-owner-order-store", 
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
							"field"     :"users_ID",
							"value"     : users_decode.users_ID,
							"compare" : "="
						}  						
					]    
				}         
			]  
		}
		//return datas;
		
		var result = await orders_search(datas,res);
		
		if(result.length >  0 && result[0].orders_speciality_ID > 0){
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
				"Lỗi check-owner, Vui lòng liên hệ admin" 
			);
		return res.send ({ 
			"error" : "2",
			"position" : "lib->share->check-owner-order-store", 
			"message": error_send 
			}); 
			
	}

	
}





//@
//@
//@
//@
//@
//@ export
module.exports = function_export;









//@
//@
//@
//@
//@
//@ end









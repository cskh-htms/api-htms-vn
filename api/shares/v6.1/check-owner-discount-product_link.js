
const jwt = require('jsonwebtoken');
const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const ojs_shares_show_errors = require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const discount_product_search = require('../../lib/' + config_api.API_LIB_VERSION + '/discounts-products/discount-product-search.js');


const check_owner_product = async function(token,link_id,res){
	try {
		var users_decode = jwt.decode(token);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "check_owner_product , liên hệ admin" );
		return res.send ({ "error" : "1", "position":"api/shares/check_owner_discount_product_link","message": error_send });
		
	}

	try {
		var datas = 
		{
			"select_field" :
			[ 
				"discount_program_product_link_ID"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
						{   
							"field"     :"users_ID",
							"value"     : users_decode.users_ID,
							"compare" : "="
						},
						{   
							"field"     :"discount_program_product_link_ID",
							"value"     : link_id,
							"compare" : "="
						}  						
					]    
				}         
			]  
		}
		var discount_product_search_resuilt = await discount_product_search(datas);
		
		
		if(discount_product_search_resuilt.length >  0 && discount_product_search_resuilt[0].discount_program_product_link_ID > 0){
			return 1;
		}else{
			return 0;
		};
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check_owner_discount_product_link, Vui lòng liên hệ admin" 
			);
		return res.send ({ 
			"error" : "2",
			"position" : "check_owner_discount_product_link", 
			"message": error_send 
			}); 
			
	}

	
}
module.exports = check_owner_product;



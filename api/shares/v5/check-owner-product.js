
const jwt = require('jsonwebtoken');
const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const ojs_shares_show_errors = require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const product_search = require('../../lib/' + config_api.API_LIB_VERSION + '/products/product-search.js');


const check_owner_product = async function(token,product_id,res){
	try {
		var users_decode = jwt.decode(token);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "check_owner_product , liên hệ admin" );
		res.send ({ "error" : "1", "position":"api/shares/check_owner_product","message": error_send });
		return;
	}

	try {
		var datas = 
		{
			"select_field" :
			[ 
				"products_speciality_ID"
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
							"field"     :"products_speciality_ID",
							"value"     : product_id,
							"compare" : "="
						}  						
					]    
				}         
			]  
		}
		var product_search_resuilt = await product_search(datas);
		
		
		if(product_search_resuilt.length >  0 && product_search_resuilt[0].products_speciality_ID > 0){
			return 1;
		}else{
			return 0;
		};
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check-owner product, Vui lòng liên hệ admin" 
			);
		res.send ({ 
			"error" : "2",
			"position" : "check-owner product", 
			"message": error_send 
			}); 
		return;	
	}

	
}
module.exports = check_owner_product;



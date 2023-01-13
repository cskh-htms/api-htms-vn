
const jwt = require('jsonwebtoken');
const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const ojs_shares_show_errors = require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const brand_search = require('../../lib/' + config_api.API_LIB_VERSION + '/brands/brand-search.js');


const check_owner_brand = async function(token,brand_id,res){
	try {
		var users_decode = jwt.decode(token);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "check_owner_brand , liên hệ admin" );
		res.send ({ "error" : "1", "position":"api/shares/check_owner_brand","message": error_send });
		return;
	}

	try {
		var datas = 
		{
			"select_field" :
			[ 
				"brands_ID"
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
							"field"     :"brands_ID",
							"value"     : brand_id,
							"compare" : "="
						}  						
					]    
				}         
			]  
		}
		
		
		var brand_search_resuilt = await brand_search(datas);
		
		if(brand_search_resuilt.length >  0 && brand_search_resuilt[0].brands_ID > 0){
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
				"Lỗi api->shares->check-owner-brand, Vui lòng liên hệ admin" 
			);
		res.send ({ 
			"error" : "2",
			"position" : "api->shares->check-owner-brand", 
			"message": error_send 
			}); 
		return;	
	}

	
}
module.exports = check_owner_brand;



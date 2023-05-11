
const jwt = require('jsonwebtoken');
const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const ojs_shares_show_errors = require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const store_search = require('../../lib/' + config_api.API_LIB_VERSION + '/stores/store-search.js');


const check_owner_store = async function(token,store_id,res){
	try {
		var users_decode = jwt.decode(token);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "check_owner_store , liên hệ admin" );
		return res.send ({ "error" : "1", "position":"api/shares/check_owner_store","message": error_send });
		
	}

	try {
		var datas = 
		{
			"select_field" :
			[ 
				"stores_ID"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
						{   
							"field"     :"stores_user_id",
							"value"     : users_decode.users_ID,
							"compare" : "="
						},
						{   
							"field"     :"stores_ID",
							"value"     : store_id,
							"compare" : "="
						}  						
					]    
				}         
			]  
		}
		var store_search_resuilt = await store_search(datas);
		if(store_search_resuilt.length >  0 && store_search_resuilt[0].stores_ID > 0){
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
				"Lỗi check-owner store, Vui lòng liên hệ admin" 
			);
		return res.send ({ 
			"error" : "2",
			"position" : "check-owner store", 
			"message": error_send 
			}); 
			
	}

	
}
module.exports = check_owner_store;



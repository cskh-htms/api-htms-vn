
const jwt = require('jsonwebtoken');
const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const ojs_shares_show_errors = require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const meta_adress_search = require('../../lib/' + config_api.API_LIB_VERSION + '/meta-adress/meta-adress-search.js');



const function_export = async function(token,meta_id,res){
	
	//return meta_id;
	try {
		var users_decode = jwt.decode(token);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"check_owner_coupon , liên hệ admin" 
		);
		res.send ({ 
			"error" : "1", 
			"position":"api/shares/check_owner_meta-adress",
			"message": error_send 
		});
		return;
	}


	//return users_decode.users_ID;


	try {
		var datas = 
		{
			"select_field" :
			[ 
				"adress_meta_user_id"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
						{   
							"field"     :"adress_meta_ID",
							"value"     : meta_id,
							"compare" : "="
						}					
					]    
				}         
			]  
		}
		
		
		//return datas;
		
		
		
		var meta_adress_search_resuilt = await meta_adress_search(datas,res);
		
		//res.send(meta_adress_search_resuilt);
		//return;
		
		if(meta_adress_search_resuilt.length >  0 && meta_adress_search_resuilt[0].adress_meta_user_id == users_decode.users_ID){
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
				"Lỗi check-owner meta adress, Vui lòng liên hệ admin" 
			);
		res.send ({ 
			"error" : "2",
			"position" : "check-owner meta adress", 
			"message": error_send 
			}); 
		return;	
	}

	
}
module.exports = function_export;



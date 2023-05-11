
const jwt = require('jsonwebtoken');
const config_api = require('./configs/config');



const ojs_shares_show_errors = require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const option_search = require('../../lib/' + config_api.API_LIB_VERSION + '/options/option-search.js');


const check_owner_option = async function(token,option_id,res){
	try {
		var users_decode = jwt.decode(token);
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "check_owner_option , liên hệ admin" );
		return res.send ({ "error" : "1", "position":"api/shares/check_owner_option","message": error_send });
		
	}

	try {
		var datas = 
		{
			"select_field" :
			[ 
				"options_product_speciality_ID"
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
							"field"     :"options_product_speciality_ID",
							"value"     : option_id,
							"compare" : "="
						}  						
					]    
				}         
			]  
		}
		
		
		var option_search_resuilt = await option_search(datas);
		
		if(option_search_resuilt.length >  0 && option_search_resuilt[0].options_product_speciality_ID > 0){
			return 1;
		}else{
			return 0;
		};
		
		
		
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi api->shares->check-owner-option, Vui lòng liên hệ admin" 
			);
		return res.send ({ 
			"error" : "2",
			"position" : "api->shares->check-owner-option", 
			"message": error_send 
			}); 
			
	}

	
}
module.exports = check_owner_option;




const jwt = require('jsonwebtoken');
const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const ojs_shares_show_errors = require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const category_search = require('../../lib/' + config_api.API_LIB_VERSION + '/categorys/categorys-search.js');


const check_owner_category = async function(token,category_id,res){
	try {
		var users_decode = jwt.decode(token);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "check_owner_category , liên hệ admin" );
		return res.send({ "error" : "1", "position":"api/shares/check_owner_category","message": error_send });
	}

	try {
		var datas = 
		{
			"select_field" :
			[ 
				"category_general_speciality_ID"
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
							"field"     :"category_general_speciality_ID",
							"value"     : category_id,
							"compare" : "="
						}  						
					]    
				}         
			]  
		}
		
		
		var category_search_resuilt = await category_search(datas);
		
		if(category_search_resuilt.length >  0 && category_search_resuilt[0].category_general_speciality_ID > 0){
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
				"Lỗi api->shares->check-owner-category, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "2",
			"position" : "api->shares->check-owner-category", 
			"message": error_send 
			}); 
			
	}

	
}
module.exports = check_owner_category;



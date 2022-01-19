
const jwt = require('jsonwebtoken');
const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');

const reviews_search = require('../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-search.js');
const ojs_shares_show_errors = require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors.js');

const check_owner_review = async function(token,review_id,res){
	
	try {
		var users_decode = jwt.decode(token);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi check_owner_review , liên hệ admin" );
		res.send ({ 
			"error" : "1", 
			"position":"api/shares/check_owner_review",
			"message": error_send 
		});
		return;
	}		
	
	try {
		var datas = 
		{
			"select_field" :
			[ 
				"reviews_speciality_ID"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
						{   
							"field"     :"reviews_speciality_ID",
							"value"     : review_id,
							"compare" : "="
						},
						{   
							"field"     :"reviews_speciality_user_id",
							"value"     : users_decode.users_ID,
							"compare" : "="
						}  						
					]    
				}         
			]  
		}
		var reviews_search_resuilt = await reviews_search.search_reviews_spaciality(datas);
		if(reviews_search_resuilt.length >  0 && reviews_search_resuilt[0].reviews_speciality_ID > 0){
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
				"Lỗi check-owner reviews, Vui lòng liên hệ admin" 
			);
		res.send ({ 
			"error" : "2",
			"position" : "check-owner reviews", 
			"message": error_send 
			}); 
		return;	
	}			
	
}
module.exports = {
	check_owner_review
}


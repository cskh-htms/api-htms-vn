
const jwt = require('jsonwebtoken');
const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');

const reviews_search = require('../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-search.js');


const check_owner_review = async function(token,review_id){
	
	try {
		var users_decode = jwt.decode(token);
	}
	catch(error){
		return { "error" : "1", "position":"shares-check-owner-review","message": "Lỗi function check_owner_review" };
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
		return (reviews_search_resuilt);
	}
	catch(error){
		return { "error" : "2", "position":"shares-check-owner-review","message": "Lỗi function check_owner_review" };
	}		
	
	
}
module.exports = {
	check_owner_review
}


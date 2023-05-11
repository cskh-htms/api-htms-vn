
const jwt = require('jsonwebtoken');
const config_api = require('./configs/config');


const ojs_shares_show_errors = require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const coupon_search = require('../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search.js');


const function_export = async function(token,coupon_id,res){
	//return coupon_id;
	try {
		var users_decode = jwt.decode(token);
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"check_owner_coupon , liên hệ admin" 
		);
		return res.send({ 
			"error" : "1", 
			"position":"api/shares/check_owner_coupon",
			"message": error_send 
		});
		
	}


	//return users_decode.users_ID;


	try {
		var datas = 
		{
			"select_field" :
			[ 
				"coupon_speciality_ID"
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
							"field"     :"coupon_speciality_ID",
							"value"     : coupon_id,
							"compare" : "="
						}  						
					]    
				}         
			]  
		}
		
		
		//return datas;
		
		
		
		var coupon_search_resuilt = await coupon_search(datas,res);
		
		if(coupon_search_resuilt.length >  0 && coupon_search_resuilt[0].coupon_speciality_ID > 0){
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
				"Lỗi check-owner coupon, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "2",
			"position" : "check-owner coupon", 
			"message": error_send 
			}); 
		
	}

	
}
module.exports = function_export;



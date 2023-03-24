const express = require('express');
const router = express.Router();


const ojs_configs = require('../../../../../configs/config');


const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_order_customer = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-order-customer.js');

const coupon_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search.js');



//@
async  function get_all(req, res, next) {
	//return res.send(["sdasdas","sdasdasdasd"]);
	//
	try {
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request coupon get all , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3", 
			"position" : "api/app/v5/coupons/get-all",
			"message": error_send 
		}); 
			
	}

	//return res.send([token]);
	//


	
	//return res.send(check_role_result);
	//	

	//@ get data
	try{
		var datas = 
		{
			"select_field" :
			[ 
				"coupon_speciality_ID",
				"coupon_speciality_code",
				"coupon_speciality_featured_image",
				"coupon_speciality_stores_id_created",
				"coupon_speciality_info",
				"coupon_speciality_type",
				"coupon_speciality_formula_price",
				"coupon_speciality_formula_price_value",
				"coupon_speciality_condition",
				"coupon_speciality_condition_value",
				"coupon_speciality_price_max",
				"coupon_speciality_date_star",
				"coupon_speciality_date_end",
				"coupon_speciality_multiple",
				"coupon_speciality_status_admin",
				"coupon_speciality_limit_user",
				"coupon_speciality_limit_number",
				"coupon_speciality_qoute",
				"stores_ID",
				"stores_name"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
						{   
							"field"     :"check_expired_coupon",
							"value"     : 1,
							"compare" : "="
						} ,
						{   
							"field"     :"coupon_speciality_status_admin",
							"value"     : 4,
							"compare" : "="
						} ,
						{   
							"field"     :"coupon_speciality_show_hide",
							"value"     : 1,
							"compare" : "="
						} 
					]    
				}         
			],
			"order" :
			[
				 {    
					"field"  :"coupon_speciality_date_created",
					"compare" : "DESC"
				 }   
			]   
		}
		//return datas;		
		
		var coupon_search_result = await coupon_search(datas,res);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error,
			"Lổi lấy data, liên hệ admin DALA " 
		);
		return res.send({ 
			"error" : "8", 
			"position":"ctl-coupon search", 
			"message": error_send 
		});
						
	}	


	//@
	return res.send({"error":"","datas":coupon_search_result});
	
}

module.exports = get_all;
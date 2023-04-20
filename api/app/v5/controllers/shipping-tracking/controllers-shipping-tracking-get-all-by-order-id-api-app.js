const express = require('express');
const router = express.Router();


const ojs_configs = require('../../../../../configs/config');


const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_order_customer = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-order-customer.js');

const shipping_tracking_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/shipping-tracking/shipping-tracking-search.js');



//@
async  function get_all_by_order_id(req, res, next) {
	//return res.send(["sdasdas","sdasdasdasd"]);
	//
	try {
		var order_id = req.params.order_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request shipping tracking , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3", 
			"position" : "api/app/v5/shipping_tracking/search",
			"message": error_send 
		}); 
			
	}

	//return res.send([token,order_id]);
	//

	


	//@ check owner user
	const check_owner_order_customer_resuilt = await check_owner_order_customer(token,order_id,res);
	if(check_owner_order_customer_resuilt != 1){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				"Lỗi phân quyền , Vui lòng liên hệ admin" , 
				"Lỗi phân quyền , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "5",
			"position" : "api/app/v5/shipping_tracking/search", 
			"message": error_send 
		}); 
					
	}


	//return res.send([check_owner_order_customer_resuilt]);
	//	


	//@ check status update
	try{
		var datas = 
		{
			"select_field" :
			[ 
				"shipping_tracking_ID",
				"shipping_tracking_date_created",
				"shipping_tracking_users_id",
				"shipping_tracking_orders_id",
				"shipping_tracking_infomation",
				"shipping_tracking_orders_status",
				"shipping_tracking_qoute",
				"users_full_name"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
						{   
							"field"     :"orders_speciality_ID",
							"value"     : order_id,
							"compare" : "="
						} 						
					]    
				}         
			],
			"order" :
			[
				 {    
					"field"  :"shipping_tracking_date_created",
					"compare" : "DESC"
				 }   
			]   
		}
		//return datas;		
		
		var shipping_tracking_search_result = await shipping_tracking_search(datas,res);
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
			"position":"ctl-shipping_tracking_search", 
			"message": error_send 
		});
						
	}	


	//@
	return res.send({"error":"","datas":shipping_tracking_search_result});
	
}

module.exports = get_all_by_order_id;
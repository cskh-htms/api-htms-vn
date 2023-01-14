

//@
//@
//@
//@ file start

const express = require('express');
const router = express.Router();

const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');


const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');

const discount_link_delete = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts-products/discount-product-delete.js');
const store_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-search');






//@
//@
//@
//@ export
async  function function_export(req, res, next) {
	
	
	//@ lấy req data
	try {
		var token = req.headers['token'];
		//@
		//@
		var product_link_id = 0;
		if(req.query.c1){
			product_link_id = req.query.c1;
		}else{
			res.send({ 
				"error" : "01", 
				"position" : "controller->api-appdalacom->controllers-discount-delete.js",
				"message": "vui lòng nhập id"
			}); 	
			return;
		}	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1", 
			"position" : "controller->api-appdalacom->controllers-discount-delete.js",
			"message": error_send 
		}); 
		return;	
	}	
	
	//res.send([product_link_id]);
	//return;
	
	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);
	if(
	check_role_result == "bussiness" 
	|| check_role_result == "admin" 
	){
		//go
	}
	else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				check_role_result, 
				"Lỗi phân quyền, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "3",
			"position" : "controller->api-appdalacom->controllers-discount-delete.js", 
			"message": error_send 
		}); 
		return;			
	}


	//res.send([check_role_result]);
	//return;
	
	
	//@ lấy id cửa hàng để check owner store
	if(check_role_result == "bussiness"){
		var user_id = ojs_shares_others.get_users_id(token);
		let data_store =    
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
						"value"     : user_id,
						"compare" : "="
					}           
					]    
				}         
			]   
		}
		
		
		var store_search_result = await store_search(data_store,res);
		var store_id = store_search_result[0].stores_ID;
		
		//@ check owner store id
		const check_owner_store_resuilt = await check_owner_store(token,store_id,res);
		//res.send([check_owner_store_resuilt]);
		//return;		
		
		
		if(	check_owner_store_resuilt == "1" ){
			//go
		}
		else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					check_role_result, 
					"Lỗi phân quyền, Vui lòng liên hệ admin" 
				);
			res.send({ 
				"error" : "232",
				"position" : "ctroller->api-appdalacom->controllers-coupon-add-appdalacom-api.js", 
				"message": error_send 
			}); 
			return;			
		}		
	
	}//@enf fi check store owner
	
	var discount_link_delete_result = await discount_link_delete(product_link_id,res);
	
	res.send({"error":"","datas": discount_link_delete_result});
	return;


}





//@
//@
//@
//@ export
module.exports = function_export;








//@
//@
//@
//@ file end










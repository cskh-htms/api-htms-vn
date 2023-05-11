const express = require('express');
const router = express.Router();

const config_api = require('../../configs/config');




const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts/discount-fields-insert');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');

const product_sale = require('../../../../lib/' + config_api.API_LIB_VERSION + '/order-details/order-detail-search-by-store.js');






//@
//@
//@
//@ function export
async  function function_export(req, res, next) {
	
	try {
		var token = req.headers['token'];
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request product id, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api/app/v5/ctroller/controllers-product-sale-app",
			"message": error_send 
		}); 
			
	}






	//@ lấy req data
	try {
		//@ 3. get model
		let data_get =    
		{
		   "select_field" :
			[
				"sum(orders_details_speciality_qty)",
				"orders_details_speciality_product_id",
				"products_speciality_name"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"orders_speciality_status_orders",
						"value"     : "100",
						"compare" : "="
					}
					] 				
				}         
			],
			"group_by" :
			 [
				"orders_details_speciality_product_id"
			 ]   
		}
		

		//@ get datas
		var data_product = await product_sale(data_get,res);
		return res.send({"error":"","datas":data_product}); 
				

	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data product, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3", 
			"position" : "api/app/v5/ctroller/controllers-product-sale-app",
			"message": error_send 
		}); 
			
	}		
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
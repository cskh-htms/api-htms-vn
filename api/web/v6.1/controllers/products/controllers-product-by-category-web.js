const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const multer = require('multer');
const WPAPI = require( 'wpapi' );

const ojs_configs = require('../../../../../configs/config');


const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts/discount-fields-insert');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');

const product_search_by_category = require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search-by-category.js');
const get_meta_product = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-product.js');


//@
async  function controllers_product_by_category_app(req, res, next) {
	
	try {
		var token = req.headers['token'];
		var category_id = -1;
		if(req.query.c1){
			category_id = req.query.c1;
		}		
		var limit_data = [];
		if(req.query.c2){
			  limit_data.push({"limit_number" : req.query.c2});
		}		
		if(req.query.c3){
			  limit_data.push({"limit_offset" : req.query.c3});
		}		
		
		
		//return res.send(limit_data);
		//
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request product, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api/web/v5/ctroller/controllers-product-by-category-app",
			"message": error_send 
		}); 
			
	}







	//@ lấy req data
	try {
		//@ 3. get model
		let data_get =    
		{
		   "select_type" : "DISTINCT",
		   "select_field" :
			[
				"products_speciality_ID",
				"products_speciality_featured_image",
				"products_speciality_name",
				"products_speciality_price",
				"products_speciality_price_caution",
				"products_speciality_sale_of_price",
				"products_speciality_sale_of_price_time_check",
				"products_speciality_stock_status",
				"products_speciality_stock",
				"products_speciality_sku",
				"products_speciality_type",				
				"stores_name",
				"stores_ID",
				"products_speciality_sort_by_percen"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"category_general_speciality_ID",
						"value"     : category_id,
						"compare" : "="
					},				
					{   
						"field"     :"products_speciality_status_store",
						"value"     : "1",
						"compare" : "="
					} ,				
					{   
						"field"     :"stores_status_admin",
						"value"     : "1",
						"compare" : "="
					},				
					{   
						"field"     :"products_speciality_status_admin",
						"value"     : "1",
						"compare" : "="
					},				
					{   
						"field"     :"out_of_stock",
						"value"     : "0",
						"compare" : "="
					},				
					{   
						"field"     :"products_speciality_show_hide",
						"value"     : "0",
						"compare" : "="
					} 						
					] 				
				}         
			],
			"order" :
			 [		 
				{    
					"field"  :"products_speciality_sort_by_percen",
					"compare" : "DESC"
				}			
			 ],
			 "limit" :limit_data
		}
	
		//@ get datas
		var data_product = await product_search_by_category(data_get,res);
		//return res.send(data_product);
		//
		//@ create arr ID product
		var model_product_arr = [0];
		if(data_product.length > 0){
			for(x in data_product){
				if(data_product[x].products_speciality_ID){
					model_product_arr.push(data_product[x].products_speciality_ID);
				}
			}
		}	

	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data product, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "3", 
			"position" : "api/web/v5/ctroller/controllers-product-by-category-app",
			"message": error_send 
		}); 
			
	}		
		



	//@ lấy meta
	try {
		var get_meta_product_resuilt = await get_meta_product(data_product,model_product_arr,res);
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data product, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "4", 
			"position" : "api/web/v5/ctroller/controllers-product-by-category-app",
			"message": error_send 
		}); 
			
	}



	return res.send({"error":"","datas":get_meta_product_resuilt}); 
	
	
}

module.exports = controllers_product_by_category_app;
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

const product_search_by_brand = require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search-by-brand.js');
const get_meta_product = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-product.js');


//@
async  function controllers_product_by_id_app(req, res, next) {
	
	try {
		var token = req.headers['token'];
		var product_id = -1;
		if(req.query.c1){
			product_id = req.query.c1;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request product id, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "1", 
			"position" : "api/app/v5/ctroller/controllers-product-by-id-app",
			"message": error_send 
		}); 
		return;	
	}







	//@ lấy req data
	try {
		//@ 3. get model
		let data_get =    
		{
		   "select_field" :
			[
				"products_speciality_ID",
				"products_speciality_name",
				"products_speciality_price",
				"products_speciality_sale_of_price_time_check",
				"products_speciality_price_caution",
				"products_speciality_featured_image",
				"products_speciality_image_slider",
				"stores_ID",
				"stores_name",
				"stores_logo_image",
				"brands_ID",
				"brands_name",
				"brands_featured_image",
				"products_speciality_length",
				"products_speciality_width",
				"products_speciality_height",
				"products_speciality_weight",
				"products_speciality_contents",	
				"products_speciality_sale_of_price",
				"products_speciality_stock_status",
				"products_speciality_stock",
				"products_speciality_sku",
				"products_speciality_type",
				"out_of_stock",
				"products_speciality_sort_by_percen"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"products_speciality_ID",
						"value"     : product_id,
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
					}				
					] 				
				}         
			],
			"order" :
			 [		 
				{    
					"field"  :"products_speciality_date_created",
					"compare" : "DESC"
				}			
			]    
		}
		

		//@ get datas
		var data_product = await product_search_by_brand(data_get,res);
		
		
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
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data product, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "3", 
			"position" : "api/app/v5/ctroller/controllers-product-by-id-app",
			"message": error_send 
		}); 
		return;	
	}		
		

	//res.send({"error":"","datas":model_product_arr}); 
	//return;

	//@ lấy meta
	try {
		var get_meta_product_resuilt = await get_meta_product(data_product,model_product_arr,res);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data product, Vui lòng liên hệ admin" 
			);
		res.send({ 
			"error" : "4", 
			"position" : "api/app/v5/ctroller/controllers-product-by-id-app",
			"message": error_send 
		}); 
		return;	
	}



	res.send({"error":"","datas":get_meta_product_resuilt}); 
	return;
	
}

module.exports = controllers_product_by_id_app;
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

const product_fillter = require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-fillter.js');
const get_meta_product = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-product.js');


//@
async  function function_export(req, res, next) {
	
	try {
		var token = req.headers['token'];
		var datas  = req.body.datas;	
		
		//return res.send(datas);
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
			"position" : "api/web/v5/ctroller/controllers-product-fillter-web",
			"message": error_send 
		}); 
			
	}







	//@
	//@
	//@ tạo condition
	
	//@ limit
	var limit_data = [];
	if(datas.limit){
		limit_data.push(
			{
				"limit_number" : datas.limit
			}
		);		
	}
	if(datas.offset){
		limit_data.push(
			{
				"limit_offset" : datas.offset
			}
		);		
	}	
	
	
	//@ order
	var order_data = [];
	if(datas.sort){
		if(datas.sort.by_price == "ASC"){
			order_data.push(
				{
					"field"  :"products_speciality_price_caution",
					"compare" : "ASC"
				}
			)	
		}else if(datas.sort.by_price == "DESC"){
			order_data.push(
				{
					"field"  :"products_speciality_price_caution",
					"compare" : "DESC"
				}
			)
		}
	}
	


	//@ condition
	var condition_data = [		
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
	
	
	
	
	
	
	//@ giá
	if(datas.price_less_than){
		condition_data.push(
			{   
				"field"     :"products_speciality_price_caution",
				"value"     : datas.price_less_than,
				"compare" : "<"
			}
		)		
	}		
	
	if(datas.price_great_than){
		condition_data.push(
			{   
				"field"     :"products_speciality_price_caution",
				"value"     : datas.price_great_than,
				"compare" : ">"
			}
		)		
	}

	
	//@ tên sản phẩm
	if(datas.name){
		condition_data.push(
			{   
				"field"     :"products_speciality_name",
				"value"     : datas.name,
				"compare" : "like"
			}
		)		
	}	
	
	//@ sku
	if(datas.sku){
		condition_data.push(
			{   
				"field"     :"products_speciality_sku",
				"value"     : datas.sku,
				"compare" : "="
			}
		)		
	}	
	
	//@ category
	if(datas.category){
		condition_data.push(
			{   
				"field"     :"category_general_speciality_ID",
				"value"     : datas.category,
				"compare" : "="
			}
		)		
	}


	//@ store
	if(datas.store){
		condition_data.push(
			{   
				"field"     :"stores_ID",
				"value"     : datas.store,
				"compare" : "="
			}
		)		
	}

	//@ brand
	if(datas.brand){
		condition_data.push(
			{   
				"field"     :"brands_ID",
				"value"     : datas.brand,
				"compare" : "in"
			}
		)		
	}
	
	//@ option
	if(datas.option){
		condition_data.push(
			{   
				"field"     :"options_product_speciality_ID",
				"value"     : datas.option,
				"compare" : "in"
			}
		)		
	}	
	
	
	//return res.send(condition_data);
	//
	
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
				"products_speciality_price_caution",				
				"stores_name",
				"stores_ID",
				"products_speciality_sort_by_percen"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :condition_data				
				}         
			],
			"order" :order_data,
			"limit" :limit_data
		}
	
		//@ get datas
		var data_product = await product_fillter(data_get,res);
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
			"position" : "api/web/v5/ctroller/controllers-product-fillter-web",
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
			"position" : "api/web/v5/ctroller/controllers-product-fillter-web",
			"message": error_send 
		}); 
			
	}



	return res.send({"error":"","datas":get_meta_product_resuilt}); 
	
	
}

module.exports = function_export;
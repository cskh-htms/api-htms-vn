

/* 
	* lấy danh sách sản phẩm thuộc discount
	* c1 : id disocunt programe
*/


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

const discount_search_product = require('../../../../lib/' + config_api.API_LIB_VERSION + '/discounts/discount-search-product.js');
const review_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-search.js');
const product_sale = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search-sale-by-store.js');


const get_meta_product = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-product.js');


//@
async  function controllers_discount_by_product_app(req, res, next) {
	//@ lấy req data
	try {
		var token = req.headers['token'];
		var discount_id = -1;
		var order_data = [];
		var limit_data = [];
		if(req.query.c1){
			discount_id = parseInt(req.query.c1);
			if(discount_id == 2){
				order_data.push(
					{
						"field"  :"products_speciality_sort_by_percen",
						"compare" : "DESC"
					}
				)				
				
				limit_data.push(
					{
						"limit_number" : 20,
						"limit_offset":"0"
					}
				);	
			}else{
				order_data.push(
					{
						"field"  :"discount_program_product_link_date_created",
						"compare" : "DESC"
					}
				)				
				
				limit_data.push(
					{
						"limit_number" : 20,
						"limit_offset":"0"
					}
				);	
			}				
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
			"position" : "api/app/v5/ctroller/discounts/controllers_discount_by_product_app",
			"message": error_send 
		}); 
		return;	
	}


	//@ check role phân quyền
	const check_role_result = await check_role.check_role(token,res);
	if(
	check_role_result == "customer" 
	|| check_role_result == "default" 
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
			"error" : "2",
			"position" : "api/app/v5/ctroller/discounts/controllers_discount_by_product_app",
			"message": error_send 
		}); 
		return;			
	}


	//@ 3. get product
	try{
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
				"products_speciality_sort_by_percen",
				"discount_program_product_link_date_created",				
				"stores_name"		
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"discount_program_ID",
						"value"     : discount_id,
						"compare" : "="
					},				
					{   
						"field"     :"products_speciality_status_admin",
						"value"     : "1",
						"compare" : "="
					},
					{   
						"field"     :"check_expired",
						"value"     : 0,
						"compare" : ">"
					},
					{   
						"field"     :"check_date",
						"value"     : 0,
						"compare" : "<"
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
						"field"     :"discount_program_product_link_status",
						"value"     : "1",
						"compare" : "="
					},					
					{   
						"field"     :"discount_program_details_status_admin",
						"value"     : "4",
						"compare" : "="
					},					
					{   
						"field"     :"discount_program_status_admin",
						"value"     : "4",
						"compare" : "="
					},				
					{   
						"field"     :"out_of_stock",
						"value"     : "0",
						"compare" : "="
					} 	
					]    
				}         
			],
			"order" : order_data,
			"limit" : limit_data,
		}
		
		//@ get datas
		var data_product = await discount_search_product(data_get,res);
		
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
		let evn = ojs_configs.evn;
		//evn = "dev";
		let error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"lỗi get product discount discount, liên hệ admin" 
		);
		res.send ({ 
			"error" : "3", 
			"position":"api/app/v5/controller/discounts/controllers-discount-by-product-app",
			"message": error_send 
		});
	}		

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
			"position" : "api/app/v5/ctroller/controllers-product-by-category-app",
			"message": error_send 
		}); 
		return;	
	}





	res.send({"error":"","datas":get_meta_product_resuilt}); 
	return;
	
}

module.exports = controllers_discount_by_product_app;
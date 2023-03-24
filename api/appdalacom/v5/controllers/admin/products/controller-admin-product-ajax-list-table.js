
//@
//@
//@
//@ file start




//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();


const ojs_configs = require('../../../../../../configs/config');
const config_database = require('../../../../../configs/config-database');
const config_api = require('../../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const fields_insert = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/reviews-fields-insert');
const check_role = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');

const get_data_news_bussiness = require('../../../shares/get-data-news-bussiness-appdalacom-api.js');
const get_data_count_bussiness = require('../../../shares/get-data-count-bussiness-appdalacom-api.js');

const store_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-search');
const category_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/categorys/category-search');
const category_search_by_link = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/categorys/category-search-by-link');



const product_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search');
const product_search_by_discount_category = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search-by-discount-category');
const order_search_by_store = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search-by-store.js');
const order_search_sale_by_store = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-search-sale-by-store.js');


const coupon_search_by_store = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/coupons/coupon-search-sale-by-store.js');



const product_search_by_store = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search-by-store.js');
const get_meta_product = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/get-meta-product.js');


const product_fillter = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-fillter.js');




//@
//@
//@
//@ exort function
async  function function_export(req, res, next) {
	//@
	//@
	//@ any thing error
	try {	
		//@
		//@
		//@ lấy data req
		try {
			var token = req.headers['token'];
			var datas  = req.body.datas;
		}
		catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					error, 
					"Lỗi get data request, Vui lòng liên hệ admin" 
				);
			return res.send({ 
				"error" : "1", 
				"position" : "api->controllers->admin->products->ajax-list-table",
				"message": error_send 
			}); 
				
		}	


		// check role;
		const check_role_result = await check_role.check_role(token,res);
		if(
			check_role_result == "admin" 
		){
			//go
		}
		else{
			var evn = ojs_configs.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					check_role_result, 
					"Lỗi phân quyền, Vui lòng liên hệ admin" 
				);
			return res.send({ 
				"error" : "3",
				"position" : "api->controllers->admin->products->ajax-list-table",
				"message": error_send 
			}); 
						
		}
		


		//@
		var limit_data = [];
		limit_data.push(
			{
				"limit_number" : datas.data_limit,
				"limit_offset" : datas.data_offset
			}
		);
		
		var order_data = [];
		if(datas.sort_data == "moinhat"){
			order_data.push(
				{
					"field"  :"products_speciality_date_created",
					"compare" : "DESC"
				}
			)	
		}else if(datas.sort_data == "giacao"){
			order_data.push(
				{
					"field"  :"products_speciality_price",
					"compare" : "DESC"
				}
			)
		}else{
			order_data.push(
				{
					"field"  :"products_speciality_price",
					"compare" : "ASC"
				}
			)
		}		

		
		//@ condition
		var condition_data = [];
		
		
		//@ status
		condition_data.push(
			{   
				"field"     :"products_speciality_status_admin",
				"value"     : datas.status_data,
				"compare" : "in"
			} 
		)		

		
		//@ category
		if(datas.category_data == "all"){
			condition_data.push(
				{   
					"field"     :"category_general_speciality_ID",
					"value"     : datas.category_data,
					"compare" : "<>"
				} 
			)
		}else{
			condition_data.push(
				{   
					"field"     :"category_general_speciality_ID",
					"value"     : datas.category_data,
					"compare" : "="
				} 
			)		
		}
		
		
		
		
		
		//@
		//@
		//@ stock
		if(datas.stock_data == "het_hang"){
			condition_data.push(
				{   
					"field"     :"products_speciality_stock_status",
					"value"     : 1,
					"compare" : "="
				} 
			)
			condition_data.push(
				{   
					"field"     :"products_speciality_stock",
					"value"     : 0,
					"compare" : "<="
				} 
			)				
		}
		
		//gần hết hàng
		if(datas.stock_data == "sap_het_hang"){
			condition_data.push(
				{   
					"field"     :"products_speciality_stock_status",
					"value"     : 1,
					"compare" : "="
				} 
			)
			condition_data.push(
				{   
					"field"     :"products_speciality_stock",
					"value"     : 0,
					"compare" : ">"
				} 
			)		
			condition_data.push(
				{   
					"field"     :"products_speciality_stock",
					"value"     : 5,
					"compare" : "<="
				} 
			)			
		}	
		
		
		
		
		
		//@
		//@
		//@ loc type
		condition_data.push(
			{   
				"field"     :"products_speciality_type",
				"value"     : datas.loc_type_data,
				"compare" : "in"
			} 
		)		

		
		
		
		

		//@
		//@
		//@ loc_khuyen_mai
		if(datas.loc_khuyen_mai_data == "all"){
			//skip
		}else{
			condition_data.push(
				{   
					"field"     :"discount_program_ID",
					"value"     : datas.loc_khuyen_mai_data,
					"compare" : "="
				} 
			)		
		}		
		
		
		
		
		//@
		//@
		//@ name search
		if(datas.text_search_data && datas.text_search_data.length > 2){
		condition_data.push(
			{   
				"field"     :"products_speciality_name",
				"value"     : datas.text_search_data,
				"compare" : "like"
			} 
		)		
		}	
			
		
		
		
		
		//@ discount
		var having_data = [];
		having_data.push(
			{   
				"field"     :"products_speciality_sale_of_price_time_check",
				"value"     : datas.discount_data,
				"compare" : "in"
			} 
		)	
		
		
		
		
		//@ product_list
		try {
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
					"products_speciality_status_store",
					"products_speciality_status_admin",	
					"products_speciality_sort_by_percen",				
					"stores_name",
					"stores_ID"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :condition_data				
					}         
				],
				"order" :order_data,
				"limit" :limit_data,	
				"having" :
				[
					{    
					"relation": "and",
					"where" :having_data				
					}         
				],			
			}
		
			//@ get datas
			var data_product = await product_fillter(data_get,res);
			
			
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
				"position" : "api->controllers->admin->products->ajax-list-table",
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
				"position" : "api->controllers->admin->products->ajax-list-table",
				"message": error_send 
			}); 
				
		}


		//return res.send(data_product);
		//	


		/////////////////////
		////////////////////
		try{	
			var promise_all = [];
			promise_all.push(0);

			//@ 4. category list
			let data_category_list =    
			  {
				"select_field": [
					"category_general_speciality_link_ID",
					"category_general_speciality_link_product_id",
					"category_general_speciality_link_category_general_id",
					"category_general_speciality_ID",
					"category_general_speciality_name"
				],
				"condition": [
				  {
					"relation": "and",
					"where": [
					  {
						"field": "category_general_speciality_admin_status",
						"value": "1",
						"compare": "="
					  }         
					]
				  }
				]
			  }		
			var fn_get_category_list = new Promise((resolve, reject) => {
				let result = category_search_by_link(data_category_list,res);
				resolve(result);
			});	
			promise_all.push(fn_get_category_list);			



			//@ 5.product count all
			let data_product_count_all =    
			{
			   "select_type" : "DISTINCT",
			   "select_field" :
				[
					"products_speciality_ID",
					"products_speciality_sale_of_price_time_check",
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :condition_data				
					}         
				],
				"order" :order_data,
				"limit" :[]	,
				"having" :
				[
					{    
					"relation": "and",
					"where" :having_data				
					}         
				],				
			}
			
			var fn_get_product_count_all = new Promise((resolve, reject) => {
				let result = product_search_by_discount_category(data_product_count_all,res);
				resolve(result);
			});	
			promise_all.push(fn_get_product_count_all);	






			var promise_result = await Promise.all(promise_all);
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
				"error" : "100", 
				"position" : "api->controllers->admin->products->ajax-list-table",
				"message": error_send 
			}); 
				
		}	
		
		let notes = {
			"0":"no", 
			"1":"category",
			"2":"product", 
		}
		
		promise_result.push(data_product);		
		promise_result.push(notes);
		

		return res.send(promise_result);
		


	//@
	//@
	//@ catch error all		
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"Lỗi không xác định. Vui lòng liên hệ bộ phận kỹ thuật hoặc  thao tác lại" 
		);
		return res.send({ 
			"error" : "1000", 
			"position":"api->controllers->admin->products->ajax-list-table",
			"message": error_send 
		}); 
					
	}
	
	
	
	//@
	//@
	//@ send error when not return data
	return res.send({ 
		"error" : "2000", 
		"position":"api->controllers->admin->products->ajax-list-table",
		"message": "Lỗi không có data return, Lỗi này khi không có dữ liệu return, Vui lòng liên hệ bộ phận kỹ thuật, hoặc thao tác lại" 
	}); 
		
	
};





//@
//@
//@
//@
//@ export
module.exports = function_export;







//@
//@
//@
//@
//@ file end
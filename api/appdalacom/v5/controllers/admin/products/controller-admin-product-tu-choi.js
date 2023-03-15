const express = require('express');
const router = express.Router();


const ojs_configs = require('../../../../../../configs/config');
const config_database = require('../../../../../configs/config-database');
const config_api = require('../../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const tu_choi_product = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-tu-choi.js');
const product_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search.js');


const check_role = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_product = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-product');

const ojs_get_email_content_create_product = require('../../../../../../models/get-content-email-create-product.js');
const ojs_shares_send_email = require('../../../../../../models/ojs-shares-send-email');

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
			var datas = req.body.datas;
			var token = req.headers['token'];
			//@
			//@
			var product_id = 0;
			if(req.query.c1){
				product_id = req.query.c1;
			}else{
				res.send({ 
					"error" : "01", 
					"position" : "api->appdalacom->controllers->admin->products->tu-choi",
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
				"position" : "api->appdalacom->controllers->admin->products->tu-choi",
				"message": error_send 
			}); 
			return;	
		}	
		
		
		
		
		
		
		//@
		//@
		//@ check role;
		const check_role_result = await check_role.check_role(token,res);
		if(check_role_result == "admin"){
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
				"position" : "api->appdalacom->controllers->admin->products->tu-choi",
				"message": error_send 
			}); 
			return;			
		}
		
		
		
		
		
		

		//@
		//@
		//@ condition
		var condition_data = [];
		
		//@ store
		condition_data.push(
			{   
				"field"     :"products_speciality_ID",
				"value"     : product_id,
				"compare" : "="
			}
		)	
		//@ product taget
		try {
			let data_get =    
			{
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
					"stores_name",
					"products_speciality_status_update",
					"stores_ID",
					"users_email"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :condition_data				
					}         
				]		
			}
		
			//@ get datas
			var data_product = await product_search(data_get,res);
			//res.send(data_product);
			//return;
		}
		catch(error){
			var evn = ojs_configs.evn;
			evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					error, 
					"Lỗi check ownwr store, Vui lòng liên hệ admin" 
				);
			res.send({ 
				"error" : "154", 
				"position" : "api->appdalacom->controllers->admin->products->tu-choi",
				"message": error_send 
			}); 
			return;	
		}	


		
		try{		
			//@  tu choi _product_resuilt
			var phe_duyet_product_resuilt = await tu_choi_product(datas,product_id,res);			
			var email_title = 'DALA - Sản Phẩm [ ' + product_id + ' ] Bị từ chối';	
			var email_to4 = data_product[0].users_email;
			var email_content4 = 'DALA - Sản Phẩm [ ' + product_id + ' ] bị từ chối';
			
			
						
			
			if(process.env.evn == "tester"){
				email_to4 = "htms.group.vn@gmail.com";
				ojs_shares_send_email.send_email_to_admin(res,email_to4,email_title,email_content4);	
			}else{
				ojs_shares_send_email.send_email_to_admin(res,email_to4,email_title,email_content4);
			}			
			
			
			res.send({"error":"","datas":phe_duyet_product_resuilt});
			return;	
		
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					error, 
					"Lỗi check ownwr store, Vui lòng liên hệ admin" 
				);
			res.send({ 
				"error" : "155", 
				"position" : "api->appdalacom->controllers->admin->products->tu-choi",
				"message": error_send 
			}); 
			return;	
		}

	//@
	//@
	//@ catch error all		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"Lỗi không xác định. Vui lòng liên hệ bộ phận kỹ thuật hoặc  thao tác lại" 
		);
		res.send({ 
			"error" : "1000", 
			"position":"api->appdalacom->controllers->admin->products->tu-choi",
			"message": error_send 
		}); 
		return;			
	}
	
	
	
	//@
	//@
	//@ send error when not return data
	res.send({ 
		"error" : "2000", 
		"position":"api->appdalacom->controllers->admin->products->tu-choi",
		"message": "Lỗi không có data return, Lỗi này khi không có dữ liệu return, Vui lòng liên hệ bộ phận kỹ thuật, hoặc thao tác lại" 
	}); 
	return;	
	
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
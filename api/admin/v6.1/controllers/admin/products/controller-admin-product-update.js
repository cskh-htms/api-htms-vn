//@
//@
//@
//@
//@ file start




//@
//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();





const config_api = require('../../../configs/config');




//@
//@
//@
//@
//@ share
const ojs_shares_show_errors = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');





//@
//@
//@
//@
//@ model
const product_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search.js');

const check_role = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_product = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-product');

const ojs_shares_send_email = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-send-email.js');

const product_update = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-update');






//@
//@
//@
//@
//@ function export
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
			var cat_string = req.body.cat_string;
			var option_string = req.body.option_string;
			var token = req.headers['token'];
			
			//@
			//@
			var product_id = 0;
			if(req.query.c1){
				product_id = req.query.c1;
			}else{
				return res.send({ 
					"error" : "01", 
					"position" : "api->appdalacom->controller->admin->products->update",
					"message": "vui lòng nhập id"
				}); 	
				
			}				
		}
		catch(error){
			var evn = config_api.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					error, 
					"Lỗi get data request, Vui lòng liên hệ admin" 
				);
			return res.send({ 
				"error" : "1", 
				"position" : "api->appdalacom->controller->admin->products->update",
				"message": error_send 
			}); 
				
		}			
		//return res.send([product_id,datas,cat_string,option_string]);
		//
		
		
		
		
		
		
		//@
		//@
		//@ check phan quyen
		const check_role_result = await check_role.check_role(token,res);
		if(
			check_role_result == "admin" 
		){
			//go
		}
		else{
			var evn = config_api.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					check_role_result, 
					"Lỗi phân quyền, Vui lòng liên hệ admin" 
				);
			return res.send({ 
				"error" : "3",
				"position" : "api->appdalacom->controller->admin->products->update", 
				"message": error_send 
			}); 
						
		}
		///return res.send([check_role_result]);
		//
		
		
		
		
		
		//@
		//@
		//@
		//@
		//@ product taget
		var condition_data = [];
		
		//@ store
		condition_data.push(
			{   
				"field"     :"products_speciality_ID",
				"value"     : product_id,
				"compare" : "="
			}
		)		
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
				"users_email",
				"stores_email"
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
		Object.assign(datas,  { 'products_speciality_status_update' : 1 } );
		//return res.send([data_product]);
		//		
		
		
		
				
		
		
		
		
		
		

		
		
		//@
		//@	
		//@ run database
		var result = await product_update(datas,product_id,cat_string, option_string,res);
		
		if(process.env.evn == "tester"){
			if(datas.products_speciality_status_admin == 4){
				var email_title = 'DALA - có sảm phẩm mới chờ duyệt Sản Phẩm [ ' + product_id + ' ] ';
				var email_content4 = 'DALA - Sản Phẩm [ ' + product_id + ' ] vừa tạo chờ duyệt';
				ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_04,email_title,email_content4);	
			}else if(datas.products_speciality_status_admin == 2){
				var email_title = 'DALA - Sản Phẩm [ ' + product_id + ' ] vừa sữa nội dung chờ duyệt';
				var email_content4 = 'DALA - Sản Phẩm [ ' + product_id + ' ] vừa sữa nội dung chờ duyệt';
				ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_04,email_title,email_content4);	
			}else if(datas.products_speciality_status_admin == 3){
				var email_title = 'DALA - Sản Phẩm [ ' + product_id + ' ] vừa bị từ chối';
				var email_content4 = 'DALA - Sản Phẩm [ ' + product_id + ' ] vừa bị từ chối';
				ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_04,email_title,email_content4);	
			}		
		}else{
			if(datas.products_speciality_status_admin == 4){
				var email_title = 'DALA - có sảm phẩm mới chờ duyệt Sản Phẩm [ ' + product_id + ' ] ';
				var email_content4 = 'DALA - Sản Phẩm [ ' + product_id + ' ] vừa tạo chờ duyệt';
				ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_01,email_title,email_content4);	
				ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_02,email_title,email_content4);	
				
			}else if(datas.products_speciality_status_admin == 2){
				var email_title = 'DALA - Sản Phẩm [ ' + product_id + ' ] vừa sữa nội dung chờ duyệt';
				var email_content4 = 'DALA - Sản Phẩm [ ' + product_id + ' ] vừa sữa nội dung chờ duyệt';
				ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_01,email_title,email_content4);	
				ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_02,email_title,email_content4);	
				
			}else if(datas.products_speciality_status_admin == 3){
				var email_title = 'DALA - Sản Phẩm [ ' + product_id + ' ] vừa bị từ chối';
				var email_content4 = 'DALA - Sản Phẩm [ ' + product_id + ' ] vừa bị từ chối';
				ojs_shares_send_email.send_email_to_admin(res,data_product[0].stores_email,email_title,email_content4);	
				ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_01,email_title,email_content4);	
				ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_02,email_title,email_content4);					
			}	
		}				

				
	
		//@
		//@	
		//@ send data result	
		return res.send({"error":"", "datas": result });
			
		
		
		
	//@
	//@
	//@ catch all error	
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi không xác định. Vui lòng liên hệ bộ phận kỹ thuật hoặc  thao tác lại" 
			);
		return res.send({ 
			"error" : "1000", 
			"position" : "api->appdalacom->controller->admin->products->update",
			"message": error_send 
		}); 
			
	}	
	
	
	
	//@
	//@
	//@ send error when not return data
	return res.send({ 
		"error" : "2000", 
		"position":"api->appdalacom->controller->admin->products->update",
		"message": "Lỗi không có data return, Lỗi này khi không có dữ liệu return, Vui lòng liên hệ bộ phận kỹ thuật, hoặc thao tác lại" 
	}); 
			
}






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






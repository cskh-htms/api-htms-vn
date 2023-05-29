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






const config_api = require('../../configs/config');





//@
//@
//@
//@
//@ model
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');
const check_owner_product_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-product-store');
const product_update = require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-update');


const ojs_shares_send_email = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-send-email.js');
//@
//@
//@
//@
//@ function export
async  function function_export(req, res, next) {
	//return res.send(['dfsdfsdf']);
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
			var cat_string  = req.body.cat_string;
			var option_string  = req.body.option_string;
			
			//datas,product_id,cat_string, option_string
			
			
			//@
			//@
			var product_id = 0;
			if(req.query.c1){
				product_id = req.query.c1;
			}else{
				return res.send({ 
					"error" : "01", 
					"position" : "api->appdalacom->controller->products->update",
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
				"position" : "api->appdalacom->controller->products->update",
				"message": error_send 
			}); 
				
		}			
		//return res.send([datas,product_id,cat_string, option_string]);
		//
		
		
		
		
		
		
		
		
		//@
		//@
		//@ 
		//@ get owner
		const check_role_result = await check_role.check_role(token,res);
		
		
		
		
		
		
		
		//@
		//@
		//@ 
		//@ check owner store		
		if(check_role_result == "bussiness"){			
			const check_owner_store_resuilt = await check_owner_store(token,datas.products_speciality_store_id,res);
			if(	check_owner_store_resuilt == "1" ){
				//go
			}
			else{
				var evn = config_api.evn;
				////evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( 
						evn, 
						check_role_result, 
						"Lỗi phân quyền (Bạn không phải chủ cửa hàng), Vui lòng liên hệ admin" 
					);
				return res.send({ 
					"error" : "333",
					"position" : "api->appdalacom->controller->products->update",
					"message": error_send 
				}); 
							
			}				
		}
		//return res.send([check_role_result,"store_ok"]);
		//







		//@
		//@
		//@ 
		//@ check owner order store
		if(check_role_result == "bussiness"){			
			const check_owner_product_store_resuilt = await check_owner_product_store(product_id,datas.products_speciality_store_id,res);
			if(	check_owner_product_store_resuilt == "1" ){
				//go
			}
			else{
				var evn = config_api.evn;
				////evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( 
						evn, 
						check_role_result, 
						"Lỗi phân quyền (Bạn không pahi3 chủ sản phẩm này) , Vui lòng liên hệ admin" 
					);
				return res.send({ 
					"error" : "333",
					"position" : "api->appdalacom->controller->products->update",
					"message": error_send 
				}); 
							
			}				
		}
		//return res.send([check_role_result,"product ok"]);
		//

		
		
		
		
		
		//@
		//@	
		//@ run database
		var result = await product_update(datas,product_id,cat_string, option_string,res);
		
		
		if(config_api.domain == "http://localhost:2021"){
			if(datas.products_speciality_status_admin == 4){
				var email_title = 'DALA - có sảm phẩm mới chờ duyệt Sản Phẩm [ ' + product_id + ' ] ';
				var email_content4 = 'DALA - Sản Phẩm [ ' + product_id + ' ] vừa tạo chờ duyệt';
				ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_04,email_title,email_content4);	
			}else if(datas.products_speciality_status_admin == 2){
				var email_title = 'DALA - Sản Phẩm [ ' + product_id + ' ] vừa sữa nội dung chờ duyệt';
				var email_content4 = 'DALA - Sản Phẩm [ ' + product_id + ' ] vừa sữa nội dung chờ duyệt';
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
			"position" : "api->appdalacom->controller->products->update",
			"message": error_send 
		}); 
			
	}	
	
	
	
	//@
	//@
	//@ send error when not return data
	return res.send({ 
		"error" : "2000", 
		"position":"api->appdalacom->controller->products->update",
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






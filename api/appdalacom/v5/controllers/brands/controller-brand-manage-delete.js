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




//@
//@
//@
//@
//@ configs
const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');






//@
//@
//@
//@
//@ share
const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');







//@
//@
//@
//@
//@ model
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');
const check_owner_brand = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-brand');


const brand_delete = require('../../../../lib/' + config_api.API_LIB_VERSION + '/brands/brand-delete');






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
			var token = req.headers['token'];			
			//@
			//@
			var brand_id = 0;
			if(req.query.c1){
				brand_id = req.query.c1;
			}else{
				res.send({ 
					"error" : "01", 
					"position" : "api->appdalacom->controller->brands->manage->delete",
					"message": "vui lòng nhập id"
				}); 	
				return;
			}	

			//@
			//@
			var store_id = 0;
			if(req.query.c2){
				store_id = req.query.c2;
			}else{
				res.send({ 
					"error" : "02", 
					"position" : "api->appdalacom->controller->brands->manage->delete",
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
				"position" : "api->appdalacom->controller->brands->manage->delete",
				"message": error_send 
			}); 
			return;	
		}			
		//res.send([brand_id,store_id]);
		//return;
		
		
		
		
		
		
		//@
		//@
		//@
		//@
		//@ check role phân quyền
		const check_role_result = await check_role.check_role(token,res);		
		
		
		
		//@
		//@
		//@ 
		//@ check owner store		
		if(check_role_result == "bussiness"){			
			const check_owner_store_resuilt = await check_owner_store(token,store_id,res);
			if(	check_owner_store_resuilt == "1" ){
				//go
			}
			else{
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( 
						evn, 
						check_role_result, 
						"Lỗi phân quyền (Bạn không phải chủ cửa hàng), Vui lòng liên hệ admin" 
					);
				res.send({ 
					"error" : "333",
					"position" : "api->appdalacom->controller->brands->manage->delete",
					"message": error_send 
				}); 
				return;			
			}				
		}
		//res.send([check_role_result,"store_ok"]);
		//return;
		
		
		
		
		
		
		//@
		//@
		//@ 
		//@ check owner category		
		if(check_role_result == "bussiness"){			
			const check_owner_brand_resuilt = await check_owner_brand(token,brand_id,res);
			if(	check_owner_brand_resuilt == "1" ){
				//go
			}
			else{
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( 
						evn, 
						check_role_result, 
						"Lỗi phân quyền (Bạn không phải chủ danh mục), Vui lòng liên hệ admin" 
					);
				res.send({ 
					"error" : "345",
					"position" : "api->appdalacom->controller->brands->manage->delete",
					"message": error_send 
				}); 
				return;			
			}				
		}
		//res.send([check_role_result,"brand_ok"]);
		//return;		
		
		
		

		
		
		//@
		//@	
		//@ run database
		var result = await brand_delete(brand_id,res);
		
		
			
		
		
		
		
		//@
		//@	
		//@ send data result	
		res.send({"error":"", "datas": result });
		return;	
		
		
		
	//@
	//@
	//@ catch all error	
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
			"position" : "api->appdalacom->controller->brands->manage->delete",
			"message": error_send 
		}); 
		return;	
	}	
	
	
	
	//@
	//@
	//@ send error when not return data
	res.send({ 
		"error" : "2000", 
		"position":"api->appdalacom->controller->brands->manage->delete",
		"message": "Lỗi không có data return, Lỗi này khi không có dữ liệu return, Vui lòng liên hệ bộ phận kỹ thuật, hoặc thao tác lại" 
	}); 
	return;		
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





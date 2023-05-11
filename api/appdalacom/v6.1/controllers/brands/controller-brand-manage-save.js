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
const brand_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/brands/brand-insert');






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
			var datas  = req.body.datas;
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
				"position" : "api->appdalacom->controller->brands->manage->save",
				"message": error_send 
			}); 
				
		}			
		//return res.send(["dfsdfsdfsdfsdf"]);
		//
		
		
		
		
		
		
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
			const check_owner_store_resuilt = await check_owner_store(token,datas.brands_stores_id,res);
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
					"position" : "api->appdalacom->controller->category->manage->show-all",
					"message": error_send 
				}); 
							
			}				
		}
		//return res.send([check_role_result,"store_ok"]);
		//
		
		

		
		
		//@
		//@	
		//@ run database
		var result = await brand_insert(datas,res);
		
		
			
		
		
		
		
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
			"position" : "api->appdalacom->controller->brands->manage->save",
			"message": error_send 
		}); 
			
	}	
	
	
	
	//@
	//@
	//@ send error when not return data
	return res.send({ 
		"error" : "2000", 
		"position":"api->appdalacom->controller->brands->manage->save",
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






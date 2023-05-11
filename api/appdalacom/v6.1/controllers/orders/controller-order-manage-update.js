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
const check_owner_order_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-order-store');


const orders_update = require('../../../../lib/' + config_api.API_LIB_VERSION + '/orders/orders-update');




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
			
			//@
			//@
			var order_id = 0;
			if(req.query.c1){
				order_id = req.query.c1;
			}else{
				return res.send({ 
					"error" : "01", 
					"position" : "api->appdalacom->controller->orders->update",
					"message": "vui lòng nhập id"
				}); 	
				
			}		
			//@
			//@
			var store_id = 0;
			if(req.query.c2){
				store_id = req.query.c2;
			}else{
				return res.send({ 
					"error" : "01", 
					"position" : "api->appdalacom->controller->orders->update",
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
				"position" : "api->appdalacom->controller->orders->update",
				"message": error_send 
			}); 
				
		}			
		//return res.send([order_id,store_id,datas]);
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
			const check_owner_store_resuilt = await check_owner_store(token,store_id,res);
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
					"position" : "api->appdalacom->controller->orders->update",
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
			const check_owner_order_store_resuilt = await check_owner_order_store(token,order_id,res);
			if(	check_owner_order_store_resuilt == "1" ){
				//go
			}
			else{
				var evn = config_api.evn;
				////evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( 
						evn, 
						check_role_result, 
						"Lỗi phân quyền (Đơn hàng không phải của bạn) , Vui lòng liên hệ admin" 
					);
				return res.send({ 
					"error" : "333",
					"position" : "api->appdalacom->controller->orders->update",
					"message": error_send 
				}); 
							
			}				
		}
		//return res.send([check_role_result,"order ok"]);
		//

		
		
		
		
		
		//@
		//@	
		//@ run database
		var result = await orders_update(datas,order_id,res);
		
		
			
		
		
		
		
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
			"position" : "api->appdalacom->controller->orders->update",
			"message": error_send 
		}); 
			
	}	
	
	
	
	//@
	//@
	//@ send error when not return data
	return res.send({ 
		"error" : "2000", 
		"position":"api->appdalacom->controller->orders->update",
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






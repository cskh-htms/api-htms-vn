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
const check_role = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const new_update = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/news/news-update');






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
			var news_id = 0;
			if(req.query.c1){
				news_id = req.query.c1;
			}else{
				res.send({ 
					"error" : "01", 
					"position" : "api->controller->admin->news->update",
					"message": "vui lòng nhập id"
				}); 	
				return;
			}				
		}
		catch(error){
			var evn = config_api.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					error, 
					"Lỗi get data request, Vui lòng liên hệ admin" 
				);
			res.send({ 
				"error" : "1", 
				"position" : "api->controller->admin->news->update",
				"message": error_send 
			}); 
			return;	
		}			
		//res.send([news_id,datas]);
		//return;
		
		
		
		
		
		
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
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					check_role_result, 
					"Lỗi phân quyền, Vui lòng liên hệ admin" 
				);
			res.send({ 
				"error" : "3",
				"position" : "api->controller->admin->news->update", 
				"message": error_send 
			}); 
			return;			
		}
		///res.send([check_role_result]);
		//return;
		
		
		
		
		

		
		
		//@
		//@	
		//@ run database
		var result = await new_update(datas,news_id,res);
		
		
			
		
		
		
		
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
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi không xác định. Vui lòng liên hệ bộ phận kỹ thuật hoặc  thao tác lại" 
			);
		res.send({ 
			"error" : "1000", 
			"position" : "api->controller->admin->news->update",
			"message": error_send 
		}); 
		return;	
	}	
	
	
	
	//@
	//@
	//@ send error when not return data
	res.send({ 
		"error" : "2000", 
		"position":"api->controller->admin->news->update",
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






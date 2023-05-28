//@
//@
//@
//@
//@ file start


const express = require('express');
const router = express.Router();




const config_api = require('../../../configs/config');




const ojs_shares_show_errors = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-fetch-data.js');


const check_role = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');

const get_data_news_admin = require('../../../shares/get-data-news-admin-appdalacom-api.js');





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
		//@
		//@ lấy req data
		try {
			var token = req.headers['token'];
			//@
			//@
			var store_id = 0;
			if(req.query.c1){
				store_id = req.query.c1;
			}else{
				return res.send({ 
					"error" : "101", 
					"position" : "api/appdalacom/controller/admin/discounts/add",
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
				"position" : "api/appdalacom/controller/admin/discounts/add",
				"message": error_send 
			}); 
				
		}	
		

		//return res.send([store_id]);
		//		
	
	
	
		
		//@
		//@
		//@	
		//@ check role phân quyền
		const check_role_result = await check_role.check_role(token,res);
		if(check_role_result == "admin" ){
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
				"position" : "api/appdalacom/controller/admin/discounts/add",
				"message": error_send 
			}); 
						
		}

		//return res.send(["role-ok"]);
		//
	
		
	
	
		//@
		//@
		//@
		//@ promise
		try{	
			var promise_all = [];
			promise_all.push(0);

			//@ 1. lấy news admin
			var fn_get_data_news_admin = new Promise((resolve, reject) => {
				let result = get_data_news_admin(res);
				resolve(result);
			});	
			promise_all.push(fn_get_data_news_admin);


			
			



			//@
			//@
			//@
			//@ promise go 
			var promise_result = await Promise.all(promise_all);
		}
		catch(error){
			var evn = config_api.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					error, 
					"Lỗi get data review, Vui lòng liên hệ admin" 
				);
			return res.send({ 
				"error" : "100", 
				"position" : "api/appdalacom/controller/admin/discounts/add",
				"message": error_send 
			}); 
				
		}	

	
	

	
	
		let notes = {
			"0":"no", 
			"1":"news admin",
			"5":"notes"
		}
		//promise_result.push(data_product);	
		//promise_result.push(category_resuilt);	
		
		
		promise_result.push(notes);

		return res.send(promise_result);
		
		
		
		
	//@
	//@
	//@ catch error all		
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
			"position":"api/appdalacom/controller/admin/discounts/add",
			"message": error_send 
		}); 
					
	}
	
	
	
	//@
	//@
	//@ send error when not return data
	return res.send({ 
		"error" : "2000", 
		"position":"api/appdalacom/controller/admin/discounts/add",
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












//@
//@
//@
//@
//@ file end








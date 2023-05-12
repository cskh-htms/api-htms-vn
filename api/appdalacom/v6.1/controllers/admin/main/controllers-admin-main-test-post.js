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
const ojs_shares_date = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-date.js');


const user_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-search');



//@
//@
//@
//@
//@ function export
async  function function_export(req, res, next) {

	//@ lấy req data
	try {
		var token = req.headers['token'];
		var datas = req.body.datas;
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
			"position" : "api/appdalacom/controller/admin/stores/controllers-admin-test-post",
			"message": error_send 
		}); 
			
	}	
	
	


	
	//@
	//@
	//@
	//@ promise
	try{	
		var promise_all = [];
		promise_all.push(0);


		//@
		//@ tong cửa hàng mới
		var data_get =    
		{
		   "select_field" :
			[
				"users_full_name"					
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"users_ID",
						"value"     : [115,116,118],
						"compare" : "in"
					},
					{   
						"field"     :"users_full_name",
						"value"     : 'xuan',
						"compare" : "="
					}					
					]    
				}         
			]   
		}
		
		
		
		var fn_get_user_all = new Promise((resolve, reject) => {
			let result = user_search(data_get,res);
			resolve(result);
		});	
		promise_all.push(fn_get_user_all);












		//@
		//@
		//@
		//@ promise go 
		var promise_result = await Promise.all(promise_all);
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data review, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "100", 
			"position" : "api/appdalacom/controller/admin/stores/controllers-admin-test-post",
			"message": error_send 
		}); 
			
	}	

	
	

	
	
	let notes = {
		"0":"no", 
	}
	//promise_result.push(data_product);	
	//promise_result.push(category_resuilt);	
	

	promise_result.push(notes);

	return res.send(promise_result);
	
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








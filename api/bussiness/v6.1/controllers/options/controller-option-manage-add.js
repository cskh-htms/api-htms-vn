//@
//@
//@
//@
//@ file start




//@
//@
//@
//@
//@ reqiure
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
const ojs_shares_fetch_data = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-fetch-data.js');




//@
//@
//@
//@
//@ model database
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_store = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-store');

const get_data_news_bussiness = require('../../shares/get-data-news-bussiness-appdalacom-api.js');
const get_data_count_bussiness = require('../../shares/get-data-count-bussiness-appdalacom-api.js');



const option_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/options/option-search');
const store_get_one = require('../../../../lib/' + config_api.API_LIB_VERSION + '/stores/store-get-one');





//@
//@
//@
//@
//@ function export
async  function function_export(req, res, next) {
	//@
	//@
	//@ error all
	try{

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
					"error" : "01", 
					"position" : "api->appdalacom->controller->option->manage->add",
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
				"position" : "api->appdalacom->controller->option->manage->add",
				"message": error_send 
			}); 
				
		}	
		//return res.send([store_id]);
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
					"position" : "api->appdalacom->controller->option->manage->add",
					"message": error_send 
				}); 
							
			}				
		}
		//return res.send([check_role_result,"store_ok"]);
		//
	
		
			

		
		//@
		//@
		//@
		//@ promise
		try{	
			var promise_all = [];
			promise_all.push(0);

			//@ 1. lấy news bussiness
			var fn_get_data_news_bussiness = new Promise((resolve, reject) => {
				let result = get_data_news_bussiness(store_id,res);
				resolve(result);
			});	
			promise_all.push(fn_get_data_news_bussiness);


			//@ 2. lấy count datas
			var fn_get_data_count_bussiness = new Promise((resolve, reject) => {
				let result = get_data_count_bussiness(store_id,res);
				resolve(result);
			});	
			promise_all.push(fn_get_data_count_bussiness);



			//@ 2. lấy count datas
			var fn_get_store_taget = new Promise((resolve, reject) => {
				let result = store_get_one(store_id,res);
				resolve(result);
			});	
			promise_all.push(fn_get_store_taget);




			//@
			//@			
			//@
			//@
			//@lấy option_list
			var data_option_list =    
			{
			   "select_field" :
				[
					"options_product_speciality_ID",
					"options_product_speciality_name",
					"options_product_speciality_parent_id",
					"options_product_speciality_status_admin"		
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{
							"field"     :"options_product_speciality_status_admin",
							"value"     : 1,
							"compare" : "="						
						}					
						]    
					}         
				],
				"group_by":
				[
					"options_product_speciality_ID"
				]
			}
			
			var fn_get_option_list = new Promise((resolve, reject) => {
				let result = option_search(data_option_list,res);
				resolve(result);
			});	
			promise_all.push(fn_get_option_list);	






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
				"position" : "api->appdalacom->controller->option->manage->add",
				"message": error_send 
			}); 
				
		}	

		
		

		//@
		//@
		//@ add notes
		let notes = {
			"0":"no", 
			"1":"news admin",
			"2":"notes"
		}
		//promise_result.push(data_product);	
		//promise_result.push(category_resuilt);
		promise_result.push(notes);
		
		
		
		
		
		
		//@
		//@
		//@ send data result
		return res.send(promise_result);
		
		
		
		
		
		
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
			"position" : "api->appdalacom->controller->option->manage->add",
			"message": error_send 
		}); 
			
	}	
	
	
	
	//@
	//@
	//@ send error when not return data
	return res.send({ 
		"error" : "2000", 
		"position":"api->appdalacom->controller->option->manage->add",
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







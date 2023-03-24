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

const multer = require('multer');
const WPAPI = require( 'wpapi' );


//@
//@
//@
//@
//@ configs
const ojs_configs = require('../../../../../../configs/config');
const config_database = require('../../../../../configs/config-database');
const config_api = require('../../../../../configs/config-api');




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
const upload_insert = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/uploads_infomation/upload-infomation-insert.js');
const check_owner_image = require('../../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-image');

const upload_get_one = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/uploads_infomation/upload-infomation-get-one.js');

const upload_search = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/uploads_infomation/upload-infomation-search.js');
const upload_delete = require('../../../../../lib/' + config_api.API_LIB_VERSION + '/uploads_infomation/upload-infomation-delete.js');

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
			var datas  = req.body;
		}
		catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					error, 
					"Lỗi get data request, Vui lòng liên hệ admin" 
				);
			return res.send({ 
				"error" : "1", 
				"position" : "api->appdalacom->controller->admin->uploads->save",
				"message": error_send 
			}); 
				
		}			
		//return res.send([datas]);
		//
		
		
		
		
		
		
		//@
		//@
		//@ check phan quyen
		const check_role_result = await check_role.check_role(token,res);
		if(
			check_role_result == "admin" 
			|| check_role_result == "customer" 
			|| check_role_result == "bussiness" 
			|| check_role_result == "default" 
		){
			//go
		}
		else{
			var evn = ojs_configs.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					check_role_result, 
					"Lỗi phân quyền, Vui lòng liên hệ admin" 
				);
			return res.send({ 
				"error" : "3",
				"position" : "api->appdalacom->controller->admin->uploads->delete", 
				"message": error_send 
			}); 
						
		}
		//return res.send(["ok"]);
		//
		
		
		
		
		
		
		
		//@ 
		//@ 
		//@ 
		//@ 		
		//@ get upload_taget
		let upload_taget_data =    
		{
		   "select_field" :
			[
				"uploads_infomation_ID",
				"uploads_infomation_user_id",
				"uploads_infomation_url",
				"uploads_infomation_image_id"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"uploads_infomation_url",
						"value"     : datas.url,
						"compare" : "like"
					}           
					]    
				}         
			]   
			
		}
		
		//@
		//@
		var upload_taget_result = await upload_search(upload_taget_data,res);
		//return res.send([upload_taget_result]);
		//		
	
		
			
		
		
		

		//@
		//@
		//@ 
		//@ check owner image		
		if(check_role_result == "bussiness"){			
			const check_owner_image_resuilt = await check_owner_image(token,upload_taget_result[0].uploads_infomation_image_id,res);
			if(	check_owner_image_resuilt == "1" ){
				//go
			}
			else{
				var evn = ojs_configs.evn;
				////evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( 
						evn, 
						check_role_result, 
						"Lỗi phân quyền (Bạn không phải chủ danh mục), Vui lòng liên hệ admin" 
					);
				return res.send({ 
					"error" : "345",
					"position" : "api->appdalacom->controller->admin->uploads->delete",
					"message": error_send 
				}); 
							
			}				
		}
		//return res.send([check_role_result,"image_ok_ok"]);
		//			

		
		
		
		//@
		//@
		//@ 
		//@ delete image in wp			
		try{		
			var wp = new WPAPI({
				endpoint: 'https://appdala.net/wp-json',
				username: 'appdala',
				password: 'root@2021!@#$%^'
			});
			
			wp.media()
				.id(upload_taget_result[0].uploads_infomation_image_id)
				.param('force',true)
				.delete()
				.then( function(response) {
					return res.send( {"error":"","datas":response} );
					return ;
				});	
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi delete image wordpress" 
			);
			return res.send({ 
				"error" : "346",
				"position" : "api->appdalacom->controller->admin->uploads->delete",
				"message": error_send 			
			}); 
							
		}
		//return res.send(["delete_ok_ok"]);
		//
		
		
		
		
		//@
		//@	
		//@ run database
		var result = await upload_delete(upload_taget_result[0].uploads_infomation_ID,res);
		
		
			
		
		
		
		
		//@
		//@	
		//@ send data result	
		return res.send({"error":"", "datas": result });
			
		
		
		
	//@
	//@
	//@ catch all error	
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi không xác định. Vui lòng liên hệ bộ phận kỹ thuật hoặc  thao tác lại" 
			);
		return res.send({ 
			"error" : "1000", 
			"position" : "api->appdalacom->controller->admin->uploads->save",
			"message": error_send 
		}); 
			
	}	
	
	
	
	//@
	//@
	//@ send error when not return data
	return res.send({ 
		"error" : "2000", 
		"position":"api->appdalacom->controller->admin->uploads->save",
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






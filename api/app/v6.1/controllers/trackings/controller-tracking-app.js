const express = require('express');
const router = express.Router();
const config_api = require('../../configs/config');
const jwt = require('jsonwebtoken');


const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ip_tracking_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/ip-tracking/ip-tracking-insert.js');
const ip_block_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/ip-block/ip-block-search.js');
const ip_black_list_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/ip-black-list/ip-black-list-search.js');


//@
async  function controllers_store_app(req, res, next) {
	
	//return res.send(['asdasdasd']);
	
	try {
		var token = req.headers['token'];
		var datas = req.body;
		
		var ip = "";
		if(datas.ip){
			ip = datas.ip;
		}
		
		var link = "";
		if(datas.link){
			link = datas.link;
		}		
		
		if(ip == "" || link == ""){
			return res.send({ 
				"error" : "1", 
				"position" : "api/app/v5/ctroller/tracking/controllers-tracking-app",
				"message": "Vui lòng nhập data ip và link" 
			}); 			
		}
		
		
		var newPayload = jwt.decode(token);
		//return res.send([newPayload]);
		user_id = 0;
		if(newPayload != null){
			user_id = newPayload.users_ID;
		}
		//return res.send([user_id]);	

		
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "2", 
			"position" : "api/app/v5/ctroller/tracking/controllers-tracking-app",
			"message": error_send 
		}); 			
	}
	//return res.send([info]);
	
	




	//@
	//@
	//@	
	//@ check ip black list
	try {
		//@ get datas
		//@ 3. get model
		let data_ip_black_list =    
		{
		   "select_field" :
			[
				"count(ip_black_list_ip)"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"ip_black_list_ip",
						"value"     : ip,
						"compare" : "="
					}
					]    
				}         
			]  
		}		
		var ip_black_list_search_result = await ip_black_list_search(data_ip_black_list,res);
		//return res.send(ip_block_search_result);
		
		
		
		if(ip_black_list_search_result.error){
			return res.send({ 
				"error" : "33", 
				"position" : "api/app/v5/ctroller/tracking/controllers-tracking-app",
				"message": ip_black_list_search_result.message
			}); 			
		}
		if(ip_black_list_search_result.length > 0){
			if(ip_black_list_search_result[0].count_ip_black_list_ip > 5){
				return res.send({ 
					"error" : "44", 
					"position" : "api/app/v5/ctroller/tracking/controllers-tracking-app",
					"message": "ip đã bị block vì nằm trong danh sách black list, vui lòng liên hệ admin dala"
				});
			} 			
		}else{
			return res.send({ 
				"error" : "55", 
				"position" : "api/app/v5/ctroller/tracking/controllers-tracking-app",
				"message": "Lỗi check ip black list, vui lòng liên hệ admin dala"
			}); 			
		}
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data store, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "5", 
			"position" : "api/app/v5/ctroller/tracking/controllers-tracking-app",
			"message": error_send 
		}); 
			
	}	


	
	
	//@
	//@
	//@	
	//@ check ip block
	try {
		//@ get datas
		//@ 3. get model
		let data_ip_block =    
		{
		   "select_field" :
			[
				"ip_block_ip"				
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
					{   
						"field"     :"ip_block_ip",
						"value"     : ip,
						"compare" : "="
					}
					]    
				}         
			]  
		}		
		var ip_block_search_result = await ip_block_search(data_ip_block,res);
		//return res.send(ip_block_search_result);
		
		
		
		if(ip_block_search_result.error){
			return res.send({ 
				"error" : "3", 
				"position" : "api/app/v5/ctroller/trackings/controllers-tracking-app",
				"message": ip_block_search_result.message
			}); 			
		}
		if(ip_block_search_result.length > 0){
			return res.send({ 
				"error" : "4", 
				"position" : "api/app/v5/ctroller/trackings/controllers-tracking-app",
				"message": "ip đã bị block, vui lòng liên hệ admin dala"
			}); 			
		}
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data store, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "5", 
			"position" : "api/app/v5/ctroller/tracking/controllers-tracking-app",
			"message": error_send 
		}); 
			
	}			
	
	
	
	
	
	//@
	//@
	//@	
	//@ update traffic app
	try {
		//@ get datas		
		var data_tracking_insert = {
			"ip_tracking_ip": ip,
			"ip_tracking_user_id" : user_id
		}
		var ip_tracking_insert_result = ip_tracking_insert(data_tracking_insert,res);
		

	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data store, Vui lòng liên hệ admin" 
			);
		return res.send ({ 
			"error" : "3", 
			"position" : "api/app/v5/ctroller/tracking/controllers-tracking-app",
			"message": error_send 
		}); 
			
	}				

	return res.send({"error":"","datas":"ok"}); 
		
}

module.exports = controllers_store_app;
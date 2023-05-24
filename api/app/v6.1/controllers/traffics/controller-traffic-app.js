const express = require('express');
const router = express.Router();
const config_api = require('../../configs/config');
const jwt = require('jsonwebtoken');


const ojs_shares_show_errors = 
	require('../../../../shares/' + 
	config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
	
const traffic_live_insert = 
	require('../../../../lib/' + 
	config_api.API_LIB_VERSION + '/traffic-live/traffic-live-insert.js');

const traffic_update_app = 
	require('../../../../lib/' + 
	config_api.API_LIB_VERSION + '/traffic/traffic-update-app.js');


//@
async  function controllers_store_app(req, res, next) {
	
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
				"position" : "api/app/v5/ctroller/traffic/controllers-traffic-app",
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
			"position" : "api/app/v5/ctroller/traffic/controllers-traffic-app",
			"message": error_send 
		}); 			
	}
	//return res.send([info]);
	
	
	//@
	//@
	//@	
	//@ check ip block
	try {
		//@ get datas
		//@ 3. get model
		let data_traffic_live =    
		{
			"traffic_live_ip" : ip,
			"traffic_live_user_id" : user_id,
			"traffic_live_url" : link,
			"traffic_live_service" : 0
		}		
		var traffic_live_insert_result =  await traffic_live_insert(data_traffic_live,res);
		var traffic_update_app_result =  await traffic_update_app(res);
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
			"position" : "api/app/v5/ctroller/traffic/controllers-traffic-app",
			"message": error_send 
		}); 
			
	}			
			

	return res.send({"error":"","datas": [traffic_live_insert_result,traffic_update_app_result]}); 
		
}

module.exports = controllers_store_app;
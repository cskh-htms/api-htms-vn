

/*

mục đích : check quyền user




*/










const models_token = require('../models/models-token');
const models_users = require('../models/models-users');
const ojs_configs = require('../../../configs/config');
//
//
//@@
//@@
const check_owner = async function(datas_check){
		//@
		//@
		//@	
		try{		
			var token = datas_check.token;
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get request data" );
			return { "error" : "ojs_shares_owner->check_owner->get_check_data->get-request->error_number : 1", "message": error_send } ; 
		
		}
		
		//@
		//@
		//neu không có token thì trỏ ra login page
		if(token == "" || token == null || token == undefined){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,"no-token", "no-token" );
			return { "error" : "ojs_shares_owner->check_owner->get_check_data->get-request->error_number : 2", "message": error_send } ; 			
		}

		//@
		//@
		//@
		//check role
		//xem role là gì
		try {
			var send_datas_check_role = { 
				"datas" : {
					"token" : token
				}
			}
			//@
			//@
			var check_role;
			check_role = await models_users.get_role(send_datas_check_role);
			if(check_role.error != ""){
				return { "error" : "ojs_shares_owner->check_owner->get_check_data->get-request->error_number : 3", "message": check_role };
			}
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
			return { "error" : "2.ojs_shares_owner->check_owner->get_check_data->check_role", "message": error_send };
		}		
		
		
		//@
		//@
		//@
		//so sánh user_ID của token và User_ID của reouter
		//nếu đúng trả về datas 1; nếu khong dứng trả về datas 0
		if(datas_check.user_id){
			try {
				var send_datas_check_owner_user = { 
					"datas" : {
						"token" 	: datas_check.token,
						"user_id"	: datas_check.user_id
					}
				}
				var check_owner_user;				
				check_owner_user = await models_users.get_owner_user(send_datas_check_owner_user);
				if(check_owner_user.error != "") { return {"error":"1.ojs_shares->get_check_data->check_owner_user","message":check_owner_user} }
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
				return { "error" : "10_router_admin_app->check_owner_user", "message": error_send };	
			}			
		}//end if datas_check.user_id		
		
		//@
		//@
		//get owner
		var owner_user = 0;
		if(typeof check_owner_user == 'object' && check_owner_user && check_owner_user.datas){
			owner_user = check_owner_user.datas;
		}
		
		//@
		//@
		//@
		let data_return = {
			"error":"",
			"user_role": check_role.message,
			"owner_user" : owner_user,
			"owner_store":0,
			"owner_cat":0,
			"owner_option":0,
			"owner_brand":0,
			"owner_product":0
	
		}
		return data_return;
		//@
		//@
		//@
}	


//
//@@@@@@@
//@@
//@@
//@@@@@@@@
//@@@@@@@@
//@@
//@@
module.exports = {
		check_owner
}
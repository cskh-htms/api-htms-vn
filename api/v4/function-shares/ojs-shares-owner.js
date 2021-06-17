

/*

mục đích : check quyền user

1. check_owner

	1.1. [check_role]
	1.2. [check_role]
	1.3. [owner_store] 
	1.3. [owner_cat] 

*/










const models_token = require('../models/models-token');
const models_users = require('../models/models-users');
const models_category_gemeral_speciality = require('../models/models-category-gemeral-speciality');
const models_option_speciality = require('../models/models-option-speciality');
const models_brands = require('../models/models-brands');







const ojs_configs = require('../../../configs/config');
const jwt = require('jsonwebtoken');
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
		//@ 1.1. [check_role]
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
			return { "error" : "ojs_shares_owner->check_owner->get_check_data->check_role->error_number: 1 ", "message": error_send };
		}		
		//@ 1.1. end of check_role
		
		
		
		
		//@
		//@
		//@
		//so sánh user_ID của token và User_ID của reouter
		//nếu đúng trả về datas 1; nếu khong dứng trả về datas 0
		//@ 1.2. [check_owner_user]
		owner_user = 0;
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
				if(check_owner_user.error != "") { return {"error":"ojs_shares_owner->check_owner_user->error_number : 1","message":check_owner_user} }
			
				if(check_owner_user.error) { return {"error":check_owner_user.error,"message":check_owner_user.error} }	
				if(check_owner_user.length > 0) { owner_user = 1 }			
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
				return { "error":"ojs_shares_owner->check_owner_user->error_number : 2", "message": error_send };	
			}			
		}
		//@ end of  1.2. [check_owner_user]
		
		
		//@
		//@
		//so sánh user_ID của token và có phải là chủ cữa hàng dtore_id không
		//nếu đúng trả về datas 1; nếu khong dứng trả về datas 0
		//@ 1.3. [owner_store] 
		var owner_store = 0;
		if(datas_check.store_id){
			
			var owner_store_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var store_id = datas_check.store_id;
				//return {"datas": [user_id,store_id]};
				//@
				//@
				//@@
				var send_datas_check_owner_store = { 
					"datas" : {
						"user_id" 	: user_id,
						"store_id"	: store_id
					}
				}				
				owner_store_get = await await models_category_gemeral_speciality.get_owner_store(send_datas_check_owner_store);	
				//return owner_store_get;
				//@
				//@
				if(owner_store_get.error) { return {"error":owner_store_get.error,"message":owner_store_get.error} }	
				if(owner_store_get.length > 0) { owner_store = 1 }
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
				return { "error":"ojs_shares_owner->owner_storer->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 1.3. [owner_store] 		
		
		
		
		//@
		//@
		//so sánh user_ID của token và có phải là chủ cữa hàng dtore_id không
		//nếu đúng trả về datas 1; nếu khong dứng trả về datas 0
		//@ 1.4. [owner_cat] 
		
		var owner_cat = 0;
		if(datas_check.cat_id){
			
			var owner_cat_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var cat_id = datas_check.cat_id;
				//return {"datas": [user_id,cat_id]};
				//@
				//@
				//@@
				var send_datas_check_owner_cat = { 
					"datas" : {
						"user_id" 	: user_id,
						"cat_id"	: cat_id
					}
				}				
				owner_cat_get = await await models_category_gemeral_speciality.get_owner_cat(send_datas_check_owner_cat);	
				//return  owner_cat_get;
				//@
				//@
				if(owner_cat_get.error) { return {"error":owner_cat_get.error,"message":owner_cat_get.error} }	
				if(owner_cat_get.length > 0) { owner_cat = 1 }
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
				return { "error":"ojs_shares_owner->owner_cat->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 1.3. [owner_store] 		
				

		//@
		//@
		//@
		//@
		//@ 1.4 owner options
		var owner_option = 0;
		if(datas_check.option_id){
			
			var owner_option_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var option_id = datas_check.option_id;
				
				//return {"datas": [user_id,option_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_option = { 
					"datas" : {
						"user_id" 	: user_id,
						"option_id"	: option_id
					}
				}				
				owner_option_get = await models_option_speciality.get_owner_option(send_datas_check_owner_option);	
				//return owner_option_get;
				//@
				//@
				if(owner_option_get.error) { return {"error":owner_option_get.error,"message":owner_option_get.error} }	
				if(owner_option_get.length > 0) { owner_option = 1 }
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_option->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 1.4. [owner_option] 

		//@
		//@
		//@
		//@
		//@ 1.5 owner brand
		var owner_brand = 0;
		if(datas_check.brand_id){
			
			var owner_brand_get;
			//@
			//@
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var brand_id = datas_check.brand_id;
				
				//return {"datas": [user_id,option_id]};
				
				//@
				//@
				//@@
				var send_datas_check_owner_brand = { 
					"datas" : {
						"user_id" 	: user_id,
						"brand_id"	: brand_id
					}
				}				
				owner_brand_get = await models_brands.get_owner_brand(send_datas_check_owner_brand);	
				//return owner_brand_get;
				//@
				//@
				if(owner_brand_get.error) { return {"error":owner_brand_get.error,"message":owner_brand_get.error} }	
				if(owner_brand_get.length > 0) { owner_brand = 1 }
				
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn, error, "Lỗi get option " );
				return { "error":"ojs_shares_owner->owner_brand->error_number : 1", "message": error_send };	
			}			
		}		
		//@ end of 1.5. [owner_option] 


		//@
		//@
		//@
		let data_return = {
			"error":"",
			"user_role": check_role.message,
			"owner_user" : owner_user,
			"owner_store":owner_store,
			"owner_cat":owner_cat,
			"owner_option":owner_option,
			"owner_brand":owner_brand,
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
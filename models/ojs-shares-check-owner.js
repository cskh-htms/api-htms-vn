
/*
* mục đích : các hàm fetch data


*/



const ojs_shares_show_errors = require('./ojs-shares-show-errors.js.js');
const ojs_configs = require('../configs/config');
//@
//@
//@
const ojs_shares_check_owner = {

	//@@
	//@@
	//@@
	//@demo function
	get_check_data: async function (datas_check){
		
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
			return { "error" : "ojs_shares->get_check_data->get-request->error_number : 1", "message": error_send } ; 
		
		}
		
		//@
		//@
		//neu không có token thì trỏ ra login page
		if(token == "" || token == null || token == undefined){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,"no-token", "no-token" );
			return { "error" : "ojs_shares->get_check_data->get-request->error_number : 2", "message": error_send } ; 			
		}

		//@
		//@
		//@
		//check token . xem token còn hạn hay không
		//@pamar:token
		try {
			//@
			//@
			var send_datas_token = { 
				"datas" : {
					"token" : datas_check.token
				}
			}
			var check_user;	
			
			//@
			//@
			check_user = await ojs_shares.get_data_no_token_post(ojs_configs.domain + '/api/v0/users/check-token', send_datas_token );
			if(check_user.error != "") { return {"error":"ojs_shares->get_check_data->get-request->error_number : 3","message":check_user}}
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
			return { "error" : "2.ojs_shares->get_check_data->check_user", "message": error_send } ; 
		
		}	
		
		//@
		//@
		//@
		//@
		//check role
		//xem role là gì
		var send_datas_check_role = { 
			"datas" : {
				"token" : datas_check.token
			}
		}
		let check_role;
		try {
			check_role = await ojs_shares.get_data_no_token_post(ojs_configs.domain + '/api/v0/users/get-role', send_datas_check_role );
			if(check_role.error != "") { return {"error":"1.ojs_shares->get_check_data->check_role","message":check_role}}
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
			return { "error" : "2.ojs_shares->get_check_data->check_role", "message": error_send } ;
		}		
		//@
		//@
		//lấy thông tin version
		//*token -> token 
		var get_datas_token = { 
			"datas" : {
				"token" : datas_check.token
			}
		}
		
		//@
		//@lấy version data
		let data_version;
		try {
			data_version = await ojs_shares.get_data_no_token_post(ojs_configs.domain + '/api/v0/users/get-version', get_datas_token );
			if(data_version.error  != "") {
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, " Không có version", "server đang bận, truy cập lại sau" );
				return { "error" : "1.ojs_shares->get_check_data->data_version", "message": error_send };
			}		
		}
		catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn,error, "server đang bận, truy cập lại sau" );
				return { "error" : "2.ojs_shares->get_check_data->data_version", "message": error_send } ; 
		}	
		//@
		//@
		//@
		//so sánh user_ID của token và User_ID của reouter
		//nếu đúng trả về datas 1; nếu khong dứng trả về datas 0
		if(datas_check.user_id){
		var send_datas_check_owner_user = { 
			"datas" : {
				"token" 	: datas_check.token,
				"user_id"	: datas_check.user_id
			}
		}
		var check_owner_user;
		try {
			check_owner_user = await ojs_shares.get_data_no_token_post(ojs_configs.domain + '/api/v0/users/get-owner-user', send_datas_check_owner_user );
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
		//so sánh user_ID của token và có phải là chủ cữa hàng dtore_id không
		//nếu đúng trả về datas 1; nếu khong dứng trả về datas 0
		let owner_store = "";
		if(datas_check.store_id){
			var danhSachCuaHang;
			
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var store_id = datas_check.store_id;
				//return {"datas": [user_id,store_id]};
				//@
				//@@
				danhSachCuaHang = await ojs_shares.get_data_send_token_post(
					ojs_configs.domain + '/api/' + data_version.datas.api_version  + '/stores/search', 
					ojs_datas_stores.get_data_danhSachCuaHang(user_id,store_id), 
					datas_check.token
				);			
				//return {"datas": danhSachCuaHang};

				if(danhSachCuaHang.error != "") { return {"error":danhSachCuaHang.error,"message":danhSachCuaHang.error} }	
				if(danhSachCuaHang.datas.length > 0) { owner_store = 1 }
			}
			catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
				return { "error" : "15_ojs_shares->get_check_data", "message": error_send };	
			}
				
		}//end if datas_check.user_id		
		
		
		
		
		//@
		//@
		//so sánh user_ID của token và có phải là chủ cữa hàng dtore_id không
		//nếu đúng trả về datas 1; nếu khong dứng trả về datas 0
		let owner_cat = "";
		if(datas_check.cat_id){
			var cat_list;
			
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var cat_id = datas_check.cat_id;
				//return {"datas": [user_id,cat_id]};
				//@
				//@@
				cat_list = await ojs_shares.get_data_send_token_post(
					ojs_configs.domain + '/api/' + data_version.datas.api_version  + '/categorys/general/speciality/search', 
					ojs_datas_category.get_data_category_list(cat_id,user_id), 
					datas_check.token
				);			
				//return {"datas": danhSachCuaHang};

				if(cat_list.error != "") { return {"error":"1.1.ojs_shares->cat_list","message":cat_list.error} }	
				if(cat_list.datas.length > 0) { owner_cat = 1 }
			}
			catch(error){
				var evn = ojs_configs.evn;
				evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
				return { "error" : "1.2_ojs_shares->cat_list", "message": error_send };	
			}
				
		}//end if datas_check.user_id		
				
		
		
		//@
		//@
		//so sánh user_ID của token và có phải là chủ cữa hàng dtore_id không
		//nếu đúng trả về datas 1; nếu khong dứng trả về datas 0
		let owner_option = "";
		if(datas_check.option_id){
			var option_list;
			
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var option_id = datas_check.option_id;
				//return {"datas": [user_id,cat_id]};
				//@
				//@@
				option_list = await ojs_shares.get_data_send_token_post(
					ojs_configs.domain + '/api/' + data_version.datas.api_version  + '/options/speciality/search', 
					ojs_datas_option.get_data_option_list_check_owner(option_id,user_id), 
					datas_check.token
				);			
				//return {"datas": danhSachCuaHang};

				if(option_list.error != "") { return {"error":"1.1.ojs_shares->cat_list","message":option_list.error} }	
				if(option_list.datas.length > 0) { owner_option = 1 }
			}
			catch(error){
				var evn = ojs_configs.evn;
				evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
				return { "error" : "1.2_ojs_shares->owner_option", "message": error_send };	
			}
				
		}//end if datas_check.user_id		
				
				
		//@
		//@
		//so sánh user_ID của token và có phải là chủ cữa hàng dtore_id không
		//nếu đúng trả về datas 1; nếu khong dứng trả về datas 0
		let owner_brand = "";
		if(datas_check.brand_id){
			var brand_list;
			
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var brand_id = datas_check.brand_id;
				//return {"datas": [user_id,cat_id]};
				//@
				//@@
				brand_list = await ojs_shares.get_data_send_token_post(
					ojs_configs.domain + '/api/' + data_version.datas.api_version  + '/brands/search', 
					ojs_datas_brands.get_data_brand_list_check_owner(brand_id,user_id), 
					datas_check.token
				);			
				//return {"datas": danhSachCuaHang};

				if(brand_list.error != "") { return {"error":"1.1.ojs_shares->cat_list","message":brand_list.error} }	
				if(brand_list.datas.length > 0) { owner_brand = 1 }
			}
			catch(error){
				var evn = ojs_configs.evn;
				evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
				return { "error" : "1.2_ojs_shares->owner_brand", "message": error_send };	
			}
				
		}//end if datas_check.user_id		
				
						
		//@
		//@
		//so sánh user_ID của token và có phải là chủ cữa sản phẩm không
		//nếu đúng trả về datas 1; nếu khong dứng trả về datas 0
		let owner_product = "";
		if(datas_check.product_id){
			var product_list;
			
			try {
				var user_id = jwt.decode(datas_check.token).users_ID;
				var product_id = datas_check.product_id;
				//return {"datas": [user_id,cat_id]};
				//@
				//@@
				product_list = await ojs_shares.get_data_send_token_post(
					ojs_configs.domain + '/api/' + data_version.datas.api_version  + '/products/speciality/search', 
					ojs_datas_products.get_data_product_list_check_owner(product_id,user_id), 
					datas_check.token
				);			
				//return {"datas": danhSachCuaHang};

				if(product_list.error != "") { return {"error":"1.1.ojs_shares->cat_list","message":product_list.error} }	
				if(product_list.datas.length > 0) { owner_product = 1 }
			}
			catch(error){
				var evn = ojs_configs.evn;
				evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
				return { "error" : "1.2_ojs_shares->owner_product", "message": error_send };	
			}
				
		}//end if datas_check.user_id		
				
					
				
		//@
		//@
		//get owner
		let owner_user = "";
		if(typeof check_owner_user == 'object' && check_owner_user){owner_user = check_owner_user.datas;}

		//@
		let data_return = {
			"error":"",
			"user_role": check_role.datas,
			"view_version":data_version.datas.view_version,
			"api_version":data_version.datas.api_version,
			"js_css_version":data_version.datas.js_css_version,
			"owner":owner_user,
			"owner_user" : owner_user,
			"owner_store":owner_store,
			"owner_cat":owner_cat,
			"owner_option":owner_option,
			"owner_brand":owner_brand,
			"owner_product":owner_product
	
		}
		return data_return;
		//@
		//@
		//@
	},
	//
	//@
	//@
	//@
	//*
	//check role text
	check_role : function(role){
		var role_return = "";
		//var test = [];
		
		for (const [key, value] of Object.entries(ojs_configs.user_role_database)) {
			
			if(md5(value) == role){
				role_return = ojs_configs.user_role_text[key];
				return role_return;
			}
		}	
		return role_return;
	},//end of showError
	//@	

	
}//end of oj_loader


module.exports = ojs_shares_check_owner;





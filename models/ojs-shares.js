
/*
@user : van luc 
@date : 21.10.2020
* file này viết ojs dùng chung 
* các hàm dùng chung 
@export : Ojs_users
*/

const fetch = require('node-fetch');
const jwt    = require('jsonwebtoken');
const ojs_configs = require('../configs/config');
const md5 = require('md5');
const crypto = require('crypto');

const ojs_datas_stores = require('./ojs-datas-stores.js');
const ojs_datas_category = require('./ojs-datas-category.js');

const ojs_datas_option = require('./ojs-datas-option.js');
const ojs_datas_brands = require('./ojs-datas-brands.js');
const ojs_datas_products = require('./ojs-datas-products.js');






const ojs_shares = {
	//
		//
	//
	evn: "publish",
	//
	service_type : ["0","1","2","speciality","food-drink"],
	//@
	//@
	get_service_type_name : function(service_id){
		let service_type_arr = ["0","1","2","speciality","food-drink"];
		
		let service_type_name = "";
		for(let x = 0; x < service_type_arr.length; x ++){
			if(service_id == x){
				service_type_name = service_type_arr[x];
			}
		}		
		
		return service_type_name;
	},
	//
	//kiểm tra chế độ code show ra error
	//nếu chế độ evn show ra lỗi
	//nếu chế độ finish show ra message
	//@evn -> chế độ code (evn)
	//@ error -> lỗi trả về
	//@message -> thông báo 
	show_error : function(evn,error,message){
		if(evn == "dev"){
			return error;
		}else{
			return message;
		}
	},
	//@
	//@
	//@
	//@lay ngay thang nam hien tai ke ca gio phut giay hien tai
	get_current_date_now : function(){
		var time_string = "";
		var time_add_zone = new Date(Date.now());
		//@
		//@
		let y = time_add_zone.getFullYear();
		let m = time_add_zone.getMonth() + 1;
		let d = time_add_zone.getDate();
		let h = time_add_zone.getHours();
		let p = time_add_zone.getMinutes();
		let g = time_add_zone.getSeconds();
		
		
		//@
		//@
		time_string = y + "/" + m + "/" + d + " " + h + ":" + p + ":" + g ;
		return time_string ;	

	},
	//@
	//@
	//@
	//@lay ngya hien tai thoi gian 00:00:00
	//today
	//ngay gio hom nay 
	get_current_date_star : function(){
		var time_string = "";
		var time_add_zone = new Date(Date.now());
		//@
		//@
		let y = time_add_zone.getFullYear();
		let m = time_add_zone.getMonth() + 1;
		let d = time_add_zone.getDate();
		
		
		//@
		//@
		time_string = y + "/" + m + "/" + d + " " + "00" + ":" + "00" + ":" + "00" ;
		return time_string ;	

	},
	//@
	//@
	//@
	//@lay ngay hien tai cuoi gio 23:59:59
	get_current_date_end : function(){
		var time_string = "";
		var time_add_zone = new Date(Date.now());
		//@
		//@
		let y = time_add_zone.getFullYear();
		let m = time_add_zone.getMonth() + 1;
		let d = time_add_zone.getDate();
		
		
		//@
		//@
		time_string = y + "/" + m + "/" + d + " " + "23" + ":" + "59" + ":" + "59" ;
		return time_string ;	

	},
	//@
	//@
	//@
	//@lấy ngày đầu tiên của thánng hiện tại
	get_current_month_now : function(){
		var time_string = "";
		var time_add_zone = new Date(Date.now());
		//@
		//@
		let y = time_add_zone.getFullYear();
		let m = time_add_zone.getMonth() + 1;
		let d = time_add_zone.getDate();
		
		
		//@
		//@
		time_string = y + "/" + m + "/" + "01" + " " + "00" + ":" + "00" + ":" + "00" ;
		return time_string ;	
	},
	//@
	//@
	//@
	//@lấy ngày đầu tiên của thánng trước
	get_current_month_prev_star : function(){
		var time_string = "";
		var time_add_zone = new Date(Date.now());
		//@
		//@
		let y = time_add_zone.getFullYear();
		let m = time_add_zone.getMonth();
		let d = time_add_zone.getDate();
		
		if(m == 0){
			m = 12;
			y = y - 1;
		}
		//@
		//@
		time_string = y + "/" + m + "/" + "01" + " " + "00" + ":" + "00" + ":" + "00" ;
		return time_string ;	

	},
	//@
	//@
	//@
	//@lấy ngày đầu cuối của thánng trước
	get_current_month_prev_end : function(){
		var time_string = "";
		var time_add_zone = new Date(Date.now());
		//@
		//@
		let y = time_add_zone.getFullYear();
		let m = time_add_zone.getMonth();
		let d = time_add_zone.getDate();
		
		if(m == 0){
			m = 12;
			y = y - 1;
		}
		
		var lastDay = new Date(y, m, 0);
		let dok = lastDay.getDate();
		//@
		//@
		time_string = y + "/" + m + "/" + dok + " " + "00" + ":" + "00" + ":" + "00" ;
		return time_string ;	

	},



	//phương thức post
	//@@@@@@@@@@@@@@@@	
	//gọi api kèm token (phương thức get)
	get_data_send_token_get : async function (url, token) {
		const response = await fetch(url, {
			method: 'GET', 
			headers: {
			  'token' : token
			}
		});
		return response.json();
	},
	//
	//
	//
	//gọi api kèm token (phương thức get)
	get_data_send_token_get : async function (url, token) {
		const response = await fetch(url, {
			method: 'GET', 
			headers: {
			  'token' : token
			}
		});
		return response.json();
	},	
	//
	//
	//
	//	
	//@@@@@@@@@@@@@@@@		
	//gọi api kèm token (phương thức post)
	get_data_send_token_post : async function (url, data, token) {
		const response = await fetch(url, {
			method: 'POST', 
			mode: 'cors', 
			cache: 'no-cache', 
			credentials: 'same-origin', 
			headers: {
			  'Content-Type': 'application/json',
			  'token' : token
			},
			redirect: 'follow', 
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data) 
		});
		return response.json();
	},		
	//
	//lấy api không cần gữi token trên header
	//phương thức post
	//@@@@@@@@@@@@@@@@
	get_data_no_token_post : async function (url, data) {
		const response = await fetch(url, {
			method: 'POST', 
			mode: 'cors', 
			cache: 'no-cache', 
			credentials: 'same-origin', 
			headers: {
			  'Content-Type': 'application/json'
			},
			redirect: 'follow', 
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data) 
		});
		return response.json();
	},		
	//
	//lấy api không cần gữi token trên header
	//phương thức post
	//@@@@@@@@@@@@@@@@
	get_data_no_token_get : async function (url) {
		const response = await fetch(url, {
			method: 'GET'
		});
		return response.json();
	},//end of function
	// lấy id từ token
	get_users_id : function (token) {
		var new_user = jwt.decode(token).users_ID;
		return new_user;
	},		
	//
	//	
	//
	// lấy full_name từ token
	get_users_full_name : function (token) {
		var new_user = jwt.decode(token).users_full_name;
		return new_user;
	},		
	//
	//	
	//
	//lấy loại user từ token
	get_users_type : function (token) {
		var users_type = jwt.decode(token).users_users_type_id;
		return users_type;
	},	
	//
	//@@
	//@@
	//@@
	//@@
	//gọi api kèm token (phương thức put)
	get_data_send_token_put : async function (url, data, token) {
		const response = await fetch(url, {
			method: 'PUT', 
			mode: 'cors', 
			cache: 'no-cache', 
			credentials: 'same-origin', 
			headers: {
			  'Content-Type': 'application/json',
			  'token' : token
			},
			redirect: 'follow', 
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data) 
		});
		return response.json();
	},	
	//
	//@@
	//@@
	//@@
	//@@	
	//gọi api kèm token (phương thức delete)
	get_data_send_token_delete : async function (url, token) {
		const response = await fetch(url, {
			method: 'DELETE', 
			headers: {
			  'token' : token
			}
		});
		return response.json();
	},	
	//
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
			var error_send = ojs_shares.show_error( evn, error, "Lỗi get request data" );
			return { "error" : "ojs_shares->get_check_data->get-request->error_number : 1", "message": error_send } ; 
		
		}
		
		//@
		//@
		//neu không có token thì trỏ ra login page
		if(token == "" || token == null || token == undefined){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares.show_error( evn,"no-token", "no-token" );
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
			var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
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
			var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
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
				var error_send = ojs_shares.show_error( evn, " Không có version", "server đang bận, truy cập lại sau" );
				return { "error" : "1.ojs_shares->get_check_data->data_version", "message": error_send };
			}		
		}
		catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares.show_error( evn,error, "server đang bận, truy cập lại sau" );
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
			var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
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
				var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
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
				var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
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
				var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
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
				var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
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
				var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
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
	//
	//@
	//@ 
	//hash
	encrypt : function (txt){
		var mykey = crypto.createCipher(ojs_configs.hash_code,ojs_configs.hash_secret);
		var mystr = mykey.update(txt, 'utf8', 'hex')
		mystr += mykey.final('hex');
		return mystr;
	},
	decrypt : function (txt){
		var mykey = crypto.createDecipher(ojs_configs.hash_code,ojs_configs.hash_secret);
		var mystr = mykey.update(txt, 'hex', 'utf8')
		mystr += mykey.final('utf8');	

		return mystr;
	},
	
	//@@
	//@@
	//@@@@@@@@
	//@@@@@@@@
	//@@
	//@@rename key ojs
	rename_key : (object, key, new_key) => {
		  const cloned_obj = ojs_shares.clone(object);
		  const target_key = cloned_obj[key];
		  delete cloned_obj[key];
		  //@
		  cloned_obj[new_key] = target_key;
		  //@
		  //@
		  return cloned_obj;
	},
	clone : (obj) => Object.assign({}, obj)	,
	//@
	//@
	//@
	//chech maintenance
	check_meaintenance : function (req, res, next){
		let token = req.session.token;
		let check_maintenance  = ojs_configs.status_page;
		
		//@
		//@
		//nếu chế độ bảo trì 
		if(check_maintenance == "maintenance"){
			//@
			//neu co token
			if(token){
				let newPayload = jwt.decode(token);
				if(newPayload.user_role != "admin"){
					res.send( '<h1 style="text-align:center;"> Hệ thống đang bảo trì</h1>' );
					return;					
				}
			//@
			//neu ko co token
			}
		}
		next();
	},
	
	//
	//@
	//@
	//@@
	//@kieu tra xem dung kieu du lieu date ko
	check_date_full : function(string_date){
	   if(string_date == ""){
		   return true;
	   }		
	   var regex = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,2})([ ])(\d{1,2}[:]\d{1,2}[:]\d{1,2})$/;
	   var inputEmail = string_date;

	   if (regex.test(inputEmail)) {
		  return true;
	   } else {           
			return false;
	   }
	},

	//
	//@
	//@
	//@@
	//@kieu tra xem dung kieu du lieu date ko
	check_date : function(string_date){
	   if(string_date == ""){
		   return true;
	   }		
	   var regex = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,2})$/;
	   var inputEmail = string_date;

	   if (regex.test(inputEmail)) {
			return true;
	   } else {           
			return false;
	   }
	},	
	//
	//@@
	//@@
	//lấy select type (distric...)
	get_select_type : function(select_type){
		var select_type = " " + select_type + " ";
		//@
		return select_type;
	},
	
	
	//@
	//@
	//@
	//get_select_field
	get_select_field : function(field_arr,sql_select_all){
		var sql_field = "";
		//@
		if(Object.keys(field_arr).length == 0){
			sql_field = sql_select_all ;
		}else{
			for (var x in field_arr){
				
				let sql_field_date = "";
				
				if
				(	
				field_arr[x] == "products_speciality_date_start" 
				|| field_arr[x] == "products_speciality_date_end" 
				|| field_arr[x] == "stores_date_created" 
				|| field_arr[x] == "orders_speciality_date_orders" 
				
					
				)
				{
					sql_field_date  = "DATE_FORMAT(" + ojs_configs.db_prefix  + field_arr[x] + "," + "'%Y/%m/%d %H:%i:%s'"  + ")";
				}else{
					sql_field_date  = ojs_configs.db_prefix + field_arr[x];
				}
				
				if(sql_field == ""){
					sql_field =  sql_field_date  + " as " +  field_arr[x];
				}else{
					sql_field =  sql_field  + ", " + sql_field_date  + " as " +  field_arr[x];
				}
			}
		}
		sql_field = sql_field + " ";
		return sql_field;
	},//end of get_select_field

	//@
	//@
	//@
	// get condition text
	get_condition : function(condition_arr){
		
		var sql_condition = "";
		var sql_conditions = " where '2020' = '2020' and ";
		//@
		var relation_check=[
			"or",
			"and"
		];
	
		//return sql_conditions;
		//@
		//@
		//@
		if(Object.keys(condition_arr).length == 0){
			sql_condition = "";
		}else{
			//return sql_conditions;
			
			for (var x in condition_arr){
				for (var s in condition_arr[x].where){
					let consition_value = "";
					let consition_field = "";//condition_arr[x].where[s].field
					
					//
					//
					//@@ edit date order
					
					if(ojs_shares.check_date_full(condition_arr[x].where[s].value) == true || ojs_shares.check_date(condition_arr[x].where[s].value) == true ){
						consition_value = " UNIX_TIMESTAMP('" + condition_arr[x].where[s].value + "') ";
						consition_field = " UNIX_TIMESTAMP(" + ojs_configs.db_prefix + condition_arr[x].where[s].field + ") ";
					
					}else if(condition_arr[x].where[s].compare == "in"){
						consition_value = "(" + condition_arr[x].where[s].value + ")";
						consition_field = ojs_configs.db_prefix + condition_arr[x].where[s].field;
					}else{
						consition_value = " '" + condition_arr[x].where[s].value + "' ";
						consition_field = ojs_configs.db_prefix + condition_arr[x].where[s].field;
					}				
					
					

					var relation = condition_arr[x].relation;
					
					if(relation_check.indexOf(relation) < 0 ){
						relation = "and";
					}						
					
					
					if(s == 0 && x == 0){
						relation = " ";
					}
					

					sql_condition = sql_condition + relation + " ";
					sql_condition = sql_condition + 
						consition_field + " " + 
						condition_arr[x].where[s].compare +  " " + 
						" " + consition_value + " "
				}
			}
		}
		
		sql_conditions = sql_conditions + sql_condition;
		sql_conditions = sql_conditions + " ";
		return sql_conditions;
	},//end of get_condition
	
	//@
	//@
	//@
	//@having
	get_having : function(condition_arr){
		var sql_condition = "";
		var sql_conditions = " having ";
		//@
		if(Object.keys(condition_arr).length == 0){
			sql_condition = "";
		}else{
			for (var x in condition_arr){
				for (var s in condition_arr[x].where){
					let consition_value = "";
					let consition_field = "";//condition_arr[x].where[s].field
					
					//
					//
					//@@ edit date order
					if(ojs_shares.check_date_full(condition_arr[x].where[s].value) == true || ojs_shares.check_date(condition_arr[x].where[s].value) == true ){
						consition_value = " UNIX_TIMESTAMP('" + condition_arr[x].where[s].value + "') ";
						consition_field = " UNIX_TIMESTAMP(" + ojs_configs.db_prefix + condition_arr[x].where[s].field + ") ";
					}else if(condition_arr[x].where[s].compare == "in"){
						consition_value = "(" + condition_arr[x].where[s].value + ")";
						consition_field = ojs_configs.db_prefix + condition_arr[x].where[s].field;
					}else if(condition_arr[x].where[s].compare == "is not null"){
						consition_value = condition_arr[x].where[s].value;
						consition_field = ojs_configs.db_prefix + condition_arr[x].where[s].field;
					}else{
						consition_value = " '" + condition_arr[x].where[s].value + "' ";
						consition_field = ojs_configs.db_prefix + condition_arr[x].where[s].field;
					}				
					//@
					//@
					//@
					if(sql_condition == ""){
						//@
						//@
						//@
						sql_condition = sql_condition + 
							consition_field + " " + 
							condition_arr[x].where[s].compare +  " " + 
							" " + consition_value + " "					
					}else{
						//@
						//@
						//@
						sql_condition = sql_condition + condition_arr[x].relation + " ";
						sql_condition = sql_condition + 
							consition_field + " " + 
							condition_arr[x].where[s].compare +  " " + 
							" " + consition_value + " "
					}
				}
			}
		}
		
		sql_conditions = sql_conditions + sql_condition;
		sql_conditions = sql_conditions + " ";
		return sql_conditions;
	},//end of get_having	


	//@
	//@
	//@
	//get order text
	get_order_text : function(order_arr){
		var sql_order = "";
		//@
		if(Object.keys(order_arr).length == 0){
			sql_order = "";
		}else{
			for (var x in order_arr){
				if(sql_order == ""){
					sql_order = "order by " + ojs_configs.db_prefix + order_arr[x].field + " " + 
					order_arr[x].compare +  " " 
				}else{
					sql_order = sql_order + " , " + ojs_configs.db_prefix + order_arr[x].field + " " + 
					order_arr[x].compare +  " " 				
				}
			}
		}
		return sql_order;
	},//end of get_order_text 

	//
	//
	
	//
	//@@
	//@@get_group_by
	get_group_by : function(group_arr){
		var sql_group = "";
		//@
		for (var x in group_arr){
			if(sql_group == ""){
				sql_group =  sql_group  + ojs_configs.db_prefix +  group_arr[x];
			}else{
				sql_group =  sql_group  + ", "  + ojs_configs.db_prefix + group_arr[x];
			}
		}

		sql_group = " group by " + sql_group + " ";
		return sql_group;
	},	
	//
	//
	//

	//
	//
	//
	//@@
	//@@get limit
	get_limit : function(limit_arr){
		var limit = "";
		if(limit_arr.length > 0){
			if( Object.getOwnPropertyDescriptor(limit_arr[0], 'limit_number') != undefined){
				limit = " " + limit_arr[0].limit_number + " ";
				
				if( Object.getOwnPropertyDescriptor(limit_arr[0], 'limit_offset') != undefined){
					limit = limit + " offset " + limit_arr[0].limit_offset;
				}	
				limit = "limit " + limit ;
			}	
		}
		//@
		return limit;
	},	
	//
	//
	//
	//@@
	//@@get serrch sql 
	get_sql_search : function(datas,sql_select_all){
		//return datas;
		//@
		let sql_result = "";
		ojs_assign = ojs_configs.valiable_search;
		
		/*
		{
		"sql_select_type" 	: "",
		"sql_select_fields" : "",
		"sql_conditions" 	: "",
		"sql_group_by" 		: "",
		"sql_having" 		: "",
		"sql_order" 		: "",
		"sql_limit" 		: "",
		"sql_having" 		: ""
		}	
		*/
		
		//@
		//@
		//@
		//@ select type
		var ojs_1 = {...ojs_assign};
		try {
			if(datas.select_type){
				var sql_select_type = ojs_shares.get_select_type(datas.select_type);
				Object.assign(ojs_1,  { 'sql_select_type' : sql_select_type } );
			}		
		}
		catch(error){
			return  { "error" : "1.ojs_share->get_sql_search", "message" : error } ;
		}		
		
		
		
		
		//@
		//@
		//@
		//@ select field
		var ojs_2 = {...ojs_1};
		try {
			if(datas.select_field){
				var sql_field = ojs_shares.get_select_field(datas.select_field, sql_select_all);
				Object.assign(ojs_2, { 'sql_select_fields' : sql_field });
			}		
		}
		catch(error){
			return  { "error" : "2.ojs_share->get_sql_search", "message" : error } ;
		}	
		
		
		
		//@
		//@
		//@
		//@ conditon
		var ojs_3 = {...ojs_2};
		try {
			if(datas.condition){
				var sql_conditions = ojs_shares.get_condition(datas.condition);
				Object.assign(ojs_3, { 'sql_conditions' : sql_conditions });
			}		
		}
		catch(error){
			return  { "error" : "3.ojs_share->get_sql_search", "message" : error } ;
		}	

		//@
		//@
		//@
		//@ group by
		var ojs_4 = {...ojs_3};
		try {
			if(datas.group_by){
				var sql_group_by = ojs_shares.get_group_by(datas.group_by);
				Object.assign(ojs_4, { 'sql_group_by' : sql_group_by });
			}				
		}
		catch(error){
			return  { "error" : "4.ojs_share->get_sql_search", "message" : error } ;
		}	


		//@
		//@
		//@
		//@ having
		var ojs_5 = {...ojs_4};
		try {
			if(datas.having){
				var sql_having = ojs_shares.get_having(datas.having);
				Object.assign(ojs_5, { 'sql_having' : sql_having });
			}		
		}
		catch(error){
			return  { "error" : "5.ojs_share->get_sql_search", "message" : error } ;
		}	



		//@
		//@
		//@
		//@ order
		var ojs_6 = {...ojs_5};
		try {
			if(datas.order){
				var sql_order = ojs_shares.get_order_text(datas.order);
				Object.assign(ojs_6, { 'sql_order' : sql_order });
			}		
		}
		catch(error){
			return  { "error" : "6.ojs_share->get_sql_search", "message" : error } ;
		}	


		//@
		//@
		//@
		//@ limit
		var ojs_7 = {...ojs_6};
		try {
			if(datas.limit){
				var sql_limit = ojs_shares.get_limit(datas.limit);
				Object.assign(ojs_7, { 'sql_limit' : sql_limit });
			}		
		}
		catch(error){
			return  { "error" : "7.ojs_share->get_sql_search", "message" : error } ;
		}	


	
		//@
		//@
		//@
		//@
		return ojs_7;
	},	
	//
	//
	//
	//@@
	//@@get limit
	get_sql_search_group : function(data_assigns,sql_from_default,sql_link_search){
		//@
		//@
		//@
		//@
		var sql_text = 	"SELECT  " + 
						data_assigns.sql_select_type + 
						data_assigns.sql_select_fields +
						sql_from_default + 
						sql_link_search + 
						data_assigns.sql_conditions + 
						data_assigns.sql_group_by + 
						data_assigns.sql_having + 
						data_assigns.sql_order + 
						data_assigns.sql_limit
		
		
		return sql_text;
	}	







	
}//end of oj_loader


module.exports = ojs_shares;





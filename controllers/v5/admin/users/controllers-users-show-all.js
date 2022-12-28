


//@
//@
//@
//@ file start





//@
//@
//@
//@ config
const ojs_configs = require('../../../../configs/config');
const config_api = require('../../../../api/configs/config-api');




//@
//@
//@
//@ share
const ojs_shares_show_errors = require('../../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../../shares/ojs-shares-fetch-data');






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
			var token = req.session.token;	
			if(token == "" || token == null || token == undefined || token == 'null'){
				res.send('<p style="text-align:center;">Vui lòng <a href="/login" style="color:blue;">  ĐĂNG NHẬP  </a></p>');
				return;
			}		
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi lấy req" 
			);
			res.send({ 
				"error" : "1", 
				"position":"controllers->admin-->users->show-all",
				"message": error_send 
			}); 
			return;			
		}	
		//res.send(["hú"]);
		//return;	
		
		
		
		
		//@
		//@
		//@
		try {
			var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_get(
					ojs_configs.domain + 
					'/api/appdalacom/' + 
					config_api.API_APPDALACOM_VERSION + 
					'/admin/users-show-all/',
					token
				);	
			//res.send([data_api_resuilt]);
			//return;				
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi lấy req" 
			);
			res.send({ 
				"error" : "2", 
				"position":"controllers->admin-->users->show-all",
				"message": error_send 
			}); 
			return;			
		}
		
		if(data_api_resuilt.error){
			if(data_api_resuilt.position =="middle_ware"){
				res.send('<p style="text-align:center;">Vui lòng <a href="/login" style="color:blue;">  ĐĂNG NHẬP  </a></p>');
				return;
			}
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				data_api_resuilt, 
				"Lỗi lấy api" 
			);
			res.send({ 
				"error" : "99", 
				"position":"controllers->admin-->users->show-all",
				"message": error_send 
			}); 
			return;
		}		

		//res.send( [data_api_resuilt] );
		//return;

		
		
		
		
		//@
		//@
		//@	
		//@ goo
		try {

			datas_info = {
				'title' 			: 'Admin quản lý dala',
				'users_type' 		: ojs_shares_others.get_users_type(token),
				'user_id' 			: ojs_shares_others.get_users_id(token),
				'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
				'js_css_version'	: ojs_configs.js_css_version,
				'menu_taget'		: 'sidebar_danh_sach_tai_khoan',
				'sidebar_type'		:  "",
				
				'news_admin_menu' 	: data_api_resuilt[1],
				'users_list' 		: data_api_resuilt[2],
			}
			
			
			data_send = {
				'title' 			: 'Admin quản lý dala',
				'users_type' 		: ojs_shares_others.get_users_type(token),
				'user_id' 			: ojs_shares_others.get_users_id(token),
				'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
				'js_css_version'	: ojs_configs.js_css_version,
				'menu_taget'		: 'sidebar_danh_sach_tai_khoan',
				'sidebar_type'		:  "",
				
				'news_admin_menu' 	: data_api_resuilt[1],
				'users_list' 		: data_api_resuilt[2],
				
				'datas_info'			: datas_info			
			}
			
			
			//res.send(data_send);
			//return;
			
			res.render( ojs_configs.view_version + '/users/admin-show-all', data_send );
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi send data to browser" 
			);
			res.send({ 
				"error" : "100", 
				"position":"controllers->admin-->users->show-all",
				"message": error_send 
			}); 
			return;
		}			
	//@
	//@
	//@ catch error all		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"Lỗi không xác định. Vui lòng liên hệ bộ phận kỹ thuật hoặc  thao tác lại" 
		);
		res.send({ 
			"error" : "1000", 
			"position":"controller->users-show-all",
			"message": error_send 
		}); 
		return;			
	}
	
	
	
	//@
	//@
	//@ send error when not return data
	res.send({ 
		"error" : "2000", 
		"position":"controller->users-show-all",
		"message": "Lỗi không có data return, Lỗi này khi không có dữ liệu return, Vui lòng liên hệ bộ phận kỹ thuật, hoặc thao tác lại" 
	}); 
	return;	
	
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




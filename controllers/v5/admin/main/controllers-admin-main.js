



//@
//@
//@
//@ file start

const ojs_configs = require('../../../../configs/config');
const config_api = require('../../../../api/configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../../shares/ojs-shares-fetch-data');









//@
//@
//@
//@ export
async  function function_export(req, res, next) {
	try {
		var token = req.session.token;	
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			return res.send('<p style="text-align:center;">Vui lòng <a href="/login" style="color:blue;">  ĐĂNG NHẬP  </a></p>');
			
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
		return res.send({ 
			"error" : "1", 
			"position":"web/controller/admin/main/controllers-admin-mains.js",
			"message": error_send 
		}); 
					
	}
	
	
	//return res.send( [token] );
	//	
	
	
	
	
	
	//@
	//@
	//@ get api
	var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_get(
			ojs_configs.domain + '/api/appdalacom/' + 
			config_api.API_APPDALACOM_VERSION + 
			'/admin/mains', 
			token
		);	
		
	//return res.send( [data_api_resuilt] );
		
		
		
		
		
		
	if(data_api_resuilt.error){
		
		if(data_api_resuilt.position =="middle-ware"){
			return res.send('<p style="text-align:center;">Vui lòng <a href="/login" style="color:blue;">  ĐĂNG NHẬP  </a></p>');
			
		}
		
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			data_api_resuilt, 
			"Lỗi lấy api" 
		);
		return res.send({ 
			"error" : "99", 
			"position":"web/controller/admin/main/controllers-admin-mains.js",
			"message": error_send 
		}); 
		
	}		
	
	//return res.send( [data_api_resuilt] );
	//
	
	//@
	try {

		datas_info = {
			'title' 				: 'Tổng quan',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			
			'menu_taget'			: "sidebar_tong_quan",
			'sidebar_type'			:  "",
			'user_role'				: ojs_shares_others.get_users_type(token),			
			'news_admin_menu' 		: data_api_resuilt[1],
			
			'store_all' 			: data_api_resuilt[2],
			'store_new' 			: data_api_resuilt[3],

			'product_all' 			: data_api_resuilt[4],
			'product_new' 			: data_api_resuilt[5],

			'order_all' 			: data_api_resuilt[6],
			'order_ok' 				: data_api_resuilt[7],
			'order_no_ok' 			: data_api_resuilt[8],
			'order_total' 			: data_api_resuilt[9],

			'traffic' 				: data_api_resuilt[10],
			
			'user_app' 				: data_api_resuilt[11],			
			'user_web' 				: data_api_resuilt[12],
			'user_webapp' 			: data_api_resuilt[13],
			
			'order_app' 			: data_api_resuilt[14],
			'order_app_mon' 		: data_api_resuilt[15],
			'order_web' 			: data_api_resuilt[16],
			'order_web_mon' 		: data_api_resuilt[17],
			'order_webapp' 			: data_api_resuilt[18],		
			'order_webapp_mon' 		: data_api_resuilt[19],	
			'user_all' 				: data_api_resuilt[20],			
		}
		
		
	
		//return res.send( datas_info );
		//	


		
		data_send = {
			'title' 				: 'Tổng quan',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			
			'menu_taget'			: "sidebar_tong_quan",
			'sidebar_type'			:  "",
			'user_role'				: ojs_shares_others.get_users_type(token),			
			'news_admin_menu' 		: data_api_resuilt[1],
			
			'store_all' 			: data_api_resuilt[2],
			'store_new' 			: data_api_resuilt[3],

			'product_all' 			: data_api_resuilt[4],
			'product_new' 			: data_api_resuilt[5],

			'order_all' 			: data_api_resuilt[6],
			'order_ok' 				: data_api_resuilt[7],
			'order_no_ok' 			: data_api_resuilt[8],
			'order_total' 			: data_api_resuilt[9],

			'traffic' 				: data_api_resuilt[10],
			
			'user_app' 				: data_api_resuilt[11],			
			'user_web' 				: data_api_resuilt[12],
			'user_webapp' 			: data_api_resuilt[13],
			
			'order_app' 			: data_api_resuilt[14],
			'order_app_mon' 		: data_api_resuilt[15],
			'order_web' 			: data_api_resuilt[16],
			'order_web_mon' 		: data_api_resuilt[17],
			'order_webapp' 			: data_api_resuilt[18],		
			'order_webapp_mon' 		: data_api_resuilt[19],
			'user_all' 				: data_api_resuilt[20],
			
			'datas_info'			: datas_info			
		}
	
		res.render( ojs_configs.view_version + '/users/admin', data_send  );	
		
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi data_send" );
			return res.send({ "error" : "100","position":"web/controller/admin/main/controllers-admin-mains.js", "message": error_send } ); 
					
	}			
};




//@
//@
//@
//@ export
module.exports = function_export;








//@
//@
//@
//@ file end
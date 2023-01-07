



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
async  function store_order_get_all(req, res, next) {
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
			"position":"web->controllers->admin->stores->controllers-admin-store-add.js",
			"message": error_send 
		}); 
		return;			
	}	
	//res.send( ["ok"]);
	//return;	
	
	
	
	
	
	
	
	
	//@
	//@
	//@ get api
	var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_get(
			ojs_configs.domain + '/api/appdalacom/' + 
			config_api.API_APPDALACOM_VERSION + 
			'/admin/stores/add', 
			token
		);	
		
	//res.send( [data_api_resuilt] );
	//return;	
		
		
		
		
		
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
			"position":"web->controllers->admin->stores->controllers-admin-store-add.js",
			"message": error_send 
		}); 
		return;
	}		
	
	//res.send( [data_api_resuilt] );
	//return;
	
	//@
	try {

		datas_info = {
			'title' 				: 'Tạo cửa hàng',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			
			'menu_taget'			: "sidebar_danh_sach_cua_hang",
			'user_role'				: ojs_shares_others.get_users_type(token),
			
			
			'news_admin_menu' 		: data_api_resuilt[1],
			'local_json' 			: data_api_resuilt[4],
			'service_type_list'		: data_api_resuilt[2],
			'users_list'			: data_api_resuilt[3]		
			
		}
		
		
	
		
		
		
		//res.send( datas_info );
		//return;	


		
		data_send = {
			'title' 				: 'Tạo cửa hàng',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			
			'menu_taget'			: "sidebar_danh_sach_cua_hang",
			'sidebar_type'			: "",
			'user_role'				: ojs_shares_others.get_users_type(token),
			
			
			'news_admin_menu' 	: data_api_resuilt[1],
			'local_json' 			: data_api_resuilt[4],
			'service_type_list'		: data_api_resuilt[2],
			'users_list'			: data_api_resuilt[3],	
			'datas_info'			: datas_info			
		}
	
		res.render( ojs_configs.view_version + '/stores/admin-add', data_send  );	
		
		
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi data_send" );
			res.send({ "error" : "100","position":"web->controllers->admin->stores->controllers-admin-store-add.js", "message": error_send } ); 
			return;		
	}			
};


module.exports = store_order_get_all;




const ojs_configs = require('../../../../configs/config');
const config_api = require('../../../../api/configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../../shares/ojs-shares-fetch-data');


async  function function_export(req, res, next) {
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
			"position":"controllers-admin-discount-program-admin-quan-ly-show-all-web-appdalacom.js",
			"message": error_send 
		}); 
		return;			
	}
	
	//res.send(["sdfsdfsdf"]);
	//return;	
	
	
	
	
	//@
	//@
	//@
	try {
		var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_get(
				ojs_configs.domain + 
				'/api/appdalacom/' + 
				config_api.API_APPDALACOM_VERSION + 
				'/admin/discounts/show-all/',
				token
			);	
		//res.send( data_api_resuilt );
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
			"position":"controllers-admin-discount-program-admin-quan-ly-show-all-web-appdalacom.js",
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
			"position":"controllers-admin-discount-program-admin-quan-ly-show-all-web-appdalacom.js",
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
			'title' 			: 'Quản lý chương trình khuyến mãi',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: ojs_shares_others.get_users_id(token),
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		: 'sidebar_discount_program',
			'sidebar_type'		:  "",
			
			'news_admin_menu' 	: data_api_resuilt[1],
			'discount_program_list' : data_api_resuilt[2],
			'discount_program_product_list' : data_api_resuilt[3],		
			'products_gift_in' : data_api_resuilt[4],
			'price_list' : data_api_resuilt[5],
		}
		
		
		data_send = {
			'title' 			: 'Quản lý chương trình khuyến mãi',
			'users_type' 		: ojs_shares_others.get_users_type(token),
			'user_id' 			: ojs_shares_others.get_users_id(token),
			'user_full_name' 	: ojs_shares_others.get_users_full_name(token),
			'js_css_version'	: ojs_configs.js_css_version,
			'menu_taget'		: 'sidebar_discount_program',
			'sidebar_type'		:  "",
			
			'news_admin_menu' 	: data_api_resuilt[1],
			'discount_program_list' : data_api_resuilt[2],
			'discount_program_product_list' : data_api_resuilt[3],		
			'products_gift_in' : data_api_resuilt[4],
			'price_list' : data_api_resuilt[5],
			
			'datas_info'			: datas_info			
		}
		
		
		//res.send(data_send);
		//return;
		
		res.render( ojs_configs.view_version + '/discount-program/speciality/admin-show-quan-ly-show-all', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"Lỗi lấy api" 
		);
		res.send({ 
			"error" : "100", 
			"position":"controllers-admin-discount-program-admin-quan-ly-show-all-web-appdalacom.js",
			"message": error_send 
		}); 
		return;
	}			
};


module.exports = function_export;



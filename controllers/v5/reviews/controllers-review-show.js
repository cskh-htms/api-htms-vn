
const ojs_configs = require('../../../configs/config');
const config_api = require('../../../api/configs/config-api');

const ojs_shares_show_errors = require('../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../shares/ojs-shares-fetch-data');


async  function show_review(req, res, next) {
	try {
		var token = req.session.token;	
		var review_id = req.params.review_id;
		
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			return res.send( "vui lòng đăng nhập" );
			
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"Lỗi lấy req" 
		);
		return res.send({ 
			"error" : "1", 
			"position":"web->controller->reviews->show",
			"message": error_send 
		}); 
					
	}
	
	//	
	try {
		var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_get(
				ojs_configs.domain + '/api/appdalacom/' + config_api.API_APPDALACOM_VERSION + '/reviews/show/' + review_id, 
				token
			);	
			
		//return res.send(data_api_resuilt);	
		//
			
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"Lỗi lấy req" 
		);
		return res.send({ 
			"error" : "2", 
			"position":"web->controller->reviews->show",
			"message": error_send 
		}); 
					
	}
	
	if(data_api_resuilt.error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			data_api_resuilt, 
			"Lỗi lấy api" 
		);
		return res.send({ 
			"error" : "99", 
			"position":"web->controller->reviews->show",
			"message": error_send 
		}); 
		
	}		
	
	//@
	try {

		datas_info = {
			'title' 				: 'Chỉnh sửa reviews',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),	
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: "",
			'menu_taget'			:'sidebar_reviews',	
			'review_id' 			: review_id,
			'datas' 				: data_api_resuilt[2],		
			'news_admin_menu' 		: data_api_resuilt[1]
			
		}
		
		
		data_send = {
			'title' 				: 'Chỉnh sửa reviews',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),	
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: "",
			'menu_taget'			:'sidebar_reviews',	
			'review_id' 			: review_id,
			'datas' 				: data_api_resuilt[2],		
			'news_admin_menu' 		: data_api_resuilt[1]	,		
			'datas_info'			: datas_info			
		}
		
		
		res.render( ojs_configs.view_version + '/reviews/speciality/show', data_send );
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi data_send" );
			return res.send({ "error" : "100","":"", "message": error_send } ); 
					
	}

};


module.exports = show_review;



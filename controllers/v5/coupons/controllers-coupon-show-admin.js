
const ojs_configs = require('../../../configs/config');
const config_api = require('../../../api/configs/config-api');

const ojs_shares_show_errors = require('../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../shares/ojs-shares-fetch-data');


async  function function_export(req, res, next) {
	try {
		var token = req.session.token;	
		var coupon_id = req.params.coupon_id;
		var store_id = req.params.store_id;
		
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
			"position":"controller->coupon-show-admin",
			"message": error_send 
		}); 
		return;			
	}
	
	//res.send( [store_id,coupon_id] );
	//return;	
	
	var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_get(
			ojs_configs.domain + '/api/appdalacom/' + config_api.API_APPDALACOM_VERSION + '/coupons/show-admin/' + coupon_id + '/' + store_id, 
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
			"position":"controller->coupon-show-admin",
			"message": error_send 
		}); 
		return;
	}		
	
	//res.send([data_api_resuilt]);
	//return;
	
	//@
	try {

		datas_info = {
			'title' 				: 'Chỉnh sửa coupon',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),
			'store_id'				: store_id,
			'coupon_id'				: coupon_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: "",
			'menu_taget'			:'sidebar_coupon',	
			
			
			'service_type_name' 	: data_api_resuilt[2][0].service_type_name,
			'store_name' 			: data_api_resuilt[2][0].stores_name,	
			
			'news_admin_menu' 		: data_api_resuilt[1],
			'datas' 				: data_api_resuilt[3],

		}

		data_send = {
			'title' 				: 'Chỉnh sửa coupon',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),
			'store_id'				: store_id,
			'coupon_id'				: coupon_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: "",
			'menu_taget'			:'sidebar_coupon',	
			
			
			'service_type_name' 	: data_api_resuilt[2][0].service_type_name,
			'store_name' 			: data_api_resuilt[2][0].stores_name,	
			
			'news_admin_menu' 		: data_api_resuilt[1],
			'datas' 				: data_api_resuilt[3],	
			'datas_info'			: datas_info			
		}
	
		//res.send(data_send);
		//return;
	
	
		res.render( ojs_configs.view_version +  '/coupon/speciality/show-admin', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			data_api_resuilt, 
			"Lỗi send data" 
		);
		res.send({ 
			"error" : "99", 
			"position":"controller->coupon-show-admin",
			"message": error_send 
		}); 
		return;
	}			
};


module.exports = function_export;



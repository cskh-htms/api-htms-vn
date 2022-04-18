
const ojs_configs = require('../../../configs/config');
const config_api = require('../../../api/configs/config-api');

const ojs_shares_show_errors = require('../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../shares/ojs-shares-fetch-data');


async  function function_export(req, res, next) {
	
	if( !req.session.token ){
		res.send('<h1 style="text-align:center;">Vui lòng đăng nhập</h1>' );
		return;
	}		
	
	
	try {
		var token = req.session.token;
		var store_id = req.params.store_id;
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
			"position":"controller->web-discount-program->discount_program_store-id",
			"message": error_send 
		}); 
		return;			
	}
	
	//res.send([token,store_id]);
	//return;	
	try {
		var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_get(
				ojs_configs.domain + 
				'/api/appdalacom/' + 
				config_api.API_APPDALACOM_VERSION + 
				'/discount-program/speciality/stores/' + 
				store_id ,
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
			"position":"controller->web-discount-program->discount_program_store-id",
			"message": error_send 
		}); 
		return;			
	}
	
	if(data_api_resuilt.error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			data_api_resuilt, 
			"Lỗi lấy api" 
		);
		res.send({ 
			"error" : "99", 
			"position":"controller->web-discount-program->discount_program_store-id",
			"message": error_send 
		}); 
		return;
	}		
	



		
	//@
	try {

		datas_info = {
			'title' 				: 'Danh sách tùy chọn',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: data_api_resuilt[3][0].stores_user_id,
			'store_id'				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_discount_program',		
			'store_list' 			: data_api_resuilt[3],
			'news_bussiness_menu' 	: data_api_resuilt[1],
			'list_data_count' 		: data_api_resuilt[2],
			'service_type_name' 	: data_api_resuilt[3][0].service_type_name,
			'store_name' 			: data_api_resuilt[3][0].stores_name,			
			
			'discount_program_list' : data_api_resuilt[4],
			'discount_program_details_list' : data_api_resuilt[5],
			'discount_program_product_list' : data_api_resuilt[6],			
		}
		
		
		data_send = {
			'title' 				: 'Danh sách tùy chọn',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_role'  			: ojs_shares_others.get_users_type(token),
			'user_id' 				: data_api_resuilt[3][0].stores_user_id,
			'store_id'				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_discount_program',		
			'store_list' 			: data_api_resuilt[3],
			'news_bussiness_menu' 	: data_api_resuilt[1],
			'list_data_count' 		: data_api_resuilt[2],
			'service_type_name' 	: data_api_resuilt[3][0].service_type_name,
			'store_name' 			: data_api_resuilt[3][0].stores_name,			
			
			'discount_program_list' : data_api_resuilt[4],
			'discount_program_details_list' : data_api_resuilt[5],
			'discount_program_product_list' : data_api_resuilt[6],		
			
			'datas_info'			: datas_info			
		}
		
		
		//res.send(data_send);
		//return;
		
		res.render( ojs_configs.view_version + '/discount-program/speciality/store-show-all', data_send );
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi data_send" );
			res.send({ "error" : "100","":"", "message": error_send } ); 
			return;		
	}			
};


module.exports = function_export;



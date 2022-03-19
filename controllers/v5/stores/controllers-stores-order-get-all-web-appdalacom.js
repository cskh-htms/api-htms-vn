
const ojs_configs = require('../../../configs/config');
const config_api = require('../../../api/configs/config-api');

const ojs_shares_show_errors = require('../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../shares/ojs-shares-fetch-data');


async  function store_order_get_all(req, res, next) {
	try {
		var token = req.session.token;	
		var store_id = req.params.store_id;
		var status_int = req.params.status_int;		
		
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.send( "vui lòng đăng nhập" );
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
			"position":"controller->bussiness->bussiness_by_user_id",
			"message": error_send 
		}); 
		return;			
	}
	
	//res.send( store_id );
	//return;	
	
	var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_get(
			ojs_configs.domain + '/api/appdalacom/' + 
			config_api.API_APPDALACOM_VERSION + 
			'/stores/manage/orders/' + store_id + 	'/' + status_int, 
			token
		);	
		
	res.send( data_api_resuilt );
	return;	
		
		
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
			"position":"web/controller/bussiness/controllers-bussiness-by-user-id",
			"message": error_send 
		}); 
		return;
	}		
	
	//res.send( [data_api_resuilt[3][0].stores_ID] );
	//return;
	
	//@
	try {

		datas_info = {
			'title' 				: 'Quản lý tài khoản doanh nghiệp',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id' 				: data_api_resuilt[3][0].stores_ID,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			
			'news_bussiness_menu' 	: data_api_resuilt[1],
			'orders_list' 			: data_api_resuilt[7],
			'product_sale'			: data_api_resuilt[4],
			'datas'					: data_api_resuilt[3],
			'product_sale_max'		: data_api_resuilt[5],
			'product_max_detail' 	: data_api_resuilt[6],
			'coupon_data' 			: data_api_resuilt[8],	
		}
		
		
		data_send = {
			'title' 				: 'Quản lý tài khoản doanh nghiệp',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: user_id,
			'store_id' 				: data_api_resuilt[3][0].stores_ID,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			
			'news_bussiness_menu' 	: data_api_resuilt[1],
			'orders_list' 			: data_api_resuilt[7],
			'product_sale'			: data_api_resuilt[4],
			'datas'					: data_api_resuilt[3],
			'product_sale_max'		: data_api_resuilt[5],
			'product_max_detail' 	: data_api_resuilt[6],
			'coupon_data' 			: data_api_resuilt[8],	
			'datas_info'			: datas_info			
		}
	
		res.render( ojs_configs.view_version + '/bussiness/bussiness',  data_send );
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi data_send" );
			res.send({ "error" : "100","":"", "message": error_send } ); 
			return;		
	}			
};


module.exports = store_order_get_all;



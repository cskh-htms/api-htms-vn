
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
			"position":"web-controller-stores-orfer",
			"message": error_send 
		}); 
					
	}
	
	//return res.send( [store_id] );
	//	
	
	var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_get(
			ojs_configs.domain + '/api/appdalacom/' + 
			config_api.API_APPDALACOM_VERSION + 
			'/stores/order?c1=' + store_id + '&c2=' + status_int, 
			token
		);	
		
	//return res.send( [data_api_resuilt] );
	//	
		
		
	if(data_api_resuilt.error){
		if(data_api_resuilt.position == "middle_ware"){
			return res.send("Vui lòng đăng nhập");
			
		}
		
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			data_api_resuilt, 
			"Lỗi lấy api" 
		);
		return res.send({ 
			"error" : "99", 
			"position":"web/controller/bussiness/controllers-bussiness-by-user-id",
			"message": error_send 
		}); 
		
	}		
	
	//return res.send( [data_api_resuilt] );
	//
	
	//@
	try {

		datas_info = {
			'title' 				: 'Quản lý đơn hàng',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),
			'store_id' 				: data_api_resuilt[3][0].stores_ID,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_don_hang',
			'service_type_name' 	: 'speciality',			
			'status_int'			: "all",

			'news_bussiness_menu' 	: data_api_resuilt[1],
			'list_data_count' 		: data_api_resuilt[2],				
			'store_list' 			: data_api_resuilt[3],
			
			'orders_list' 			: data_api_resuilt[4],	
			'order_list_all' 		: data_api_resuilt[5]
		}
		
		//return res.send( [datas_info] );
		//		
		
		
		
		data_send = {
			'title' 				: 'Quản lý đơn hàng',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),
			'store_id' 				: data_api_resuilt[3][0].stores_ID,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_don_hang',
			'service_type_name' 	: 'speciality',			
			'status_int'			: "all",

			'news_bussiness_menu' 	: data_api_resuilt[1],
			'list_data_count' 		: data_api_resuilt[2],				
			'store_list' 			: data_api_resuilt[3],
			
			'orders_list' 			: data_api_resuilt[4],	
			'order_list_all' 		: data_api_resuilt[5],
			'datas_info'			: datas_info			
		}
	
		res.render( ojs_configs.view_version + '/stores/orders',  data_send );
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi data_send" );
			return res.send({ "error" : "100","":"", "message": error_send } ); 
					
	}			
};


module.exports = store_order_get_all;



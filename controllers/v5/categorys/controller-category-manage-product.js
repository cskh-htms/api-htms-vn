//@
//@
//@
//@ start
const ojs_configs = require('../../../configs/config');
const config_api = require('../../../api/configs/config-api');

const ojs_shares_show_errors = require('../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../shares/ojs-shares-fetch-data');




//@
//@
//@
//@ export
async  function function_export(req, res, next) {
	try {
		var token = req.session.token;	
		var store_id = req.params.store_id;
		var category_id = req.params.category_id;
		
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
			"position":"web->controller->categorys->manage->product",
			"message": error_send 
		}); 
		return;			
	}	
	//res.send( [store_id] );
	//return;	
	
	
	
	
	//@
	//@
	//@
	//@ call api
	var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_get(
			ojs_configs.domain + '/api/appdalacom/' + 
			config_api.API_APPDALACOM_VERSION + 
			'/categorys/product?c1=' + category_id + "&c2=" + store_id, 
			token
		);	
		
	//res.send(data_api_resuilt);
	//return;
		
	if(data_api_resuilt.error){		
		if(data_api_resuilt.position == "middle_ware"){
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
			"position":"web->controller->categorys->manage->product",
			"message": error_send 
		}); 
		return;
	}		
	
	//res.send( [data_api_resuilt] );
	//return;
	
	
	
	
	
	//@
	//@
	//@
	//@
	//@ go
	try {

		datas_info = {
			'title' 				: 'Sản phẩm của danh mục ' + data_api_resuilt[5][0].category_general_speciality_name,
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),
			'user_role' 			: ojs_shares_others.get_users_type(token),
			'store_id' 				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_danh_muc',
			'service_type_name' 	: 'speciality',
			
			'news_bussiness_menu' 	: data_api_resuilt[1],
			'list_data_count' 		: data_api_resuilt[2],	
			
			'store_list' 			: data_api_resuilt[3],
			'product_list' 			: data_api_resuilt[6],	
			'category_link_datas' 	: data_api_resuilt[4],
	
		}
	
	
	
		
		data_send = {
			'title' 				: 'Sản phẩm của danh mục ' + data_api_resuilt[5][0].category_general_speciality_name,
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),
			'user_role' 			: ojs_shares_others.get_users_type(token),
			'store_id' 				: store_id,
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'sidebar_type'			: 4,
			'menu_taget'			:'sidebar_danh_muc',
			'service_type_name' 	: 'speciality',
			
			'news_bussiness_menu' 	: data_api_resuilt[1],
			'list_data_count' 		: data_api_resuilt[2],	
			
			'store_list' 			: data_api_resuilt[3],
			'product_list' 			: data_api_resuilt[6],	
			'category_link_datas' 	: data_api_resuilt[4],
			
			'datas_info'			: datas_info			
		}
	
		//res.send(data_send);
		//return;	
	
	
	
		res.render( ojs_configs.view_version + '/categorys/general/speciality/manage-product',  data_send );
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi data_send" );
			res.send({ "error" : "100","":"", "message": error_send } ); 
			return;		
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











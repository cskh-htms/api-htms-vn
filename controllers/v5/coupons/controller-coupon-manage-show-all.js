


//@
//@
//@
//@ file start





//@
//@
//@
//@ config
const ojs_configs = require('../../../configs/config');
const config_api = require('../../../api/configs/config-api');




//@
//@
//@
//@ share
const ojs_shares_show_errors = require('../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../shares/ojs-shares-fetch-data');






//@
//@
//@
//@ function export
async  function function_export(req, res, next) {
	//@
	//@
	//@ any thing error
	try {	

		try {
			var token = req.session.token;	
			var store_id = req.params.store_id;
		
			
			if(token == "" || token == null || token == undefined || token == 'null'){
				return res.send('<p style="text-align:center;">Vui lòng <a href="/login" style="color:blue;">  ĐĂNG NHẬP  </a></p>');
				
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
				"position":"web->controller->coupon->manage->show-all",
				"message": error_send 
			}); 
						
		}		
		//return res.send( [store_id] );
		//	
		
		
		
		
		
		
		
		//@
		//@
		//@ call api			
		var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_get(
				ojs_configs.domain + '/api/appdalacom/' + 
				config_api.API_APPDALACOM_VERSION + 
				'/coupons/show-all?c1=' + store_id, 
				token
			);				
		//return res.send( [data_api_resuilt] );
		//	
			
			
			
			

		//@
		//@
		//@
		//@ check error		    
		if(data_api_resuilt.error){
			if(data_api_resuilt.position =="middle_ware"){
				return res.send('<p style="text-align:center;">Vui lòng <a href="/login" style="color:blue;">  ĐĂNG NHẬP  </a></p>');
				
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
				"position":"web->controller->coupon->manage->show-all",
				"message": error_send 
			}); 
			
		}		
		//return res.send( [data_api_resuilt] );
		//
		
		
		
		
		
		
		
		
		
		
		
		//@
		//@
		//@ call api
		try {


			datas_info = {
				'title' 				: 'Quản lý coupon',
				'users_type' 			: ojs_shares_others.get_users_type(token),
				'user_id' 				: ojs_shares_others.get_users_id(token),
				'store_id'				: store_id,
				'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
				'js_css_version'		: ojs_configs.js_css_version,
				'sidebar_type'			: 4,
				'menu_taget'			:'sidebar_coupon',		
				'store_list' 			: data_api_resuilt[3],
				'news_bussiness_menu' 	: data_api_resuilt[1],
				'list_data_count' 		: data_api_resuilt[2],
				'service_type_name' 	: data_api_resuilt[3][0].service_type_name,
				'store_name' 			: data_api_resuilt[3][0].stores_name,			
				
				'coupon_list' 			: data_api_resuilt[4],			
			}
			
			
			data_send = {
				'title' 				: 'Quản lý coupon',
				'users_type' 			: ojs_shares_others.get_users_type(token),
				'user_id' 				: ojs_shares_others.get_users_id(token),
				'store_id'				: store_id,
				'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
				'js_css_version'		: ojs_configs.js_css_version,
				'sidebar_type'			: 4,
				'menu_taget'			:'sidebar_coupon',		
				'store_list' 			: data_api_resuilt[3],
				'news_bussiness_menu' 	: data_api_resuilt[1],
				'list_data_count' 		: data_api_resuilt[2],
				'service_type_name' 	: data_api_resuilt[3][0].service_type_name,
				'store_name' 			: data_api_resuilt[3][0].stores_name,			
				
				'coupon_list' 			: data_api_resuilt[4],			
				'datas_info'			: datas_info			
			}
		
			//return res.send(data_send);
			//
		
			res.render( ojs_configs.view_version + '/coupon/speciality/manage-show-all', data_send );
		
		
		//@
		//@
		}
		catch(error){
				var evn = ojs_configs.evn;
				////evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi data_send" );
				return res.send({ "error" : "100","":"", "message": error_send } ); 
						
		}			
	//@
	//@
	//@ catch error all		
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"Lỗi không xác định. Vui lòng liên hệ bộ phận kỹ thuật hoặc  thao tác lại" 
		);
		return res.send({ 
			"error" : "1000", 
			"position":"web->controller->coupon->manage->show-all",
			"message": error_send 
		}); 
					
	}
	
	
	
	//@
	//@
	//@ send error when not return data
	return res.send({ 
		"error" : "2000", 
		"position":"web->controller->coupon->manage->show-all",
		"message": "Lỗi không có data return, Lỗi này khi không có dữ liệu return, Vui lòng liên hệ bộ phận kỹ thuật, hoặc thao tác lại" 
	}); 
		
	
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




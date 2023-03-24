//@
//@
//@
//@
//@ file start




//@
//@
//@
//@
//@ configs
const ojs_configs = require('../../../../configs/config');
const config_api = require('../../../../api/configs/config-api');




//@
//@
//@
//@
//@ share
const ojs_shares_show_errors = require('../../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../../shares/ojs-shares-fetch-data');




//@
//@
//@
//@
//@ function export
async  function function_export(req, res, next) {
	//@
	//@
	//@ any thing error
	try {	


		//@
		//@
		//@ lấy data req		
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
				"position":"web->appdalacom->controllers->admin->options->add",
				"message": error_send 
			}); 
						
		}	
		//return res.send( [store_id] );
		//	
		
		
		
		
		//@
		//@
		//@
		//@ call api
		var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_get(
				ojs_configs.domain + '/api/appdalacom/' + 
				config_api.API_APPDALACOM_VERSION + 
				'/admin/options/add?c1=' + store_id, 
				token
			);	
		//return res.send(data_api_resuilt);
		//
		
		
		
		
		//@
		//@
		//@
		//@ check error	
		if(data_api_resuilt.error){		
			if(data_api_resuilt.position == "middle_ware"){
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
				"position":"web->appdalacom->controllers->admin->options->add",
				"message": error_send 
			}); 
			
		}		
		//return res.send( [data_api_resuilt] );
		//
		
		
		
		
		
		
		//@
		//@
		//@
		//@ send browser
		try {

			datas_info = {
				'title' 				: 'Tạo thương hiệu',
				'users_type' 			: ojs_shares_others.get_users_type(token),
				'user_id' 				: ojs_shares_others.get_users_id(token),
				'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
				'js_css_version'		: ojs_configs.js_css_version,
				'service_type_name'		: "speciality",
				'store_id'				: store_id,
				
				'menu_taget'			: "sidebar_category",
				'sidebar_type'			: "",				
				'news_admin_menu' 		: data_api_resuilt[1],
				'option_list'			: data_api_resuilt[2],
				
			}
				
			
			data_send = {
				'title' 				: 'Tạo thương hiệu',
				'users_type' 			: ojs_shares_others.get_users_type(token),
				'user_id' 				: ojs_shares_others.get_users_id(token),
				'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
				'js_css_version'		: ojs_configs.js_css_version,
				'service_type_name'		: "speciality",
				'store_id'				: store_id,
				
				'menu_taget'			: "sidebar_category",
				'sidebar_type'			: "",				
				'news_admin_menu' 		: data_api_resuilt[1],
				'option_list'			: data_api_resuilt[2],
				
				'datas_info'			: datas_info			
			}
		
		
			//return res.send(data_send);
			//
		
		
			res.render( ojs_configs.view_version + '/options/speciality/admin-add',  data_send );
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
			"position":"web->appdalacom->controllers->admin->options->add",
			"message": error_send 
		}); 
					
	}
	
	
	
	//@
	//@
	//@ send error when not return data
	return res.send({ 
		"error" : "2000", 
		"position":"web->appdalacom->controllers->admin->options->add",
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




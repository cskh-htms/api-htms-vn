


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
			var discount_program_id = req.params.discount_program_id;
			
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
				"position":"web->discount-program->manage->product->add",
				"message": error_send 
			}); 
						
		}
		
		//return res.send(["sdfsdfsdf"]);
		//	
		
		
		
		
		
		//@
		//@
		//@
		//@ go api
		try {
			var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_get(
					ojs_configs.domain + 
					'/api/appdalacom/' + 
					config_api.API_APPDALACOM_VERSION + 
					'/discount-program/product/add?c1=' + 
					discount_program_id + "&c2=" +
					store_id,
					token
				);	
			//return res.send( data_api_resuilt );
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
				"position":"web->discount-program->manage->product->add",
				"message": error_send 
			}); 
						
		}
		
		
		
		
		
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
				"position":"web->discount-program->manage->product->add",
				"message": error_send 
			}); 
			
		}		
		//return res.send( [data_api_resuilt] );
		//
		
		
		
		
		
		
			
		//@
		try {

			datas_info = {
				'title' 				: 'Cửa hàng tham gia chương trình khuyến mãi',
				'users_type' 			: ojs_shares_others.get_users_type(token),
				'user_role'  			: ojs_shares_others.get_users_type(token),
				'user_id' 				: data_api_resuilt[3][0].stores_user_id,
				'store_id'				: store_id,
				'discount_program_id'	: discount_program_id,
				'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
				'js_css_version'		: ojs_configs.js_css_version,
				'sidebar_type'			: 4,
				'menu_taget'			:'sidebar_discount_program',
				
				'news_bussiness_menu' 	: data_api_resuilt[1],
				'list_data_count' 		: data_api_resuilt[2],			
				
				'service_type_name' 	: "speciality",
				'store_name' 			: data_api_resuilt[3][0].stores_name,	
				'store_list' 			: data_api_resuilt[3],
				'discount_tager'		: data_api_resuilt[4],
				'products_list'			: data_api_resuilt[5]			
			}
			
			
			data_send = {
				'title' 				: 'Cửa hàng tham gia chương trình khuyến mãi',
				'users_type' 			: ojs_shares_others.get_users_type(token),
				'user_role'  			: ojs_shares_others.get_users_type(token),
				'user_id' 				: data_api_resuilt[3][0].stores_user_id,
				'store_id'				: store_id,
				'discount_program_id'	: discount_program_id,
				'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
				'js_css_version'		: ojs_configs.js_css_version,
				'sidebar_type'			: 4,
				'menu_taget'			:'sidebar_discount_program',
				
				'news_bussiness_menu' 	: data_api_resuilt[1],
				'list_data_count' 		: data_api_resuilt[2],			
				
				'service_type_name' 	: "speciality",
				'store_name' 			: data_api_resuilt[3][0].stores_name,	
				'store_list' 			: data_api_resuilt[3],
				'discount_tager'		: data_api_resuilt[4],
				'products_list'			: data_api_resuilt[5],				
				
				'datas_info'			: datas_info			
			}
			
			
			//return res.send(data_send);
			//
			
			res.render( ojs_configs.view_version + '/discount-program/speciality/manage-product-add', data_send );	
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
			"position":"web->discount-program->manage->product->add",
			"message": error_send 
		}); 
					
	}
	
	
	
	//@
	//@
	//@ send error when not return data
	return res.send({ 
		"error" : "2000", 
		"position":"web->discount-program->manage->product->add",
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

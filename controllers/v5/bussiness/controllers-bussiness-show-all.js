


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
			var user_id = req.params.user_id;				
			if(token == "" || token == null || token == undefined || token == 'null'){
				'<p style="text-align:center;">Vui lòng <a href="/login" style="color:blue;">  ĐĂNG NHẬP  </a></p>'
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
				"position":"web->controller->bussiness->show-all",
				"message": error_send 
			}); 
			return;			
		}		
		//res.send( user_id );
		//return;	
		
		
		
		
		
		
		
		var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_get(
				ojs_configs.domain + 
				'/api/appdalacom/' + 
				config_api.API_APPDALACOM_VERSION + 
				'/bussiness/show-all?c1=' + user_id, 
				token
			);	
			
		//res.send( [data_api_resuilt]);
		//return;				
			
			
			
			
			
			

		//@
		//@
		//@ check error		
		if(data_api_resuilt.error){		
			if(data_api_resuilt.position =="middle_ware"){
				res.send({"error":"01","message":"Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại"});
				return;
			}		
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				data_api_resuilt, 
				data_api_resuilt.message
			);
			res.send({ 
				"error" : "99", 
				"position":"web->controller->bussiness->show-all",
				"message": error_send 
			}); 
			return;
		}		
		
		//res.send( [data_api_resuilt] );
		//return;
		
		
		
		
		
		//@
		try {

			datas_info = {
				'title' 				: 'Quản lý tài khoản doanh nghiệp',
				'users_type' 			: ojs_shares_others.get_users_type(token),
				'user_id' 				: user_id,
				'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
				'js_css_version'		: ojs_configs.js_css_version,
				
				'datas'					: data_api_resuilt[1],
				'product_sale'			: data_api_resuilt[2],
				'order_list'			: data_api_resuilt[3],
				'order_list2'			: data_api_resuilt[4],
			}
			
			
			data_send = {
				'title' 				: 'Quản lý tài khoản doanh nghiệp',
				'users_type' 			: ojs_shares_others.get_users_type(token),
				'user_id' 				: user_id,
				'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
				'js_css_version'		: ojs_configs.js_css_version,
				
				'datas'					: data_api_resuilt[1],
				'product_sale'			: data_api_resuilt[2],
				'order_list'			: data_api_resuilt[3],
				'order_list2'			: data_api_resuilt[4],
				'datas_info'			: datas_info			
			}
		
		
			//res.send( [data_send] );
			//return;	
		
		
			res.render( ojs_configs.view_version + '/bussiness/admin-show-all',  data_send );
		}
		catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi data_send" );
				res.send({ "error" : "100","":"", "message": error_send } ); 
				return;		
		}	

		
	//@
	//@
	//@ catch error all		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"Lỗi không xác định. Vui lòng liên hệ bộ phận kỹ thuật hoặc  thao tác lại" 
		);
		res.send({ 
			"error" : "1000", 
			"position":"web->controller->bussiness->show-all",
			"message": error_send 
		}); 
		return;			
	}
	
	
	
	//@
	//@
	//@ send error when not return data
	res.send({ 
		"error" : "2000", 
		"position":"web->controller->bussiness->show-all",
		"message": "Lỗi không có data return, Lỗi này khi không có dữ liệu return, Vui lòng liên hệ bộ phận kỹ thuật, hoặc thao tác lại" 
	}); 
	return;	
	
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













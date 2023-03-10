
const ojs_configs = require('../../../configs/config');
const config_api = require('../../../api/configs/config-api');

const ojs_shares_show_errors = require('../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../shares/ojs-shares-fetch-data');


async  function function_export(req, res, next) {
	try {
		var token = req.session.token;	
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
			"position":"controller->bo-cong-thuong",
			"message": error_send 
		}); 
		return;			
	}
	
	//res.send( [token] );
	//return;	
	
	var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_get(
			ojs_configs.domain + '/api/appdalacom/' + 
			config_api.API_APPDALACOM_VERSION + 
			'/bo-cong-thuong/', 
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
			"position":"controller->bo-cong-thuong",
			"message": error_send 
		}); 
		return;
	}		
	
	//res.send( data_api_resuilt[0][1] );
	//return;
	
	//@
	try {

		datas_info = {
			'title' 				: 'Báo cáo bộ công thương',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'store_all'				: data_api_resuilt[0][1],
			'store_new'				: data_api_resuilt[0][2],
			
			'product_all'			: data_api_resuilt[0][3],
			'product_new'			: data_api_resuilt[0][4],
			
			'order_all'				: data_api_resuilt[0][5],
			'order_ok'				: data_api_resuilt[0][6],
			
			
		}
		
		
		data_send = {
			'title' 				: 'Báo cáo bộ công thương',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,	
			'store_all'				: data_api_resuilt[0][1],
			'store_new'				: data_api_resuilt[0][2],
			
			'product_all'			: data_api_resuilt[0][3],
			'product_new'			: data_api_resuilt[0][4],
			
			'order_all'				: data_api_resuilt[0][5],
			'order_ok'				: data_api_resuilt[0][6],
			
			'datas_info'			: datas_info			
		}
	
		//res.send(data_send);
		//return;
		
		res.render( ojs_configs.view_version + '/users/bo-cong-thuong',  data_send );
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
//@ enf of file











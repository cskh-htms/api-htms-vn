
const ojs_configs = require('../../../configs/config');
const config_api = require('../../../api/configs/config-api');

const ojs_shares_show_errors = require('../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../shares/ojs-shares-fetch-data');


async  function function_export(req, res, next) {
	try {
		var token = req.session.token;	
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
	
	//res.send( [data_api_resuilt[3][0].stores_ID] );
	//return;
	
	//@
	try {

		datas_info = {
			'title' 				: 'Báo cáo bộ công thương',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
		}
		
		
		data_send = {
			'title' 				: 'Báo cáo bộ công thương',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,		
			'datas_info'			: datas_info			
		}
	
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











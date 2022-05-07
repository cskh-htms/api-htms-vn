
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
			"position":"controller->notes-ajax-load-user-admin",
			"message": error_send 
		}); 
		return;			
	}
	
	//res.send( [token] );
	//return;	
	
	var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_get(
			ojs_configs.domain + '/api/appdalacom/' + config_api.API_APPDALACOM_VERSION + '/notes/ajax-load-user/', 
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
			"position":"controller->notes-ajax-load-user-admin",
			"message": error_send 
		}); 
		return;
	}		
	
	//res.send([data_api_resuilt]);
	//return;
	
	//@
	try {

		//
		//@
		data_send = {
			'datas'		: data_api_resuilt[1]
		}
		//res.send(data_send);
		//return;
		
		
		
		res.render( ojs_configs.view_version + '/masterpage/widget-notes-show-users', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			data_api_resuilt, 
			"Lỗi send data" 
		);
		res.send({ 
			"error" : "99", 
			"position":"controller->notes-ajax-load-user-admin",
			"message": error_send 
		}); 
		return;
	}			
};


module.exports = function_export;



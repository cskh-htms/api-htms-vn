
const ojs_configs = require('../../../configs/config');
const config_api = require('../../../api/configs/config-api');

const ojs_shares_show_errors = require('../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../shares/ojs-shares-fetch-data');


async  function function_export(req, res, next) {
	try {
		var token = req.session.token;	
		var datas  = req.body.datas;
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
			"position":"controller->bo-cong-thuong-load",
			"message": error_send 
		}); 
					
	}
	
	//return res.send( ["sdfsfsdf"] );
	//	
	
	var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/appdalacom/' + 
			config_api.API_APPDALACOM_VERSION + 
			'/bo-cong-thuong/ajax-load', 
			datas,
			token
		);	
		
	//return res.send( [data_api_resuilt] );
	//	
		
		
	//@
	//@
	//@ check error		
	if(data_api_resuilt.error){		
		if(data_api_resuilt.position =="middle_ware"){
			return res.send({"error":"01","message":"Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại"});
			
		}		
		
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			data_api_resuilt, 
			data_api_resuilt.message
		);
		return res.send({ 
			"error" : "99", 
			"position":"web->controller->bo-cong-thuong-load",
			"message": error_send 
		}); 
		
	}	
	
	//return res.send( data_api_resuilt[0][1] );
	//
	
	//@
	try {
		data_send = {
			'store_all'				: data_api_resuilt[0][1],
			'store_new'				: data_api_resuilt[0][2],
			
			'product_all'			: data_api_resuilt[0][3],
			'product_new'			: data_api_resuilt[0][4],
			
			'order_all'				: data_api_resuilt[0][5],
			'order_ok'				: data_api_resuilt[0][6],
			'order_no_ok'			: data_api_resuilt[0][7],
			'total_sale'			: data_api_resuilt[0][8],	
			'traffic'				: data_api_resuilt[0][9],			
		}
	
		//return res.send(data_send);
		//
		
		res.render( ojs_configs.view_version + '/masterpage/widget-bo-cong-thuong',  data_send );
	}
	catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi data_send" );
			return res.send({ "error" : "100","":"", "message": error_send } ); 
					
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











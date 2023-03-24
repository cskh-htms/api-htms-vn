
const ojs_configs = require('../../../configs/config');
const config_api = require('../../../api/configs/config-api');

const ojs_shares_show_errors = require('../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../shares/ojs-shares-fetch-data');


async  function update_review(req, res, next) {
	try {
		var token = req.session.token;	
		var review_id = req.params.review_id;
		var datas  = req.body;
		
		//return res.send({"error":"","datas":datas});
		//
		
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
			"position":"web->controller->reviews->update",
			"message": error_send 
		}); 
					
	}
	
	var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_put(
			ojs_configs.domain + '/api/appdalacom/' + config_api.API_APPDALACOM_VERSION + '/reviews/update/' + review_id, 
			datas,
			token
		);	
		
	return res.send({"error":"","sa":data_api_resuilt});
	
		
	if(data_api_resuilt.error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			data_api_resuilt, 
			"Lỗi lấy api" 
		);
		return res.send({ 
			"error" : "99", 
			"position":"web->controller->reviews->update",
			"message": error_send 
		}); 
		
	}		
	
	return res.send({"error":"","datas":data_api_resuilt});
	

};


module.exports = update_review;



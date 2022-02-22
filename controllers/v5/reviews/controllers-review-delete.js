
const ojs_configs = require('../../../configs/config');
const config_api = require('../../../api/configs/config-api');

const ojs_shares_show_errors = require('../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../shares/ojs-shares-fetch-data');


async  function delete_review(req, res, next) {
	try {
		var token = req.session.token;	
		var review_id = req.params.review_id;
		
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.send( "vui lòng đăng nhập" );
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"Lỗi lấy req" 
		);
		res.send({ 
			"error" : "1", 
			"position":"web->controller->reviews->delete",
			"message": error_send 
		}); 
		return;			
	}
	
	var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_delete(
			ojs_configs.domain + '/api/appdalacom/' + config_api.API_APPDALACOM_VERSION + '/reviews/delete-review/' + review_id, 
			token
		);	
		

		
	if(data_api_resuilt.error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			data_api_resuilt, 
			"Lỗi lấy api" 
		);
		res.send({ 
			"error" : "99", 
			"position":"web->controller->reviews->delete",
			"message": error_send 
		}); 
		return;
	}		
	
	res.send({"error":"","datas":data_api_resuilt});
	return;

};


module.exports = delete_review;


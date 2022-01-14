
const ojs_configs = require('../../../configs/config');
const config_api = require('../../../api/configs/config-api');

const ojs_shares_show_errors = require('../../../shares/ojs-shares-show-errors');
const ojs_shares_fetch_data = require('../../../shares/ojs-shares-fetch-data');


async  function bussiness_by_user_id(req, res, next) {
	try {
		var token = req.session.token;	
		var user_id = req.params.user_id;	
		//res.send(user_id);
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
			"position":"controller->bussiness->bussiness_by_user_id",
			"message": error_send 
		}); 
		return;			
	}
	

	try {
		var data_api_resuilt = await ojs_shares.get_data_send_token_get(
			ojs_configs.domain + '/api/appdalacom/' + config_api.API_APPDALACOM_VERSION + '/bussiness/115', 
			token
		);	
		
		res.send( [data_api_resuilt] );
		return;
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers users web -> show all -> get req -> 1", "message": error_send } ); 
		return;		
	}

};


module.exports = bussiness_by_user_id;



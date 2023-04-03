const express = require('express');
const router = express.Router();



const ojs_configs = require('../../../../configs/config');
const config_database = require('../../../configs/config-database');
const config_api = require('../../../configs/config-api');

const ojs_shares_show_errors = require('../../../shares/' + 
	config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
	
const ojs_shares_others = require('../../../shares/' + 
	config_api.API_SHARES_VERSION + '/ojs-shares-others.js');

const ojs_shares_fetch_data = require('../../../shares/' + 
	config_api.API_SHARES_VERSION + '/ojs-shares-fetch-data');




//@
//@
//@
//@
//@ function-export
async  function update_reviews_spaciality_web(req, res, next) {

	//@ lấy req data
	try {
		var all_files = req.files;
		var datas = req.body;
		var token = req.headers['token'];
		var review_id = req.params.review_id
		//return res.send([all_files,datas,review_id,token]);
		//
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request, Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "ctl-review->update_app-client",
			"message": error_send 
		}); 
			
	}
	//@
	//@
	//@ call api			
	var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_put(
			ojs_configs.domain + '/api/web/' + 
			config_api.API_APPDALACOM_VERSION + 
			'/reviews/speciality/update-web/' + review_id, 
			datas,
			token
		);				
	return res.send( data_api_resuilt );	
	
}

module.exports = { 
	update_reviews_spaciality_web
};
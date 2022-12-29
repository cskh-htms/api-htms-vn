
const ojs_configs = require('../../../../configs/config');
const config_api = require('../../../../api/configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../../shares/ojs-shares-fetch-data');


async  function function_export(req, res, next) {
	try {
		var token = req.session.token;	
		var brand_id = req.params.brand_id;
		var datas = req.body.datas;
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.send({"error":"01","message":"Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại"});
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
			"position":"controllers-admin-/brand/update",
			"message": error_send 
		}); 
		return;			
	}
	
	//res.send(datas);
	//return;	
	
	


	//@
	//@
	//@
	try {
		var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_post(
				ojs_configs.domain + 
				'/api/appdalacom/' + 
				config_api.API_APPDALACOM_VERSION + 
				'/admin/brands/update?c1=' + brand_id,
				datas,
				token
			);	
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
			"error" : "2", 
			"position":"controllers-admin-/brand/update",
			"message": error_send 
		}); 
		return;			
	}
	
	
	
	if(data_api_resuilt.error){
		if(data_api_resuilt.position =="middle_ware"){
			res.send({"error":"10","message":"Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại"});
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
			"position":"controllers-admin-/brand/update",
			"message": error_send 
		}); 
		return;
	}		

	res.send(data_api_resuilt);
	return;
	
};


module.exports = function_export;



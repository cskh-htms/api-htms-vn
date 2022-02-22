
const ojs_configs = require('../../../configs/config');
const config_api = require('../../../api/configs/config-api');

const ojs_shares_show_errors = require('../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../shares/ojs-shares-fetch-data');


async  function product_store_delete(req, res, next) {
	try {
		var token = req.session.token;	
		var product_id = req.params.product_id;
		
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
			"position":"web/controller/products/controllers-products-store-delete",
			"message": error_send 
		}); 
		return;			
	}
	
	//res.send( token );
	//return;	
	try {
		var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_delete(
				ojs_configs.domain + '/api/appdalacom/' + config_api.API_APPDALACOM_VERSION + '/products/speciality/store-delete/' + product_id,	
				token
			);	
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
			"error" : "2", 
			"position":"web/controller/products/controllers-products-store-delete",
			"message": error_send 
		}); 
		return;			
	}
	
	if(data_api_resuilt.error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			data_api_resuilt, 
			data_api_resuilt.message
		);
		res.send({ 
			"error" : "99", 
			"position":"web/controller/products/controllers-products-store-delete",
			"message": error_send 
		}); 
		return;
	}		
	
	//@ send 
	res.send({"error":"","datas":data_api_resuilt});
	return;
			
};


module.exports = product_store_delete;



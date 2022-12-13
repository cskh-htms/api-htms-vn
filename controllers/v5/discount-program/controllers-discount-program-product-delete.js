




//@
//@
//@
//@ file start



const ojs_configs = require('../../../configs/config');
const config_api = require('../../../api/configs/config-api');

const ojs_shares_show_errors = require('../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../shares/ojs-shares-fetch-data');





//@
//@
//@
//@ export
async  function function_export(req, res, next) {
	try {
		var token = req.session.token;	
		var discount_program_product_link_id = req.params.discount_program_product_link_id;
		
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
			"position":"web->controller->discount-product-delete",
			"message": error_send 
		}); 
		return;			
	}
	
	//res.send( [ "fff" ] );
	//return;	
	
	var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_get(
			ojs_configs.domain + '/api/appdalacom/' + config_api.API_APPDALACOM_VERSION + '/discount-program/speciality/product-delete?c1=' + 
			discount_program_product_link_id,
			token
		);	
		
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
			"position":"web->controller->discount-product-delete",
			"message": error_send 
		}); 
		return;
	}
	res.send({"error":"","datas":data_api_resuilt});
	return;
		
};




//@
//@
//@
//@ export
module.exports = function_export;









//@
//@
//@
//@ file end











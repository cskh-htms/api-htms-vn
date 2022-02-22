
const ojs_configs = require('../../../configs/config');
const config_api = require('../../../api/configs/config-api');

const ojs_shares_show_errors = require('../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../shares/ojs-shares-fetch-data');


async  function ajax_products_list_table_admin(req, res, next) {
	
	
			
	
	try {
		var token = req.session.token;	
		var datas  = req.body;
		
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
			"position":"web/controller->products->ajax-product-list-table-admin",
			"message": error_send 
		}); 
		return;			
	}
	
	
	//@ get api
	var datas = 
	{
		"datas":datas		
	}
	
	//@ get data 
	try {
		var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_post(
				ojs_configs.domain + '/api/appdalacom/' + config_api.API_APPDALACOM_VERSION + '/products/speciality/ajax-proructs-list-table-admin/', 
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
			"position":"web/controller->products->ajax-product-list-table-admin",
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
			"Lỗi lấy api" 
		);
		res.send({ 
			"error" : "99", 
			"position":"web/controller->products->ajax-product-list-table-admin",
			"message": error_send 
		}); 
		return;
	}		
	

	//@
	try {
		data_send = {
			"products_list" 		: data_api_resuilt[3],
			"category_link_datas" 	: data_api_resuilt[1],	
			"product_count_all"		: data_api_resuilt[2],				
		}
		
		res.render( ojs_configs.view_version + '/masterpage/widget-product-speciality-show-tables-v5-table-admin', data_send );
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			data_api_resuilt, 
			"Lỗi data send" 
		);
		res.send({ 
			"error" : "100", 
			"position":"web/controller->products->ajax-product-list-table-admin",
			"message": error_send 
		}); 
		return;	
	}			
};


module.exports = ajax_products_list_table_admin;



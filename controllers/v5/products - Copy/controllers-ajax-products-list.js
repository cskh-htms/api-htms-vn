//@
//@
//@
//@ file start





//@
//@
//@
//@ config
const ojs_configs = require('../../../configs/config');
const config_api = require('../../../api/configs/config-api');





//@
//@
//@
//@ config
const ojs_shares_show_errors = require('../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../shares/ojs-shares-fetch-data');





//@
//@
//@
//@ function export
async  function function_export(req, res, next) {	
	//@
	//@
	//@ any thing error
	try {	
		//@
		//@
		//@ lấy data req	
		try {
			var token = req.session.token;	
			var datas  = req.body;
			var user_id = datas.user_id;
			var store_id = datas.store_id;
			
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
				"position":"web->controllers->products->ajax-product-list",
				"message": error_send 
			}); 
			return;			
		}
		
		
		//@ get api
		var datas = 
		{
			"store_id":store_id,
			"user_id":user_id,
			"datas":datas		
		}
		
		//@ get data 
		try {
			var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_post(
					ojs_configs.domain + '/api/appdalacom/' + config_api.API_APPDALACOM_VERSION + '/products/speciality/ajax-proructs-list/', 
					datas,
					token
				);	
				
				//res.send([data_api_resuilt]);
				//return;
				
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
				"position":"web->controllers->products->ajax-product-list",
				"message": error_send 
			}); 
			return;			
		}
		
		
		
		
		
		//@
		//@
		//@ check error		
		if(data_api_resuilt.error){			
			if(data_api_resuilt.position =="middle_ware"){
				res.send('<p style="text-align:center;">Vui lòng <a href="/login" style="color:blue;">  ĐĂNG NHẬP  </a></p>');
				return;
			}					
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				data_api_resuilt, 
				data_api_resuilt.message
			);
			res.send({ 
				"error" : "99", 
				"position":"web->controllers->products->ajax-product-list",
				"message": error_send 
			}); 
			return;
		}
		//res.send([data_api_resuilt]);
		//return;				
		

		//@
		try {
			data_send = {
				"products_list" 		: data_api_resuilt[3],
				"category_link_datas" 	: data_api_resuilt[1],	
				"product_count_all"		: data_api_resuilt[2],				
			}
			
			
			//res.send(data_send);
			//return;
			
			
			
			res.render( ojs_configs.view_version + '/masterpage/widget-product-speciality-show-tables-v5', data_send );
		}
		catch(error){
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi data_send" );
				res.send({ "error" : "100","":"", "message": error_send } ); 
				return;		
		}	

		
	//@
	//@
	//@ catch error all		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"Lỗi không xác định. Vui lòng liên hệ bộ phận kỹ thuật hoặc  thao tác lại" 
		);
		res.send({ 
			"error" : "1000", 
			"position":"web->controllers->products->ajax-product-list",
			"message": error_send 
		}); 
		return;			
	}
	
	
	
	//@
	//@
	//@ send error when not return data
	res.send({ 
		"error" : "2000", 
		"position":"web->controllers->products->ajax-product-list",
		"message": "Lỗi không có data return, Lỗi này khi không có dữ liệu return, Vui lòng liên hệ bộ phận kỹ thuật, hoặc thao tác lại" 
	}); 
	return;	
	
};





//@
//@
//@
//@
//@ export
module.exports = function_export;







//@
//@
//@
//@
//@ file end
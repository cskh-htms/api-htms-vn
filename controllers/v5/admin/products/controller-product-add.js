


//@
//@
//@
//@ file start




//@
//@
//@
//@ file config
const ojs_configs = require('../../../../configs/config');
const config_api = require('../../../../api/configs/config-api');





//@
//@
//@
//@ file share
const ojs_shares_show_errors = require('../../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../../shares/ojs-shares-fetch-data');






//@
//@
//@
//@ exort function
async  function function_export(req, res, next) {
	//@
	//@
	//@ any thing error
	try {	
		//@
		//@
		//@ lấy data req
		try {
			var store_id = req.params.store_id;//id cửa hàng
			var user_id = req.params.user_id;//id cửa hàng	
			var token = req.session.token;
			
			if(token == "" || token == null || token == undefined || token == 'null'){
				res.send('<p style="text-align:center;">Vui lòng <a href="/login" style="color:blue;">  ĐĂNG NHẬP  </a></p>');
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
				"position":"api->appdalacom->controllers->admin->products->add",
				"message": error_send 
			}); 
			return;			
		}		
		//res.send( token );
		//return;	
		
		
		
		var datas =  {		
			"datas":{
				"products_speciality_name":"bản nháp",
				"products_speciality_store_id":store_id,
				"products_speciality_price":0,
				"products_speciality_weight": 100
			},
			"cat_string":"[87]"
		}		
		
		
		
		
		try {
			var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_post(
					ojs_configs.domain + '/api/appdalacom/' + 
					config_api.API_APPDALACOM_VERSION + 
					'/admin/products/add',
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
				"position":"api->appdalacom->controllers->admin->products->add",
				"message": error_send 
			}); 
			return;			
		}		
		res.send(data_api_resuilt);
		return;
		
		
		
		
		//@
		//@
		//@ check error		
		if(data_api_resuilt.error){		
			if(data_api_resuilt.position =="middle_ware"){
				res.send({"error":"01","message":"Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại"});
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
				"position":"api->appdalacom->controllers->admin->products->add",
				"message": error_send 
			}); 
			return;
		}	
		
		
		
		
		
		
		
		
		//@ send 
		res.send({"error":"","datas":data_api_resuilt});
		return;
			

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
			"position":"api->appdalacom->controllers->admin->products->add",
			"message": error_send 
		}); 
		return;			
	}
	
	
	
	//@
	//@
	//@ send error when not return data
	res.send({ 
		"error" : "2000", 
		"position":"api->appdalacom->controllers->admin->products->add",
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
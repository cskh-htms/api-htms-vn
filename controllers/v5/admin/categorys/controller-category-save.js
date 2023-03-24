//@
//@
//@
//@
//@ file start




//@
//@
//@
//@
//@ configs
const ojs_configs = require('../../../../configs/config');
const config_api = require('../../../../api/configs/config-api');





//@
//@
//@
//@
//@ share
const ojs_shares_show_errors = require('../../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../../shares/ojs-shares-fetch-data');








//@
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
			if(token == "" || token == null || token == undefined || token == 'null'){
				return res.send({"error":"01","message":"Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại"});
				
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
				"position":"web->appdalacom->controllers->admin->categorys->save",
				"message": error_send 
			}); 
						
		}		
		//return res.send({"error":"00","message":[datas]});
		//	
		
		
		
		
		
		//@
		//@
		//@ call api
		var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_post(
				ojs_configs.domain + '/api/appdalacom/' + 
				config_api.API_APPDALACOM_VERSION + 
				'/admin/categorys/save',
				datas,
				token
			);	
			
		//return res.send( data_api_resuilt );
		//			
			
			
			
			
			
		//@
		//@
		//@ check error		
		if(data_api_resuilt.error){		
			if(data_api_resuilt.position =="middle_ware"){
				return res.send({"error":"01","message":"Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại"});
				
			}		
			
			var evn = ojs_configs.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				data_api_resuilt, 
				data_api_resuilt.message
			);
			return res.send({ 
				"error" : "99", 
				"position":"web->appdalacom->controllers->admin->categorys->save",
				"message": error_send 
			}); 
			
		}
		
		
		
		
		
		//@
		//@
		//@ send data resuilt		
		return res.send({"error":"","datas":data_api_resuilt});
			
		
		
	//@
	//@
	//@ catch error all		
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"Lỗi không xác định. Vui lòng liên hệ bộ phận kỹ thuật hoặc  thao tác lại" 
		);
		return res.send({ 
			"error" : "1000", 
			"position":"web->appdalacom->controllers->admin->categorys->save",
			"message": error_send 
		}); 
					
	}
	
	
	
	//@
	//@
	//@ send error when not return data
	return res.send({ 
		"error" : "2000", 
		"position":"web->appdalacom->controllers->admin->categorys->save",
		"message": "Lỗi không có data return, Lỗi này khi không có dữ liệu return, Vui lòng liên hệ bộ phận kỹ thuật, hoặc thao tác lại" 
	}); 
		
	
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







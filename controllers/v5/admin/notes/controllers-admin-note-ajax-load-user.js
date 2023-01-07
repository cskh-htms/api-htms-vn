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
				"position":"web->appdalacom->controllers->admin->notes->ajax-load-user",
				"message": error_send 
			}); 
			return;			
		}		
		//res.send({"error":"00","message":[user_id,datas]});
		//return;	
		
		
		
		
		
		//@
		//@
		//@ call api
		var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_get(
				ojs_configs.domain + '/api/appdalacom/' + 
				config_api.API_APPDALACOM_VERSION + 
				'/admin/notes/ajax-load-user',
				token
			);	
			
		//res.send( data_api_resuilt );
		//return;			
			
			
			
			
			
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
				"position":"web->appdalacom->controllers->admin->notes->ajax-load-user",
				"message": error_send 
			}); 
			return;
		}
		
		
		
		
		
		//@
		//@
		//@ send to web	
		data_send = {
			'datas' 	: 	data_api_resuilt[1],
		}
		res.render( ojs_configs.view_version + '/masterpage/widget-notes-show-users', data_send );	



		
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
			"position":"web->appdalacom->controllers->admin->notes->ajax-load-user",
			"message": error_send 
		}); 
		return;			
	}
	
	
	
	//@
	//@
	//@ send error when not return data
	res.send({ 
		"error" : "2000", 
		"position":"web->appdalacom->controllers->admin->notes->ajax-load-user",
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







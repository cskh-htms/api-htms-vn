//@
//@
//@
//@
//@ file start
const multer = require('multer');
const WPAPI = require( 'wpapi' );



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

const check_role = require('../../../../api/shares/' + config_api.API_SHARES_VERSION + '/check-role');



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
			var fileName = req.file.originalname;
			var user_id = req.params.user_id;
			
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
				"position":"web->appdalacom->controllers->uploads->save",
				"message": error_send 
			}); 
						
		}		
		//return res.send({"error":"00","message":[filebuffer]});
		//	
		
		
		
		
		//@
		//@
		//@ check phan quyen
		const check_role_result = await check_role.check_role(token,res);
		if(
			check_role_result == "admin" 
			|| check_role_result == "customer" 
			|| check_role_result == "default" 
			|| check_role_result == "bussiness" 
		){
			//go
		}
		else{
			var evn = ojs_configs.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
					evn, 
					check_role_result, 
					"Lỗi phân quyền, Vui lòng liên hệ admin" 
				);
			return res.send({ 
				"error" : "33",
				"position" : "web->appdalacom->controllers->uploads->save", 
				"message": error_send 
			}); 
						
		}
		//return res.send(["ok"]);
		//		
		
		
		
		

		//@
		//@
		//@ upload
		try {
			var wp = new WPAPI({
				endpoint: 'https://appdala.net/wp-json',
				username: 'appdala',
				password: 'root@2021!@#$%^'
			});
			
			
			//@
			//@
			//@
			var upload_go = await wp.media().file(req.file.buffer,fileName).create();	
			//return res.send( [upload_go] );
			//return ;	
			
			
			
		}
		catch(error){
			var evn = ojs_configs.evn;
			////evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi upload hình" 
			);
			return res.send({ 
				"error" : "101", 
				"position":"web->appdalacom->controllers->uploads->save",
				"message": error_send 
			}); 
						
		}		
		//return res.send({"error":"00","message":[user_id]});
		//	

		


		//@
		//@
		//@
		var datas = {
			"datas":{
				"uploads_infomation_user_id" : user_id ,
				"uploads_infomation_url" : upload_go.source_url ,
				"uploads_infomation_image_id" : upload_go.id			
			}
		}		




	
		
		//@
		//@
		//@ call api
		var data_api_resuilt = await ojs_shares_fetch_data.get_data_send_token_post(
				ojs_configs.domain + '/api/appdalacom/' + 
				config_api.API_APPDALACOM_VERSION + 
				'/admin/uploads/save',
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
				"position":"web->appdalacom->controllers->uploads->save",
				"message": error_send 
			}); 
			
		}
		
		
		
		
		
		//@
		//@
		//@ send data resuilt		
		return res.send( {"error":"","datas":[upload_go.id,upload_go.source_url]} );
			
		
		
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
			"position":"web->appdalacom->controllers->uploads->save",
			"message": error_send 
		}); 
					
	}
	
	
	
	//@
	//@
	//@ send error when not return data
	return res.send({ 
		"error" : "2000", 
		"position":"web->appdalacom->controllers->uploads->save",
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








//@
//@
//@
//@
//@ start
const express = require('express');
const router = express.Router();

const ojs_configs = require('../../configs/config');
const ojs_shares_fetch_data = require('../../models/ojs-shares-fetch-data');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');







//@
//@
//@
//@
//@ router
router.get('/', async  function(req, res, next) {
	res.render( ojs_configs.view_version + 
	'/users/login' ,  { 'title' : 'Đăng nhập Dala' ,'js_css_version':ojs_configs.js_css_version}  );
});







//@
//@
//@
//@
//@ login
router.post('/', async  function(req, res, next) {
	var datas = req.body.datas;
	var session_token = req.session;	
	var send_datas = { datas : datas }
	
	/*
	return res
	  .send({ 
		"error" : "1", 
		"position" : "rt-login", 
		"message": send_datas
	}); 
	*/
	
	//@
	//@
	//@
	try {
		var datas_users = await ojs_shares_fetch_data.get_data_no_token_post(
			ojs_configs.domain + '/api/appdalacom/v5/users/login', send_datas
		);
		//return res.send( datas_users );
		

		if(datas_users.error == "") { 
			session_token.token = datas_users.token;
			return  res.send( datas_users );
					
		}else{
			var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				datas_users.message , datas_users.message  
			);
			return res.send({ 
				"error" : "1", 
				"position" : "rt-login", 
				"message": error_send 
			}); 
						
		}


	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			error, 
			"Lỗi login, vui lòng liên hệ Kỹ thuật dala" 
		);
		return res.send({ 
			"error" : "2", 
			"position" : "rt-login" , 
			"message": error_send 
		}); 
					
	}
});




//@
//@
//@
//@
//@ export
module.exports = router;








//@
//@
//@
//@
//@ end





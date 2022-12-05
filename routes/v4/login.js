var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');


const ojs_shares_fetch_data = require('../../models/ojs-shares-fetch-data');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');


/* GET users listing. */
router.get('/', async  function(req, res, next) {

	res.render( ojs_configs.view_version + '/users/login' ,  { 'title' : 'Đăng nhập Dala' ,'js_css_version':ojs_configs.js_css_version}  );

});

//chức năng : login
//@@
router.post('/', async  function(req, res, next) {
	var datas = req.body.datas;
	var session_token = req.session;
	
	
	var send_datas = { datas : datas }
	
	
	//@
	//@
	//@
	try {
		var datas_users = await ojs_shares_fetch_data.get_data_no_token_post(ojs_configs.domain + '/api/appdalacom/v5/users/login', send_datas);
		//res.send( datas_users );
		//return;

		if(datas_users.error == "") { 
			session_token.token = datas_users.token;
			res.send( datas_users );
			return;			
		}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, datas_users.message , datas_users.message  );
			res.send({ "error" : "1", "position" : "rt-login", "message": error_send } ); 
			return;				
		}


	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi login, vui lòng liên hệ Kỹ thuật dala" );
		res.send({ "error" : "2", "position" : "rt-login" , "message": error_send } ); 
		return;			
	}
});



//chức năng : login default
//@
router.post('/default', async  function(req, res, next) {
	let datas = req.body.datas;
	let session_token = req.session;
	let send_datas = { datas : datas }
	try {
		let datas_users = await ojs_shares_fetch_data.get_data_no_token_post(ojs_configs.domain + '/api/v4/users/login-default', send_datas);
		if(datas_users.error == "") { session_token.token = datas_users.token; }
		res.send( datas_users );
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "1_router_login_app->default->catch", "message": error_send } ); 
		return;		
	}
});



//chức năng : kiểm tra token còn hiệu lực hay không
//@datas: token (token can kiểm tra)
router.post('/check-token', async  function(req, res, next) {
	//let datas = req.body.datas;
	let session_token = req.session;
	let send_datas = { "datas" : {
			"token" : req.body.datas.token
		}
	}
	//
	try {	
		let token_check = await ojs_shares_fetch_data.get_data_no_token_post(ojs_configs.domain + '/api/v4/users/check-token', send_datas);
		if(token_check.error == "") { session_token.token = token_check.token; }
		res.send( token_check );
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "1_router_login_app->check-token->catch", "message": error_send } ); 
		return;		
	}		
});



module.exports = router;

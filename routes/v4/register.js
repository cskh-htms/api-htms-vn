var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');




//@
//@
//@@@@@@@@@@@@
//@@@@@@@@@@@@
//@@
//@
//danh sách
router.get('/', async function(req, res, next) {
	//
	//res.send("welCom !!!");
	//return;
	
	
	//
	//
	var js_css_version = ojs_configs.js_css_version;
	var view_version = ojs_configs.view_version;
	//
	//Lấy danh sách các options
	let users_type_list;
	try {
		users_type_list = await ojs_shares.get_data_no_token_get(ojs_configs.domain + '/api/v0/users-type/list');
		if(users_type_list.error != "") res.redirect("/login");	
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "1_app_router_register-app->get->users_type_list", "message": error_send } ); 
		return;		
	}
	//

	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//
		//@
		data_send = {
			'title' : 'Đăng ký tài khoản',
			'users_type_list' : users_type_list.datas,
			'type_role' : 'register',
			'js_css_version' : js_css_version
		}
		//res.send(data_send);
		//return;
		res.render(view_version +  '/users/register', data_send );	
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "2_app_router_register-app->get->catch", "message": error_send } ); 
		return;	
	}	

});

	
module.exports = router;

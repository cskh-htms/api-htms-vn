var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');





router.get('/', async  function(req, res, next) {
	
	//
	let token = req.session.token;	
	//
	//neu chua co token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		res.redirect("/login")
	}


	//
	//@@
	//@@lấy version
	let datas_check = {
		"token":token
	}
	//@
	//@
	let check_datas_result;	
	try{
		check_datas_result = await ojs_shares.get_check_data(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "1.router_app->cuutomer->get", "message": error_send } ); 
		return;			
	}	
	
	
	
	
	let users_type = check_datas_result.user_role;	
	let user_id = ojs_shares.get_users_id(token);	
	let users_full_name = ojs_shares.get_users_full_name(token);
	//
	//@
	
	data_send = {
		'title' : 'Welcom ! ',
		'users_type' : users_type,
		'user_role'  : users_type,
		'user_id' : user_id,
		'users_full_name' : users_full_name,
		"js_css_version" : check_datas_result.js_css_version
	}	
	res.render( ojs_configs.view_version + '/users/customer', data_send  );
		
		
});



module.exports = router;
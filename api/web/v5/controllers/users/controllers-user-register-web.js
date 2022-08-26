const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');


const ojs_configs = require('../../../../../configs/config');


const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');




const user_check_lock = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-check-lock.js');
const user_login_one = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-login-one.js');
const user_login_lost = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-login-lost.js');
const update_lost_password = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/update-lost-password.js');
const token_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/token/token-search-web.js');
const get_one_user = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-get-one.js');



const user_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users/user-insert.js');



//@
async  function function_export(req, res, next) {
	try {
		var datas = req.body.datas;

		//res.send(datas);
		//return;
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "2", "position":"ctl-users->resgister-web", "message": error_send } );
		return;	
	}	
	
	
	//@ cố định role
	var role = {
		"users_users_type_id":15
	};
	var datas_insert = Object.assign(datas,role);	
	//res.send(datas_insert);
	//return;

	//@ insert
	
	var user_insert_result = await user_insert(datas_insert,res);
	res.send({"error":"","datas":user_insert_result});
	return;

}

module.exports = function_export;
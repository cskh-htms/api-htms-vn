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



const user_tracking_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/users-trackings/user-tracking-insert.js');



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
	
	
	//@
	//@
	//@
	//@ check login lock	
	var check_lock = await user_check_lock(datas,res);
	//res.send(check_lock);
	//return;
	//@
	//@
	//@
	if(check_lock.length > 0){
		if(check_lock[0].users_status == 1){
			res.send({ "error" : "2", "position":"ctl-users->lost-password", "message": "Tài khoản đang bị lock, vui lòng liên hệ CSKH DALA"} );
			return;					
		}			
	}else{
		res.send({ "error" : "3", "position":"ctl-users->lost-password", "message": "Không tìm thấy tài khoản trong hệ thống dala" } );
		return;				
	}



	//@
	//@
	//@
	//@ insert users tracking
	var datas_tracking = {
		"users_tracking_user_id": check_lock[0].users_ID,
		"users_tracking_action": "1",			
		"users_tracking_status": "1",
	}
	var user_tracking_insert_result = await user_tracking_insert(datas_tracking,res);	

	res.send(user_tracking_insert_result);
	return;





}

module.exports = function_export;
//@
//@
//@
//@
//@ file start
// v5 


//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();






//@
//@
//@
//@ config
const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');





//@
//@
//@
//@ controller
const controller_users_show_all = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/users/controllers-users-show-all.js'
);

const controller_admin_users_show = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/users/controllers-admin-users-show.js'
);

const controller_admin_users_update = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/users/controllers-admin-users-update.js'
);

const controller_admin_users_delete = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/users/controllers-admin-users-delete.js'
);

const controller_admin_users_add = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/users/controllers-admin-users-add.js'
);

const controller_admin_users_save = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/users/controllers-admin-users-save.js'
);

const controller_admin_users_xoa_tai_khoan = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/users/controllers-admin-users-xoa-tai-khoan.js'
);

const controller_admin_users_ajax_users_list = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/users/controllers-admin-users-ajax-users-list.js'
);




//@
//@
//@
//@ router
router.get('/', controller_users_show_all);
router.get('/show/:user_id', controller_admin_users_show);
router.post('/update/:user_id', controller_admin_users_update);
router.get('/delete/:user_id', controller_admin_users_delete);
router.get('/add/', controller_admin_users_add);
router.post('/save/', controller_admin_users_save);
router.post('/xoa-tai-khoan/', controller_admin_users_xoa_tai_khoan);
router.post('/ajax-users-list/', controller_admin_users_ajax_users_list);




	
	
	
	
//@
//@
//@
//@ export router
module.exports = router;
	
	
	
	
	
	
//@
//@
//@
//@ file end
	
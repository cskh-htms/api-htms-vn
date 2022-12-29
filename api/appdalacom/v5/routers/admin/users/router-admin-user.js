//@
//@
//@
//@ file start





const express = require('express');
const router = express.Router();
const config_api = require('../../../../../configs/config-api');

const middle_ware =  require('../../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');




//@
//@
//@
//@ controller
const controllers_admin_users_show_all =  
require(
	'../../../controllers/admin/users/controllers-admin-users-show-all.js'
);

const controllers_admin_users_show =  
require(
	'../../../controllers/admin/users/controllers-admin-users-show.js'
);
const controllers_admin_users_update =  
require(
	'../../../controllers/admin/users/controllers-admin-users-update.js'
);
const controllers_admin_users_delete =  
require(
	'../../../controllers/admin/users/controllers-admin-users-delete.js'
);
const controllers_admin_users_add =  
require(
	'../../../controllers/admin/users/controllers-admin-users-add.js'
);

const controllers_admin_users_save =  
require(
	'../../../controllers/admin/users/controllers-admin-users-save.js'
);

const controllers_admin_users_ajax_users_list =  
require(
	'../../../controllers/admin/users/controllers-admin-users-ajax-users-list.js'
);




//@
//@
//@
//@ router
router.get('/show-all/', middle_ware, controllers_admin_users_show_all );
router.get('/show/', middle_ware, controllers_admin_users_show );
router.put('/update/', middle_ware, controllers_admin_users_update );
router.delete('/delete/', middle_ware, controllers_admin_users_delete );
router.get('/add/', middle_ware, controllers_admin_users_add );
router.post('/save/', middle_ware, controllers_admin_users_save );
router.post('/ajax-users-list/', middle_ware, controllers_admin_users_ajax_users_list );











//@
//@
//@
//@ export
module.exports = router;

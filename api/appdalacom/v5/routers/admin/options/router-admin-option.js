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
const controller_admin_option_show_all =  
require(
	'../../../controllers/admin/options/controller-admin-option-show-all.js'
);

const controller_admin_option_add =  
require(
	'../../../controllers/admin/options/controller-admin-option-add.js'
);

const controller_admin_option_save =  
require(
	'../../../controllers/admin/options/controller-admin-option-save.js'
);


const controller_admin_option_delete =  
require(
	'../../../controllers/admin/options/controller-admin-option-delete.js'
);

const controller_admin_option_show =  
require(
	'../../../controllers/admin/options/controller-admin-option-show.js'
);


const controller_admin_option_update =  
require(
	'../../../controllers/admin/options/controller-admin-option-update.js'
);







//@
//@
//@
//@ router
router.get('/show-all/', middle_ware, controller_admin_option_show_all );
router.get('/add/', middle_ware, controller_admin_option_add );
router.post('/save/', middle_ware, controller_admin_option_save );
router.delete('/delete/', middle_ware, controller_admin_option_delete );
router.get('/show/', middle_ware, controller_admin_option_show );
router.put('/update/', middle_ware, controller_admin_option_update );


/*

router.post('/ajax-list/', middle_ware, controller_admin_option_ajax_list );
router.get('/add/', middle_ware, controller_admin_option_add );






*/


//@
//@
//@
//@ export
module.exports = router;






//@
//@
//@
//@ file end








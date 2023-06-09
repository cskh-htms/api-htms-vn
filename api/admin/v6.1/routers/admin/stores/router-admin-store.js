//@
//@
//@
//@ file start





const express = require('express');
const router = express.Router();


const config_api = require('../../../configs/config');




const middle_ware =  require('../../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');






const controllers_admin_store_add =  
require(
	'../../../controllers/admin/stores/controllers-admin-stores-add'
);

const controllers_admin_store_save =  
require(
	'../../../controllers/admin/stores/controllers-admin-stores-save'
);

const controllers_admin_store_show_all =  
require(
	'../../../controllers/admin/stores/controllers-admin-stores-show-all'
);


const controllers_admin_store_delete =  
require(
	'../../../controllers/admin/stores/controllers-admin-stores-delete'
);


const controllers_admin_store_show =  
require(
	'../../../controllers/admin/stores/controllers-admin-stores-show'
);

const controllers_admin_store_update =  
require(
	'../../../controllers/admin/stores/controllers-admin-stores-update'
);

//@
//@
//@
//@ stores
router.get('/add',	middle_ware, controllers_admin_store_add );
router.post('/save',	middle_ware, controllers_admin_store_save );
router.get('/show-all',	middle_ware, controllers_admin_store_show_all );
router.delete('/delete',	middle_ware, controllers_admin_store_delete );
router.get('/show',	middle_ware, controllers_admin_store_show );
router.put('/update',	middle_ware, controllers_admin_store_update );





//@
//@
//@
//@ export
module.exports = router;

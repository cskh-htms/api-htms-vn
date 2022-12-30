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
const controllers_admin_order_show_all =  
require(
	'../../../controllers/admin/orders/controller-admin-order-show-all'
);
const controllers_admin_order_ajax_load =  
require(
	'../../../controllers/admin/orders/controller-admin-order-ajax-load'
);

const controllers_admin_order_delete =  
require(
	'../../../controllers/admin/orders/controller-admin-order-delete'
);

const controllers_admin_order_show =  
require(
	'../../../controllers/admin/orders/controller-admin-order-show'
);

//@
//@
//@
//@ router
router.get('/show-all',	middle_ware, controllers_admin_order_show_all );
router.post('/ajax-load',	middle_ware, controllers_admin_order_ajax_load );
router.delete('/delete',	middle_ware, controllers_admin_order_delete );
router.get('/show',	middle_ware, controllers_admin_order_show );


//@
//@
//@
//@ export
module.exports = router;

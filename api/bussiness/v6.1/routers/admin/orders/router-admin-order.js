//@
//@
//@
//@ file start





const express = require('express');
const router = express.Router();


const config_api = require('../../../configs/config');



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

const controllers_admin_order_detail_update =  
require(
	'../../../controllers/admin/orders/controller-admin-order-detail-update'
);
const controllers_admin_order_detail_delete =  
require(
	'../../../controllers/admin/orders/controller-admin-order-detail-delete'
);


const controllers_admin_order_push_dala =  
require(
	'../../../controllers/admin/orders/controller-admin-order-push-dala'
);


const controllers_admin_order_push_ghtk =  
require(
	'../../../controllers/admin/orders/controller-admin-order-push-ghtk'
);


const controllers_admin_order_save_fee =  
require(
	'../../../controllers/admin/orders/controller-admin-order-save-fee'
);

const controllers_admin_order_update =  
require(
	'../../../controllers/admin/orders/controller-admin-order-update'
);

const controllers_admin_order_webhook_ghtk =  
require(
	'../../../controllers/admin/orders/controller-admin-order-webhook-ghtk'
);






//@
//@
//@
//@ router
router.get('/show-all',	middle_ware, controllers_admin_order_show_all );
router.get('/show',	middle_ware, controllers_admin_order_show );

router.post('/ajax-load',	middle_ware, controllers_admin_order_ajax_load );
router.post('/push-dala',	middle_ware, controllers_admin_order_push_dala );
router.post('/push-ghtk',	middle_ware, controllers_admin_order_push_ghtk );
router.post('/save-fee',	middle_ware, controllers_admin_order_save_fee );
router.post('/webhook-ghtk', controllers_admin_order_webhook_ghtk );





router.put('/detail-update',	middle_ware, controllers_admin_order_detail_update );
router.put('/update',	middle_ware, controllers_admin_order_update );

router.delete('/delete',middle_ware, controllers_admin_order_delete );
router.delete('/detail-delete',	middle_ware, controllers_admin_order_detail_delete );











//@
//@
//@
//@ export
module.exports = router;






//@
//@
//@
//@ export











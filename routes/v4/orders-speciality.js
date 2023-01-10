

/* v5 
1. bussiness/user 
*/
// v5 
const express = require('express');
const router = express.Router();


const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');




//@
//@
//@
//@ controller
const controller_admin_orders_show_all = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-show-all.js'
);

const controller_admin_orders_ajax_load_order = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-ajax-load.js'
);

const controller_admin_orders_delete = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-delete.js'
);


const controller_admin_orders_show = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-show.js'
);


const controller_admin_orders_detail_update = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-detail-update.js'
);

const controller_admin_orders_detail_delete = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-detail-delete.js'
);

const controller_admin_orders_push_dala = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-push-dala.js'
);


const controller_admin_orders_push_ghtk = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-push-ghtk.js'
);

const controller_admin_orders_save_fee = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-save-fee.js'
);


const controller_admin_orders_update = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/orders/controller-admin-order-update.js'
);







//@
//@
//@
//@ controller manage
const controller_order_manage_show_all = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/orders/controller-order-manage-show-all'
);


const controller_order_manage_ajax_load = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/orders/controller-order-manage-ajax-load'
);


const controller_order_manage_ajax_load_detail = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/orders/controller-order-manage-ajax-load-detail'
);





//@
//@
//@
//@ router manage
router.get('/manage/:store_id/:status_int', controller_order_manage_show_all);
router.post('/manage/ajax-load', controller_order_manage_ajax_load);
router.post('/manage/ajax-load-detail', controller_order_manage_ajax_load_detail);






//@
//@
//@
//@ router admin
router.get('/', controller_admin_orders_show_all);
router.get('/delete/:order_id', controller_admin_orders_delete);
router.get('/show/:order_id', controller_admin_orders_show);

router.post('/ajax-load', controller_admin_orders_ajax_load_order);
router.post('/push-data', controller_admin_orders_push_dala);
router.post('/push-ghtk', controller_admin_orders_push_ghtk);
router.post('/save_fee', controller_admin_orders_save_fee);

router.put('/update/:order_id', controller_admin_orders_update);
router.put('/detail/update/:detail_id', controller_admin_orders_detail_update);

router.delete('/detail/delete/:detail_id', controller_admin_orders_detail_delete);






//@
//@
//@
//end of v5


	







//@
//@
//@
//@ file export
module.exports = router;








//@
//@
//@
//@ file end








	
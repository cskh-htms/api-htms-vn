

/* v5 
1. bussiness/user 
*/
// v5 
const express = require('express');
const router = express.Router();


const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');





//@
//@
//@
//@ controller
const controller_store_order_get_all = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/stores/controllers-stores-order-get-all-web-appdalacom.js'
);

const controller_store_manage = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/stores/controllers-stores-manage.js'
);

const controller_admin_stores_show_all = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/stores/controllers-admin-stores-show-all.js'
);

const controller_admin_stores_delete = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/stores/controllers-admin-stores-delete.js'
);

const controller_admin_stores_show = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/stores/controllers-admin-stores-show.js'
);


const controller_admin_stores_update = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/stores/controllers-admin-stores-update.js'
);



const controller_admin_stores_add = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/stores/controllers-admin-stores-add.js'
);


const controller_admin_stores_save = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/stores/controllers-admin-stores-save.js'
);





//@
//@
//@
//@ router
router.get('/', controller_admin_stores_show_all);
router.get('/show/:store_id', controller_admin_stores_show);
router.put('/update/:store_id', controller_admin_stores_update);
router.get('/delete/:store_id', controller_admin_stores_delete);
router.get('/add/', controller_admin_stores_add);
router.post('/save/', controller_admin_stores_save);



router.get('/manage/orders/:store_id/:status_int', controller_store_order_get_all);
router.get('/manage/:store_id/:user_id', controller_store_manage);








//@
//@
//@
//@ file export
module.exports = router;








//@
//@
//@
//@ file end










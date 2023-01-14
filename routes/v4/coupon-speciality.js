

//@
//@
//@
//@
//@  require
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');






//@
//@
//@
//@
//@  controller admin
const controller_coupon_admin_show_all = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/coupons/controllers-admin-coupon-show-all.js');


const controller_coupon_admin_show = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/coupons/controllers-admin-coupon-show.js');


const controller_coupon_admin_add = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/coupons/controllers-admin-coupon-add.js');




const controller_coupon_admin_save = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/coupons/controllers-admin-coupon-save.js');




const controller_coupon_admin_delete = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/coupons/controllers-admin-coupon-delete.js');



const controller_coupon_admin_update = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/coupons/controllers-admin-coupon-update.js');











//@
//@
//@
//@
//@  router admin
router.get('/', controller_coupon_admin_show_all);
router.get('/show/:coupon_id/', controller_coupon_admin_show);
router.get('/add/:store_id', controller_coupon_admin_add);
router.post('/save/', controller_coupon_admin_save);
router.delete('/delete/:coupon_id', controller_coupon_admin_delete);
router.put('/update/:coupon_id', controller_coupon_admin_update);









//@
//@
//@
//@
//@  controller manage
const controller_coupon_manage_show_all = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/coupons/controller-coupon-manage-show-all.js');


const controller_coupon_manage_add = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/coupons/controller-coupon-manage-add.js');

const controller_coupon_manage_save = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/coupons/controller-coupon-manage-save.js');


const controller_coupon_manage_delete = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/coupons/controller-coupon-manage-delete.js');


const controller_coupon_manage_show = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/coupons/controller-coupon-manage-show.js');


const controller_coupon_manage_update = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/coupons/controller-coupon-manage-update.js');



//@
//@
//@
//@
//@  router manage
router.get('/manage/:store_id', controller_coupon_manage_show_all);
router.get('/manage/add/:store_id', controller_coupon_manage_add);
router.post('/manage/save/', controller_coupon_manage_save);
router.delete('/manage/delete/:coupon_id/:store_id', controller_coupon_manage_delete);
router.get('/manage/show/:coupon_id/:store_id', controller_coupon_manage_show);
router.put('/manage/update/:coupon_id/', controller_coupon_manage_update);








/*



//@
//@
//@
//@
//@  controller
const controller_coupon_admin_show_all = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/coupons/controllers-admin-coupon-show-all.js');


const controller_coupon_admin_show = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/coupons/controllers-admin-coupon-show.js');


const controller_coupon_admin_add = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/coupons/controllers-admin-coupon-add.js');




const controller_coupon_admin_save = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/coupons/controllers-admin-coupon-save.js');




const controller_coupon_admin_delete = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/coupons/controllers-admin-coupon-delete.js');



const controller_coupon_admin_update = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/coupons/controllers-admin-coupon-update.js');








//@
//@
//@
//@
//@  router
router.get('/', controller_coupon_admin_show_all);
router.get('/show/:coupon_id/', controller_coupon_admin_show);
router.get('/add/:store_id', controller_coupon_admin_add);
router.post('/save/', controller_coupon_admin_save);
router.delete('/delete/:coupon_id', controller_coupon_admin_delete);
router.put('/update/:coupon_id', controller_coupon_admin_update);





*/

	
//@
//@
//@
//@
//@  router	
module.exports = router;
	
	
	

//@
//@
//@
//@
//@  router	


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
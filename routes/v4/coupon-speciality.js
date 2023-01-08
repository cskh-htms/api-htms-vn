

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





//@
//@
//@
//@
//@  router
router.get('/', controller_coupon_admin_show_all);
router.get('/show/:coupon_id/', controller_coupon_admin_show);
router.get('/add/:store_id', controller_coupon_admin_add);











/*

const controller_coupon_add = require('../../controllers/' + ojs_configs.controller_version + '/coupons/controllers-coupon-add.js');
const controller_coupon_show = require('../../controllers/' + ojs_configs.controller_version + '/coupons/controllers-coupon-show.js');
const controller_coupon_save = require('../../controllers/' + ojs_configs.controller_version + '/coupons/controllers-coupon-save.js');
const controller_coupon_delete = require('../../controllers/' + ojs_configs.controller_version + '/coupons/controllers-coupon-delete.js');
const controller_coupon_update = require('../../controllers/' + ojs_configs.controller_version + '/coupons/controllers-coupon-update.js');
const controller_coupon_store_id = require('../../controllers/' + ojs_configs.controller_version + '/coupons/controllers-coupon-store-id');
const controller_coupon_quan_ly_admin = require('../../controllers/' + ojs_configs.controller_version + '/coupons/controllers-coupon-quan-ly-admin.js');





//end of v5






router.get('/add/:store_id/:user_id', controller_coupon_add);
router.get('/show/:coupon_id/:store_id', controller_coupon_show);
router.post('/save', controller_coupon_save);
router.get('/delete/:coupon_id', controller_coupon_delete);
router.post('/update/:coupon_id', controller_coupon_update);
router.get('/quan-ly/', controller_coupon_quan_ly_admin);




router.get('/:store_id', controller_coupon_store_id);
router.get('/', controller_coupon_admin_show_all);








*/
	
	
	
module.exports = router;
	
	
	

	
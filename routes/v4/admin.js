// v5 
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');








const controller_admin_main = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/main/controllers-admin-main.js'
);






//@
//@
//@
//@ router
router.get('/', controller_admin_main);






/*

/*
const controller_coupon_show_admin = require(
	'../../controllers/' + ojs_configs.controller_version + '/coupons/controllers-coupon-show-admin.js'
);


const controller_discount_program_product_add = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/discount-programs/controllers-discount-program-product-add.js'
);

const controller_discount_program_product_denied = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/discount-programs/controllers-discount-program-product-denied.js'
);

const controller_admin_main = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/main/controllers-admin-main.js'
);








router.get('/coupon/show/:coupon_id/:store_id', controller_coupon_show_admin);
router.get('/discount-program/product-add/:link_id', controller_discount_program_product_add);
router.post('/discount-program/product-denied/:link_id', controller_discount_program_product_denied);
*/



//@
//@
//@
//@ export
module.exports = router;




//@
//@
//@
//@ export



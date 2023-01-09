// v5 
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');



const controller_admin_shipping_show_all = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/shippings/controller-admin-shipping-show-all.js'
);

const controller_admin_shipping_add = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/shippings/controller-admin-shipping-add.js'
);


const controller_admin_shipping_save = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/shippings/controller-admin-shipping-save.js'
);



const controller_admin_shipping_show = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/shippings/controller-admin-shipping-show.js'
);


const controller_admin_shipping_update = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/shippings/controller-admin-shipping-update.js'
);


const controller_admin_shipping_delete = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/shippings/controller-admin-shipping-delete.js'
);









//@
//@
//@
//@ router
router.get('/', controller_admin_shipping_show_all);
router.get('/add', controller_admin_shipping_add);
router.post('/save', controller_admin_shipping_save);
router.get('/show/:shipping_id', controller_admin_shipping_show);
router.put('/update/:shipping_id', controller_admin_shipping_update);
router.delete('/delete/:shipping_id', controller_admin_shipping_delete);











//@
//@
//@
//@ export
module.exports = router;




//@
//@
//@
//@ export



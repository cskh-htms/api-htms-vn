

/* v5 
1. bussiness/user 
*/
// v5 
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');









//@
//@
//@
//@ controller





//@ admin
const controller_option_show_all = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/options/controller-option-show-all.js'
);


const controller_option_add = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/options/controller-option-add.js'
);


const controller_option_save = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/options/controller-option-save.js'
);


const controller_option_delete = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/options/controller-option-delete.js'
);



const controller_option_show = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/options/controller-option-show.js'
);


const controller_option_update = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/options/controller-option-update.js'
);

const controller_option_show_product = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/options/controller-option-show-product.js'
);






//@
//@
//@
//@ router admin
router.get('/', controller_option_show_all);
router.get('/add/:store_id/', controller_option_add);
router.post('/save/', controller_option_save);
router.delete('/delete/:option_id', controller_option_delete);
router.put('/update/:option_id', controller_option_update);
router.get('/show/:option_id', controller_option_show);
router.get('/show-product/:option_id', controller_option_show_product);









//@
//@
//@
//@ controller manage
const controller_option_manage_show_all = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/options/controller-option-manage-show-all.js'
);


const controller_option_manage_add = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/options/controller-option-manage-add.js'
);


const controller_option_manage_save = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/options/controller-option-manage-save.js'
);


const controller_option_manage_delete = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/options/controller-option-manage-delete.js'
);


const controller_option_manage_show = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/options/controller-option-manage-show.js'
);

const controller_option_manage_update = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/options/controller-option-manage-update.js'
);

const controller_option_manage_product = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/options/controller-option-manage-product.js'
);




//@
//@
//@
//@ router manage
router.get('/manage/:store_id', controller_option_manage_show_all);
router.get('/manage/add/:store_id', controller_option_manage_add);
router.post('/manage/save/', controller_option_manage_save);
router.delete('/manage/delete/:option_id/:store_id', controller_option_manage_delete);
router.get('/manage/show/:option_id/:store_id', controller_option_manage_show);

router.put('/manage/update/:option_id', controller_option_manage_update);
router.get('/manage/product/:option_id/:store_id', controller_option_manage_product);






		
	
//@
//@
//@
//@ router 
module.exports = router;
	
	
	
//@
//@
//@
//@ end
	
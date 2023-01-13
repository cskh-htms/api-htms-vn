//@
//@
//@
//@
/* v5 
1. bussiness/user 
*/
// v5 
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');



const controller_brand_update = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/brands/controllers-brand-update.js'
);



const controller_brand_show_all = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/brands/controller-brand-show-all.js'
);

const controller_brand_show = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/brands/controller-brand-show.js'
);

const controller_brand_add = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/brands/controller-brand-add.js'
);

const controller_brand_save = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/brands/controller-brand-save.js'
);


const controller_brand_delete = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/brands/controller-brand-delete.js'
);


const controller_brand_show_product = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/brands/controller-brand-show-product.js'
);




//@
//@
//@
//@ router admin
router.get('/', controller_brand_show_all);
router.get('/show/:brand_id', controller_brand_show);
router.get('/add/:store_id', controller_brand_add);
router.post('/save/', controller_brand_save);
router.post('/update/:brand_id/', controller_brand_update);
router.delete('/delete/:brand_id/', controller_brand_delete);
router.get('/show-product/:brand_id/', controller_brand_show_product);








//@
//@
//@
//@ controller manage
const controller_brand_manage_show_all = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/brands/controller-brand-manage-show-all.js'
);


const controller_brand_manage_add = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/brands/controller-brand-manage-add.js'
);


const controller_brand_manage_save = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/brands/controller-brand-manage-save.js'
);


const controller_brand_manage_delete = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/brands/controller-brand-manage-delete.js'
);


const controller_brand_manage_show = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/brands/controller-brand-manage-show.js'
);


const controller_brand_manage_update = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/brands/controller-brand-manage-update.js'
);







//@
//@
//@
//@ router manage
router.get('/manage/:store_id', controller_brand_manage_show_all);
router.get('/manage/add/:store_id', controller_brand_manage_add);
router.post('/manage/save/', controller_brand_manage_save);
router.delete('/manage/delete/:brand_id/:store_id', controller_brand_manage_delete);
router.get('/manage/show/:brand_id/:store_id', controller_brand_manage_show);
router.put('/manage/update/:brand_id/', controller_brand_manage_update);	
	
	
	
	
	
	
//@
//@
//@
//@ export
module.exports = router;
	
	
	




//@
//@
//@
//@ file end


	
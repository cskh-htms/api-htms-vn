//@
//@
//@
//@
//@
//@
//@
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');






//@
//@
//@
//@
//@

const controller_category_show_all = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/categorys/controller-category-show-all.js'
);
const controller_category_add = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/categorys/controller-category-add.js'
);

const controller_category_ajax_list = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/categorys/controller-category-ajax-list.js'
);


const controller_category_save = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/categorys/controller-category-save.js'
);



const controller_category_show = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/categorys/controller-category-show.js'
);

const controller_category_update= 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/categorys/controller-category-update.js'
);

const controller_category_delete= 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/categorys/controller-category-delete.js'
);








//@
//@
//@
//@ router
router.get('/', controller_category_show_all);
router.post('/ajax-list/', controller_category_ajax_list);
router.get('/add/:store_id', controller_category_add);
router.post('/save/', controller_category_save);
router.get('/show/:category_id', controller_category_show);
router.put('/update/:category_id', controller_category_update);
router.delete('/delete/:category_id', controller_category_delete);











//@
//@
//@
//@
//@
const controller_category_manage_show_all  = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/categorys/controller-category-manage-show-all'
);


const controller_category_manage_add = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/categorys/controller-category-manage-add'
);




//@
//@
//@
//@ router manage
router.get( '/manage/:store_id', controller_category_manage_show_all );
router.get( '/manage/add/:store_id', controller_category_manage_add );









/*
const controller_store_category = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/categorys/controllers-category-store.js'
);

const controller_store_category_product = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/categorys/controllers-category-store-product.js'
);



router.get('/:store_id', controller_store_category);
router.get('/product/:category_id/:store_id', controller_store_category_product);



*/




//@
//@
//@
//@ file export
module.exports = router;








//@
//@
//@
//@ file end








	
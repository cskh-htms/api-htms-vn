//@
//@
//@
//@ start




//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();





//@
//@
//@
//@ config
const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');






//@
//@
//@
//@ controller
//@
//@ admin
const controller_product_show_all = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/products/controller-product-show-all.js'
);

const controller_product_ajax_list = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/products/controller-product-ajax-list.js'
);
const controller_product_ajax_list_table = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/products/controller-product-ajax-list-table.js'
);
const controller_product_show = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/products/controller-product-show.js'
);
const controller_product_update = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/products/controller-product-update.js'
);

const controller_product_update_stock = require(
   '../../controllers/' + ojs_configs.controller_version + 
   '/admin/products/controller-product-update-stock.js'
);

const controller_product_view = require(
   '../../controllers/' + ojs_configs.controller_version + 
   '/admin/products/controller-product-view.js'
);
const controller_product_delete = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/products/controller-product-delete.js'
);

const controller_product_phe_duyet = require(
   '../../controllers/' + ojs_configs.controller_version + 
   '/admin/products/controller-product-phe-duyet.js'
);

const controller_product_tu_choi = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/products/controller-product-tu-choi.js'
);

const controller_product_add = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/products/controller-product-add.js'
);










//@
//@
//@
//@ router

//@
//@ admin
router.get('/', controller_product_show_all);
router.post('/ajax-list/', controller_product_ajax_list);
router.post('/ajax-list-table/', controller_product_ajax_list_table);
router.get('/show/:product_id/:store_id/', controller_product_show);
router.post('/update/:product_id', controller_product_update);
router.post('/update-stock/:product_id', controller_product_update_stock);
router.post('/view/:product_id', controller_product_view);
router.delete('/delete/:product_id', controller_product_delete);
router.post('/duyet/:product_id', controller_product_phe_duyet);
router.post('/tu-choi/:product_id', controller_product_tu_choi);








//@
//@  controller manage
const controller_product_manage_show_all = require(
	'../../controllers/' + ojs_configs.controller_version + '/products/controller-product-manage-show-all'
);


const controller_product_manage_ajax_list = require(
	'../../controllers/' + ojs_configs.controller_version + '/products/controller-product-manage-ajax-list'
);

const controller_product_manage_ajax_list_table = require(
	'../../controllers/' + ojs_configs.controller_version + '/products/controller-product-manage-ajax-list-table'
);




//@
//@ router manage
router.get('/manage/:store_id', controller_product_manage_show_all);
router.post('/manage/ajax-list/', controller_product_manage_ajax_list);
router.post('/manage/ajax-list-table/', controller_product_manage_ajax_list_table);













/*
const controller_product_store_update = require(
	'../../controllers/' + ojs_configs.controller_version + '/products/controllers-product-store-update.js'
);

const controller_product_store_delete = require(
	'../../controllers/' + ojs_configs.controller_version + '/products/controllers-product-store-delete.js'
);
*/



















// phai duoi la chua lam
/*
router.post('/store-update/:product_id', controller_product_store_update);
router.delete('/store-delete/:product_id', controller_product_store_delete);

router.get('/add/:store_id/:user_id', controller_product_add);
*/

	
	
	
	
	
	
	
//@
//@
//@
//@
//@
//@ end router
module.exports = router;
	
	
	

	
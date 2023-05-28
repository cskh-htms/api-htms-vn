
//@
//@
//@
//@ file end




//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();






const config_api = require('../../configs/config');





//@
//@
//@
//@ share
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');












//@
//@
//@
//@ controller
const controller_product_manage_show_all =  require(
	'../../controllers/products/controller-product-manage-show-all'
);

const controller_product_manage_ajax_load =  require(
	'../../controllers/products/controller-product-manage-ajax-load'
);

const controller_product_manage_ajax_load_table =  require(
	'../../controllers/products/controller-product-manage-ajax-load-table'
);

const controller_product_manage_add =  require(
	'../../controllers/products/controller-product-manage-add'
);

const controller_product_manage_show =  require(
	'../../controllers/products/controller-product-manage-show'
);


const controller_product_manage_update_stock =  require(
	'../../controllers/products/controller-product-manage-update-stock'
);


const controller_product_manage_update =  require(
	'../../controllers/products/controller-product-manage-update'
);


const controller_product_manage_update_show_hide =  require(
	'../../controllers/products/controller-product-manage-update-show-hide'
);


const controller_product_manage_show_content =  require(
	'../../controllers/products/controller-product-manage-show-content'
);


const controller_product_manage_delete =  require(
	'../../controllers/products/controller-product-manage-delete'
);







//@
//@
//@
//@ router manage
router.get('/show-all',middle_ware, controller_product_manage_show_all);
router.post('/ajax-load',middle_ware, controller_product_manage_ajax_load);
router.post('/ajax-load-table',middle_ware, controller_product_manage_ajax_load_table);
router.post('/add',middle_ware, controller_product_manage_add);
router.get('/show',middle_ware, controller_product_manage_show);
router.put('/update-stock',middle_ware, controller_product_manage_update_stock);
router.put('/update',middle_ware, controller_product_manage_update);
router.put('/update-show-hide',middle_ware, controller_product_manage_update_show_hide);
router.get('/show-content',middle_ware, controller_product_manage_show_content);
router.delete('/delete',middle_ware, controller_product_manage_delete);









//@
//@
//@
//@ export
module.exports = router;









//@
//@
//@
//@ file end




















//@
//@
//@
//@ file start





const express = require('express');
const router = express.Router();
const config_api = require('../../../../../configs/config-api');

const middle_ware =  require('../../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');




//@
//@
//@
//@ controller
const controller_admin_product_show =  
require(
	'../../../controllers/admin/products/controller-admin-product-show.js'
);

const controller_admin_product_update =  
require(
	'../../../controllers/admin/products/controller-admin-product-update.js'
);


const controller_admin_product_show_all =  
require(
	'../../../controllers/admin/products/controller-admin-product-show-all.js'
);

const controller_admin_product_ajax_list =  
require(
	'../../../controllers/admin/products/controller-admin-product-ajax-list.js'
);

const controller_admin_product_ajax_list_table =  
require(
	'../../../controllers/admin/products/controller-admin-product-ajax-list-table.js'
);

const controller_admin_product_update_stock =  
require(
	'../../../controllers/admin/products/controller-admin-product-update-stock.js'
);

const controller_admin_product_view =  
require(
	'../../../controllers/admin/products/controller-admin-product-view.js'
);

const controller_admin_product_delete =  
require(
	'../../../controllers/admin/products/controller-admin-product-delete.js'
);


const controller_admin_product_phe_duyet =  
require(
	'../../../controllers/admin/products/controller-admin-product-phe-duyet.js'
);

const controller_admin_product_tu_choi =  
require(
	'../../../controllers/admin/products/controller-admin-product-tu-choi.js'
);

const controller_admin_product_add =  
require(
	'../../../controllers/admin/products/controller-admin-product-add.js'
);









//@
//@
//@
//@ router
router.get('/show/', middle_ware, controller_admin_product_show );
router.put('/update/', middle_ware, controller_admin_product_update );
router.get('/show-all/', middle_ware, controller_admin_product_show_all );
router.post('/ajax-list/', middle_ware, controller_admin_product_ajax_list );
router.post('/ajax-list-table/', middle_ware, controller_admin_product_ajax_list_table );
router.post('/update-stock/', middle_ware, controller_admin_product_update_stock);
router.get('/view/', middle_ware, controller_admin_product_view);

router.delete('/delete/', middle_ware, controller_admin_product_delete);
router.post('/phe-duyet/', middle_ware, controller_admin_product_phe_duyet);
router.post('/tu-choi/', middle_ware, controller_admin_product_tu_choi);
router.post('/add/', middle_ware, controller_admin_product_add);









//@
//@
//@
//@ export
module.exports = router;






//@
//@
//@
//@ file end








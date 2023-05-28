//@
//@
//@
//@ file start





const express = require('express');
const router = express.Router();


const config_api = require('../../../configs/config');




const middle_ware =  require('../../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');





//@
//@
//@
//@ controller
const controllers_admin_brand_update =  
require(
	'../../../controllers/admin/brands/controllers-admin-brand-update.js'
);

const controllers_admin_brand_show_all =  
require(
	'../../../controllers/admin/brands/controller-admin-brand-show-all.js'
);

const controllers_admin_brand_show =  
require(
	'../../../controllers/admin/brands/controller-admin-brand-show.js'
);

const controllers_admin_brand_add =  
require(
	'../../../controllers/admin/brands/controller-admin-brand-add.js'
);

const controllers_admin_brand_save =  
require(
	'../../../controllers/admin/brands/controller-admin-brand-save.js'
);

const controllers_admin_brand_delete =  
require(
	'../../../controllers/admin/brands/controller-admin-brand-delete.js'
);


const controllers_admin_brand_show_product =  
require(
	'../../../controllers/admin/brands/controller-admin-brand-show-product.js'
);








//@
//@
//@
//@ router
router.get('/show-all', middle_ware, controllers_admin_brand_show_all );
router.get('/show', middle_ware, controllers_admin_brand_show );
router.get('/add', middle_ware, controllers_admin_brand_add );
router.post('/save', middle_ware, controllers_admin_brand_save );
router.delete('/delete', middle_ware, controllers_admin_brand_delete );





router.post('/update', middle_ware, controllers_admin_brand_update );
router.get('/show-product', middle_ware, controllers_admin_brand_show_product );







//@
//@
//@
//@ export
module.exports = router;

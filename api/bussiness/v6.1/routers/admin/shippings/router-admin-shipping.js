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
const controllers_admin_shipping_show_all =  
require(
	'../../../controllers/admin/shippings/controller-admin-shipping-show-all.js'
);


const controllers_admin_shipping_add =  
require(
	'../../../controllers/admin/shippings/controller-admin-shipping-add.js'
);


const controllers_admin_shipping_save =  
require(
	'../../../controllers/admin/shippings/controller-admin-shipping-save.js'
);


const controllers_admin_shipping_show =  
require(
	'../../../controllers/admin/shippings/controller-admin-shipping-show.js'
);


const controllers_admin_shipping_update =  
require(
	'../../../controllers/admin/shippings/controller-admin-shipping-update.js'
);


const controllers_admin_shipping_delete =  
require(
	'../../../controllers/admin/shippings/controller-admin-shipping-delete.js'
);








//@
//@
//@
//@ router
router.get('/show-all/', middle_ware, controllers_admin_shipping_show_all );
router.get('/add/', middle_ware, controllers_admin_shipping_add );
router.post('/save/', middle_ware, controllers_admin_shipping_save);
router.get('/show/', middle_ware, controllers_admin_shipping_show);

router.put('/update/', middle_ware, controllers_admin_shipping_update);
router.delete('/delete/', middle_ware, controllers_admin_shipping_delete);







//@
//@
//@
//@ export
module.exports = router;

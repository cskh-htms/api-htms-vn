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
const controller_admin_option_show_all =  
require(
	'../../../controllers/admin/options/controller-admin-option-show-all.js'
);


/*




const controller_admin_category_ajax_list =  
require(
	'../../../controllers/admin/categorys/controller-admin-category-ajax-list.js'
);


const controller_admin_category_add =  
require(
	'../../../controllers/admin/categorys/controller-admin-category-add.js'
);


const controller_admin_category_save =  
require(
	'../../../controllers/admin/categorys/controller-admin-category-save.js'
);

const controller_admin_category_show =  
require(
	'../../../controllers/admin/categorys/controller-admin-category-show.js'
);

const controller_admin_category_update =  
require(
	'../../../controllers/admin/categorys/controller-admin-category-update.js'
);


const controller_admin_category_delete =  
require(
	'../../../controllers/admin/categorys/controller-admin-category-delete.js'
);


*/





//@
//@
//@
//@ router
router.get('/show-all/', middle_ware, controller_admin_option_show_all );


/*

router.post('/ajax-list/', middle_ware, controller_admin_category_ajax_list );
router.get('/add/', middle_ware, controller_admin_category_add );
router.post('/save/', middle_ware, controller_admin_category_save );
router.get('/show/', middle_ware, controller_admin_category_show );

router.put('/update/', middle_ware, controller_admin_category_update );
router.delete('/delete/', middle_ware, controller_admin_category_delete );

*/


//@
//@
//@
//@ export
module.exports = router;






//@
//@
//@
//@ file end








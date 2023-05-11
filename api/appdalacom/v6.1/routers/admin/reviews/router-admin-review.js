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
const controllers_admin_review_show_all =  
require(
	'../../../controllers/admin/reviews/controller-admin-review-show-all.js'
);

const controllers_admin_review_delete =  
require(
	'../../../controllers/admin/reviews/controller-admin-review-delete.js'
);

const controllers_admin_review_active =  
require(
	'../../../controllers/admin/reviews/controller-admin-review-active.js'
);


const controllers_admin_review_show =  
require(
	'../../../controllers/admin/reviews/controller-admin-review-show.js'
);



const controllers_admin_review_update =  
require(
	'../../../controllers/admin/reviews/controller-admin-review-update.js'
);






//@
//@
//@
//@ router
router.get('/show-all/', middle_ware, controllers_admin_review_show_all );
router.delete('/delete/', middle_ware, controllers_admin_review_delete );
router.put('/active/', middle_ware, controllers_admin_review_active );
router.get('/show/', middle_ware, controllers_admin_review_show );
router.put('/update/', middle_ware, controllers_admin_review_update );



//@
//@
//@
//@ export
module.exports = router;

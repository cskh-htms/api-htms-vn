//@
//@
//@
//@ file start





const express = require('express');
const router = express.Router();

const config_api = require('../../../../configs/config-api');

const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');

const controllers_admin_store_add =  
require(
	'../../controllers/admin/stores/controllers-admin-stores-add'
);

const controllers_admin_discount_program_add =  
require(
	'../../controllers/admin/discount-programs/controllers-admin-discount-program-add'
);

const controllers_admin_discount_program_show_all =  
require(
	'../../controllers/admin/discount-programs/controllers-admin-discount-program-show-all.js'
);


//@
//@
//@
//@ welcom
router.get('/', function(req, res, next) {
  res.end('api appdalacom admin welcom');
});





//@
//@
//@
//@ stores
router.get('/store-add',	middle_ware, controllers_admin_store_add );


router.get('/discount-program-add',	middle_ware, controllers_admin_discount_program_add );
router.get('/discount-program-show-all',	middle_ware, controllers_admin_discount_program_show_all );





//@
//@
//@
//@ export
module.exports = router;

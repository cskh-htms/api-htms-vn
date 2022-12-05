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









//@
//@
//@
//@ export
module.exports = router;

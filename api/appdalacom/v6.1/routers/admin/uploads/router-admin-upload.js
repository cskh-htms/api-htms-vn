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
const controller_admin_upload_save =  
require(
	'../../../controllers/admin/uploads/controller-admin-upload-save'
);
const controller_admin_upload_delete =  
require(
	'../../../controllers/admin/uploads/controller-admin-upload-delete'
);







//@
//@
//@
//@ router
router.post('/save',middle_ware, controller_admin_upload_save );
router.post('/delete-image/',middle_ware, controller_admin_upload_delete );



//@
//@
//@
//@ export
module.exports = router;

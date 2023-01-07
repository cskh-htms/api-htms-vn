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
const controllers_admin_notes_send =  
require(
	'../../../controllers/admin/notes/controllers-admin-notes-send'
);






//@
//@
//@
//@ router
router.get('/send',	middle_ware, controllers_admin_notes_send);






router.get('/', function(req, res, next) {
  res.end('api v5 note  appdalacom welcom ! ');
});



//@
//@
//@
//@ export
module.exports = router;



//@
//@
//@
//@ file end
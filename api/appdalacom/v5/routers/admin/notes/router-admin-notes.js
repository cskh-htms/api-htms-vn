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

const  controllers_admin_notes_send=  
require(
	'../../../controllers/admin/notes/controllers-admin-notes-send'
);

const controllers_admin_note_ajax_load_user =  
require(
	'../../../controllers/admin/notes/controllers-admin-note-ajax-load-user'
);

const controllers_admin_note_ajax_load_store =  
require(
	'../../../controllers/admin/notes/controllers-admin-note-ajax-load-store'
);

const controllers_admin_note_save_all =  
require(
	'../../../controllers/admin/notes/controllers-admin-note-save-all'
);






//@
//@
//@
//@ router
router.get('/send',	middle_ware, controllers_admin_notes_send);
router.get('/ajax-load-user',	middle_ware, controllers_admin_note_ajax_load_user);
router.get('/ajax-load-store',	middle_ware, controllers_admin_note_ajax_load_store);
router.post('/save-all',	middle_ware, controllers_admin_note_save_all);











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
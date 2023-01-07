//@
//@
//@
//@ start
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');




//@
//@
//@
//@ router
const controller_notes_send = require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/notes/controllers-admin-notes-send.js');


const controller_notes_ajax_load_user = require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/notes/controllers-admin-note-ajax-load-user.js');


const controller_notes_ajax_load_store = require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/notes/controllers-admin-note-ajax-load-store.js');


const controller_notes_save_all = require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/notes/controllers-admin-note-save-all.js');



//@
//@
//@
//@ controller
router.get('/send/', controller_notes_send);
router.post('/ajax-load-user/', controller_notes_ajax_load_user);
router.post('/ajax-load-store/', controller_notes_ajax_load_store);
router.post('/save-all/', controller_notes_save_all);




//@
//@
//@
//@ router
module.exports = router;
	
	
	

//@
//@
//@
//@ file end
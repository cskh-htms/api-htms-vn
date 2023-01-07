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
'/notes/controllers-notes-ajax-load-user-admin.js');







//@
//@
//@
//@ controller
router.get('/send/', controller_notes_send);





router.post('/ajax-load-user/', controller_notes_ajax_load_user);





//@
//@
//@
//@ router
module.exports = router;
	
	
	

//@
//@
//@
//@ file end
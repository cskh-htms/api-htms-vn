

const express = require('express');
const router = express.Router();

const config_api = require('../../../../configs/config-api');

const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');

const controllers_notes_ajax_load_user =  require('../../controllers/notes/controllers-notes-ajax-load-user-appdalacom-api');


router.get('/', function(req, res, next) {
  res.end('api appdalacom bussiness by user welcom');
});


//@ bussiness

router.get('/ajax-load-user/',middle_ware, controllers_notes_ajax_load_user );



module.exports = router;

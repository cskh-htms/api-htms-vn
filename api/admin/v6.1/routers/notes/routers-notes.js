
//@ 
//@ 
//@ 
//@ 
//@ controller

const express = require('express');
const router = express.Router();


const config_api = require('../../configs/config');



const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');



router.get('/', function(req, res, next) {
  res.end('api appdalacom bussiness by user welcom');
});



//@ 
//@ 
//@ 
//@ 
//@ controller
controller_note_manage_show_all =  
require('../../controllers/notes/controller-note-manage-show-all'
);





//@ router
router.get('/show-all/',middle_ware, controller_note_manage_show_all );














//@ 
//@ 
//@ 
//@ 
//@ export
module.exports = router;












//@ 
//@ 
//@ 
//@ 
//@ end
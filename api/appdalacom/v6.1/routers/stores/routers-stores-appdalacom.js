
//@
//@
//@
//@ start
const express = require('express');
const router = express.Router();


const config_api = require('../../configs/config');




const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');



//@
//@
//@
//@ controller link
const controllers_store_manage_show_all =  
require(
	'../../controllers/stores/controllers-stores-manage-show-all.js'
);



//@
//@
//@
//@ router
router.get(
	'/manage/',
	middle_ware, 
	controllers_store_manage_show_all
);







router.get('/', function(req, res, next) {
  res.end('api appdalacom stores welcom');
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



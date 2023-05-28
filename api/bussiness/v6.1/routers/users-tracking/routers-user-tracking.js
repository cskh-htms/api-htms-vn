
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
const controller_user_tracking_unlock =  
require(
	'../../controllers/users-tracking/controller-user-tracking-unlock.js'
);





//@
//@
//@
//@ router
router.get(	'/unlock/',middle_ware,controller_user_tracking_unlock);









router.get('/', function(req, res, next) {
  res.end('api appdalacom option welcom');
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



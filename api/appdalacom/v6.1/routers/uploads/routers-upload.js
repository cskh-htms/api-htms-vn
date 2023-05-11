
//@
//@
//@
//@ start
const express = require('express');
const router = express.Router();

const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');




//@
//@
//@
//@ controller link



//const controller_upload_save =  
///require(
	///'../../controllers/uploads/controller-upload-vave.js'
///);






//@
//@
//@
//@ router
///router.post('/save/', middle_ware, controller_upload_save);




router.get('/', function(req, res, next) {
  res.end('api appdalacom upload welcom');
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



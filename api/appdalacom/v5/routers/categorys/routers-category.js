
//@
//@
//@
//@ start
const express = require('express');
const router = express.Router();

const config_api = require('../../../../configs/config-api');

const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');






//@
//@
//@
//@ controller link
const controllers_category_store =  
require(
	'../../controllers/categorys/controllers-category-store.js'
);






//@
//@
//@
//@ router
router.get('/', function(req, res, next) {
  res.end('api appdalacom categorys welcom');
});


router.get(
	'/store/',
	middle_ware, 
	controllers_category_store
);








//@
//@
//@
//@ export
module.exports = router;




//@
//@
//@
//@ file end



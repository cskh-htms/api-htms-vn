
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

const controllers_store_manage =  
require(
	'../../controllers/stores/controllers-stores-manage.js'
);

const controllers_store_order =  
require(
	'../../controllers/stores/controllers-stores-order.js'
);





//@
//@
//@
//@ router
router.get('/', function(req, res, next) {
  res.end('api appdalacom stores welcom');
});



router.get(
	'/manage/',
	middle_ware, 
	controllers_store_manage
);

router.get(
	'/order/',
	middle_ware, 
	controllers_store_order
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



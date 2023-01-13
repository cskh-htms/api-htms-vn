
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
const controllers_brand_manage_show_all =  
require(
	'../../controllers/brands/controller-brand-manage-show-all.js'
);

const controllers_brand_manage_add =  
require(
	'../../controllers/brands/controller-brand-manage-add.js'
);

const controllers_brand_manage_save =  
require(
	'../../controllers/brands/controller-brand-manage-save.js'
);


const controllers_brand_manage_delete =  
require(
	'../../controllers/brands/controller-brand-manage-delete.js'
);


const controllers_brand_manage_show =  
require(
	'../../controllers/brands/controller-brand-manage-show.js'
);


const controllers_brand_manage_update =  
require(
	'../../controllers/brands/controller-brand-manage-update.js'
);







//@
//@
//@
//@ router
router.get('/show-all/', middle_ware, controllers_brand_manage_show_all);
router.get('/add/', middle_ware, controllers_brand_manage_add);
router.post('/save/', middle_ware, controllers_brand_manage_save);
router.delete('/delete/', middle_ware, controllers_brand_manage_delete);
router.get('/show/', middle_ware, controllers_brand_manage_show);
router.put('/update/', middle_ware, controllers_brand_manage_update);





router.get('/', function(req, res, next) {
  res.end('api appdalacom brand welcom');
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



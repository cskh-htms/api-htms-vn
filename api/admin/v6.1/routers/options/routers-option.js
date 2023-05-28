
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
const controllers_option_manage_show_all =  
require(
	'../../controllers/options/controller-option-manage-show-all.js'
);

const controllers_option_manage_add =  
require(
	'../../controllers/options/controller-option-manage-add.js'
);

const controllers_option_manage_save =  
require(
	'../../controllers/options/controller-option-manage-save.js'
);


const controllers_option_manage_delete =  
require(
	'../../controllers/options/controller-option-manage-delete.js'
);


const controllers_option_manage_show =  
require(
	'../../controllers/options/controller-option-manage-show.js'
);


const controllers_option_manage_update =  
require(
	'../../controllers/options/controller-option-manage-update.js'
);


const controllers_option_manage_product =  
require(
	'../../controllers/options/controller-option-manage-product.js'
);








//@
//@
//@
//@ router
router.get(	'/show-all/',middle_ware,controllers_option_manage_show_all);
router.get(	'/add/',middle_ware,controllers_option_manage_add);
router.post('/save/',middle_ware,controllers_option_manage_save);
router.delete('/delete/',middle_ware,controllers_option_manage_delete);
router.get('/show/',middle_ware,controllers_option_manage_show);
router.put('/update/',middle_ware,controllers_option_manage_update);
router.get('/product/',middle_ware,controllers_option_manage_product);




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



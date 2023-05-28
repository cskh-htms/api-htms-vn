
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
//@ controller 
const controller_category_manage_show_all =  
require(
	'../../controllers/categorys/controller-category-manage-show-all.js'
);


const controller_category_manage_add =  
require(
	'../../controllers/categorys/controller-category-manage-add'
);


const controller_category_manage_save =  
require(
	'../../controllers/categorys/controller-category-manage-save'
);



const controller_category_manage_show =  
require(
	'../../controllers/categorys/controller-category-manage-show'
);

const controller_category_manage_update =  
require(
	'../../controllers/categorys/controller-category-manage-update'
);

const controller_category_manage_delete =  
require(
	'../../controllers/categorys/controller-category-manage-delete'
);



const controller_category_manage_product =  
require(
	'../../controllers/categorys/controller-category-manage-product'
);









//@
//@
//@
//@ router
router.get( '/show-all/',middle_ware, controller_category_manage_show_all );
router.get( '/add/',middle_ware, controller_category_manage_add );
router.post( '/save/',middle_ware, controller_category_manage_save );
router.get( '/show/',middle_ware, controller_category_manage_show );
router.put( '/update/',middle_ware, controller_category_manage_update );
router.delete( '/delete/',middle_ware, controller_category_manage_delete );
router.get( '/product/',middle_ware, controller_category_manage_product );




/*

//@
//@
//@
//@ controller link
const controllers_category_store =  
require(
	'../../controllers/categorys/controllers-category-store.js'
);

const controllers_category_store_product =  
require(
	'../../controllers/categorys/controllers-category-store-product.js'
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


router.get(
	'/product/',
	middle_ware, 
	controllers_category_store_product
);

*/









//@
//@
//@
//@ export
module.exports = router;




//@
//@
//@
//@ file end



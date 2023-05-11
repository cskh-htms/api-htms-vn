//@
//@
//@
//@ file start




//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();



//@
//@
//@
//@ config
const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-app.js');






//@
//@
//@
//@ controller
const controllers_category_app =  require('../../controllers/categorys/controllers-category-app.js');
const controllers_category_by_parent_app =  require('../../controllers/categorys/controllers-category-by-parent-app.js');
const controllers_category_by_store_id_app =  require('../../controllers/categorys/controllers-category-by-store-id-app.js');





//@
//@
//@
//@ router
router.get('/', middle_ware,controllers_category_app);
router.get('/by-parent', middle_ware,controllers_category_by_parent_app);
router.get('/by-store-id', middle_ware,controllers_category_by_store_id_app);












//@
//@
//@
//@ export
module.exports = router;

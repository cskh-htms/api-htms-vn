const express = require('express');
const router = express.Router();

const config_api = require('../../configs/config');



const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-web.js');

const controllers_category_web =  require('../../controllers/categorys/controllers-category-web.js');
const controllers_category_by_parent_web =  require('../../controllers/categorys/controllers-category-by-parent-web.js');
const controllers_category_by_id_web =  require('../../controllers/categorys/controllers-category-by-id-web.js');
const controllers_category_by_store_id_web =  require('../../controllers/categorys/controllers-category-by-store-id-web.js');


router.get('/', middle_ware,controllers_category_web);
router.get('/by-parent', middle_ware,controllers_category_by_parent_web);

router.get('/by-id', middle_ware,controllers_category_by_id_web);
router.get('/by-store-id', middle_ware,controllers_category_by_store_id_web);




module.exports = router;

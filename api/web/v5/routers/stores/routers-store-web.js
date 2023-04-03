
const express = require('express');
const router = express.Router();


const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-web.js');

const controllers_store_get_all_web =  require('../../controllers/stores/controllers-store-get-all-web.js');
const controllers_store_by_id_web =  require('../../controllers/stores/controllers-store-by-id-web.js');

router.get('/', function(req, res, next) {
  res.end('App store v5 welcom ');
});



router.get('/by-id/', middle_ware,controllers_store_by_id_web);
router.get('/get-all', middle_ware,controllers_store_get_all_web);





module.exports = router;


const express = require('express');
const router = express.Router();


const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');

const controllers_store_get_all_app =  require('../../controllers/stores/controllers-store-app.js');
const controllers_store_by_id_app =  require('../../controllers/stores/controllers-store-by-id-app.js');


router.get('/', function(req, res, next) {
  res.end('App store v5 welcom ');
});





router.get('/get-all', middle_ware,controllers_store_get_all_app);
router.get('/by-id/', middle_ware,controllers_store_by_id_app);





module.exports = router;

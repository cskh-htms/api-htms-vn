
const express = require('express');
const router = express.Router();


const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');

const controllers_store_get_all_web =  require('../../controllers/stores/controllers-store-get-all-web.js');

router.get('/', function(req, res, next) {
  res.end('App store v5 welcom ');
});

router.get('/get-all', middle_ware,controllers_store_get_all_web);


module.exports = router;

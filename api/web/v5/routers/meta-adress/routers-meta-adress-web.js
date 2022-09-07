var express = require('express');
var router = express.Router();

const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');

const controllers_meta_adress_get_by_user_id_web =  require('../../controllers/meta-adress/controllers-meta-adress-get-by-user-id-web.js');



router.get('/', function(req, res, next) {
  res.end('web API meta-adress v5 welcom ');
});



router.get('/get-by-user-id/:user_id', middle_ware, controllers_meta_adress_get_by_user_id_web);



module.exports = router;
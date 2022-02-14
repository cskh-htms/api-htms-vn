

const express = require('express');
const router = express.Router();

const config_api = require('../../../../configs/config-api');

const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');

const controllers_bussiness_by_user_id =  require('../../controllers/bussiness/controllers-bussiness-by-user-id-appdalacom-api');


router.get('/', function(req, res, next) {
  res.end('api appdalacom bussiness by user welcom');
});

router.get('/:user_id',middle_ware, controllers_bussiness_by_user_id );

module.exports = router;

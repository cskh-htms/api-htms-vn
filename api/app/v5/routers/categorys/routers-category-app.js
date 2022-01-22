
const express = require('express');
const router = express.Router();


const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');

const controllers_category_app =  require('../../controllers/categorys/controllers-category-app.js');

router.get('/', function(req, res, next) {
  res.end('App API category speciality v5 welcom ');
});


router.get('/', middle_ware,controllers_category_app);


module.exports = router;


//@
//@
//@
//@ require
var express = require('express');
var router = express.Router();
const config_api = require('../../../../configs/config-api');









const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-app');





//@
//@
//@
//@ home 
router.get('/', function(req, res, next) {
  res.end('App API users v5 welcom ');
});





//@
//@
//@
//@ controller
const controllers_user_check_token_app =  require('../../controllers/users/controllers-user-check-token-app.js');
const controllers_user_register_app =  require('../../controllers/users/controllers-user-register-app.js');
const controllers_user_login_app =  require('../../controllers/users/controllers-user-login-app.js');
const controllers_user_get_by_id_app =  require('../../controllers/users/controllers-user-get-by-id-app.js');






//@
//@
//@
//@ router
router.post('/check-token', controllers_user_check_token_app);
router.post('/register', controllers_user_register_app);
router.post('/login', controllers_user_login_app);
router.get('/get-by-id/:user_id', middle_ware, controllers_user_get_by_id_app);






//@
//@
//@
//@  export
module.exports = router;










//@
//@
//@
//@ file end
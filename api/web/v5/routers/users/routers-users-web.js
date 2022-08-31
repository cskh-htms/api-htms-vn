var express = require('express');
var router = express.Router();

const config_api = require('../../../../configs/config-api');

const controllers_user_login_web =  require('../../controllers/users/controllers-user-login-web.js');
const controllers_user_check_token_web =  require('../../controllers/users/controllers-user-check-token-web.js');
const controllers_user_register_web =  require('../../controllers/users/controllers-user-register-web.js');
const controllers_user_lost_password_web =  require('../../controllers/users/controllers-user-lost-password-web.js');

const controllers_user_get_verification_code_web =  require('../../controllers/users/controllers-user-get-verification-code-web.js');
const controllers_user_verification_code_web =  require('../../controllers/users/controllers-user-verification-code-web.js');

const controllers_user_check_verification_web =  require('../../controllers/users/controllers-user-check-verification-web.js');


const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');


router.get('/', function(req, res, next) {
  res.end('web API users v5 welcom ');
});








router.post('/login', controllers_user_login_web);
router.post('/check-token', controllers_user_check_token_web);
router.post('/register', controllers_user_register_web);
router.post('/lost-password', controllers_user_lost_password_web);
router.get('/check-verification', controllers_user_check_verification_web);

router.get('/get-verification-code', middle_ware, controllers_user_get_verification_code_web);

router.post('/verification-code', middle_ware, controllers_user_verification_code_web);

module.exports = router;
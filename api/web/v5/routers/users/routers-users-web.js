var express = require('express');
var router = express.Router();



const controllers_user_login_web =  require('../../controllers/users/controllers-user-login-web.js');
const controllers_user_check_token_web =  require('../../controllers/users/controllers-user-check-token-web.js');









router.get('/', function(req, res, next) {
  res.end('web API users v5 welcom ');
});








router.post('/login', controllers_user_login_web);
router.post('/check-token', controllers_user_check_token_web);

module.exports = router;
var express = require('express');
var router = express.Router();



const controllers_user_login_web =  require('../../controllers/users/controllers-user-login-web.js');










router.get('/', function(req, res, next) {
  res.end('web API users v5 welcom ');
});








router.post('/login', controllers_user_login_web);


module.exports = router;
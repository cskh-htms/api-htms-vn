var express = require('express');
var router = express.Router();


//logout
router.get('/', function(req, res, next) {
		session_token = req.session;
		session_token.token = "";
		res.redirect("login");
});



module.exports = router;

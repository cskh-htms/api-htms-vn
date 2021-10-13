var express = require('express');
var router = express.Router();


//logout
router.get('/', function(req, res, next) {
		session_token = req.session;
		session_token.token = "";
		res.send('<br><br><br><h1 style="text-align:center;">Đã đăng xuất</h1>');
		return;
});



module.exports = router;

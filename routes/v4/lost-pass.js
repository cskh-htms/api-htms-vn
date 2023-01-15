var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', async  function(req, res, next) {

	res.send( "Vui lòng liên hệ admin thay đổi mật khẩu" );
	return;

});




//chức năng : login
//@@
router.post('/', async  function(req, res, next) {
	res.send("welcom");
	return;
});





module.exports = router;

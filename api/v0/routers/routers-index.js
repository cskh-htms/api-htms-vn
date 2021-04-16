var router = require('express').Router();








router.get('/', function(req, res, next) {
  res.end('AppDala API 1');
});


/*------------------------------------------------
		Users
---------------------------------------------- */
router.use('/users', require('./routers-users'));


/*------------------------------------------------
		Users type
---------------------------------------------- */
router.use('/users-type', require('./routers-users-type'));




/*------------------------------------------------
		token
---------------------------------------------- */
router.use('/token', require('./routers-token'));




//exports
module.exports = router;
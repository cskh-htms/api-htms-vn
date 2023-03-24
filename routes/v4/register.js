const express = require('express');
const router = express.Router();


const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');








//@
//@
//@
//@	router
router.get('/', async function(req, res, next) {
	return res.send("welCom !!!");
});

	
	
	
	
	
	
	
	
	
	
//@
//@
//@
//@	export
module.exports = router;









//@
//@
//@
//@	end





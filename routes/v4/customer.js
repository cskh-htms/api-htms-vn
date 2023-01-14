const express = require('express');
const router = express.Router();


const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');





router.get('/', async  function(req, res, next) {
	res.end("welcom");
	return;	
});



module.exports = router;
//@
//@
//@
//@
//@ loader express
const express = require('express');
const router = express.Router();


//@
//@
//@
//@ loader extends module
const fetch = require('node-fetch');


//@
//@
//@
//@ loader configs
const ojs_configs = require('../../configs/config');



//@
//@
//@
//@ loader function shares

const ojs_shares_others = require('../../models/ojs-shares-others');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');
const ojs_shares_date = require('../../models/ojs-shares-date');
const ojs_shares_fetch_data = require('../../models/ojs-shares-fetch-data');




///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////




/* 
---------------------------------------------------------------

1. [/]


--------------------------------------------------------------
*/



//@
//@
//@
//@
//@ 3. [/]
router.get('/', async function(req, res, next) {
	res.send("get");
	return;
});

//@
//@
//@
//@
//@ 3. [/]
router.post('/', async function(req, res, next) {
	res.send("post");
	return;
});






//@
//@
//@
//@
//@
//@ end router
module.exports = router;




















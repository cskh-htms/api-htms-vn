// v5 
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');







//@
//@
//@
//@ controller
const controller_news_show_all = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/news/controllers-admin-news-show-all.js'
);




//@
//@
//@
//@ router
router.get('/', controller_news_show_all);





//@
//@
//@
//@ export
module.exports = router;




//@
//@
//@
//@ export



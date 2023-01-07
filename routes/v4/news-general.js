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


const controller_news_show = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/news/controllers-admin-news-show.js'
);

const controller_news_update = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/news/controllers-admin-news-update.js'
);


const controller_news_add = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/news/controllers-admin-news-add.js'
);


const controller_news_save = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/news/controllers-admin-news-save.js'
);


const controller_news_delete = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/news/controllers-admin-news-delete.js'
);











//@
//@
//@
//@ router
router.get('/', controller_news_show_all);
router.get('/show/:news_id', controller_news_show);
router.put('/update/:news_id', controller_news_update);
router.get('/add/', controller_news_add);
router.post('/save/', controller_news_save);
router.delete('/delete/:news_id', controller_news_delete);




//@
//@
//@
//@ export
module.exports = router;




//@
//@
//@
//@ export



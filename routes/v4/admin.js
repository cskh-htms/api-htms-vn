// v5 
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');








const controller_admin_main = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/main/controllers-admin-main.js'
);

const controller_admin_thong_ke = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/thong-ke/controllers-admin-thong-ke.js'
);

const controller_admin_thong_ke_save = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/thong-ke/controllers-admin-thong-ke-save.js'
);


const controller_admin_thong_ke_marketing = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/thong-ke/controllers-admin-thong-ke-marketing.js'
);

const controller_admin_thong_ke_marketing_save = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/thong-ke/controllers-admin-thong-ke-marketing-save.js'
);

const controller_admin_thong_ke_marketing_ajax = require(
	'../../controllers/' + ojs_configs.controller_version + 
	'/admin/thong-ke/controllers-admin-thong-ke-marketing-ajax.js'
);

//@
//@
//@
//@ router
router.get('/', controller_admin_main);
router.get('/thong-ke/', controller_admin_thong_ke);
router.get('/thong-ke-marketing/', controller_admin_thong_ke_marketing);
router.post('/thong-ke/save/', controller_admin_thong_ke_save);
router.post('/thong-ke-marketing/save/', controller_admin_thong_ke_marketing_save);
router.post('/thong-ke-marketing/ajax/', controller_admin_thong_ke_marketing_ajax);

//@
//@
//@
//@ export
module.exports = router;




//@
//@
//@
//@ export



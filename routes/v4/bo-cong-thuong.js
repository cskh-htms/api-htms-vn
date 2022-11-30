//@
//@
// v5 
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');


const controller_bo_cong_thuong = require(
	'../../controllers/' + ojs_configs.controller_version + '/bo-cong-thuong/controllers-bo-cong-thuong.js'
);


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


router.get('/', controller_bo_cong_thuong);



//@@
//@@
//@@	
//@@	
//@@	
//@@	
	
	
module.exports = router;
	
	
	

	
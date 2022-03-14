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
const ojs_shares_fetch_data = require('../../models/ojs-shares-fetch-data');

const controller_bo_cong_thuong= require('../../controllers/' + ojs_configs.controller_version + '/users/controllers-bo-cong-thuong.js');




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
	
	
	

	


const express = require('express');
const router = express.Router();

const config_api = require('../../../../configs/config-api');


const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');

const controllers_bo_cong_thuong  =  
require(
	'../../controllers/bo-cong-thuong/controllers-bo-cong-thuong-api.js'
);



router.get(
	'/',
	middle_ware, 
	controllers_bo_cong_thuong 
);



module.exports = router;

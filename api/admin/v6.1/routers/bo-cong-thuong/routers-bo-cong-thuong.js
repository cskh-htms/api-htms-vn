

const express = require('express');
const router = express.Router();



const config_api = require('../../configs/config');





const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');

const controllers_bo_cong_thuong  =  
require(
	'../../controllers/bo-cong-thuong/controllers-bo-cong-thuong-api.js'
);



const controllers_bo_cong_thuong_load  =  
require(
	'../../controllers/bo-cong-thuong/controllers-bo-cong-thuong-load-api.js'
);



const controllers_bo_cong_thuong_gov  =  
require(
	'../../controllers/bo-cong-thuong/controllers-bo-cong-thuong-gov-api.js'
);





router.get(
	'/',
	middle_ware, 
	controllers_bo_cong_thuong 
);


router.post(
	'/ajax-load',
	middle_ware, 
	controllers_bo_cong_thuong_load
);


router.post(
	'/gov', 
	controllers_bo_cong_thuong_gov
);




module.exports = router;

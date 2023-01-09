//@
//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();


const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');







//@
//@
//@
//@
//@ controller
const controller_review_show_all = require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/reviews/controller-admin-review-show-all.js'
);



const controller_review_delete = require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/reviews/controller-admin-review-delete.js'
);









//@
//@
//@
//@
//@ router
router.get('/', controller_review_show_all);
router.delete('/delete/:review_id', controller_review_delete);











/*
//@
//@
//@
//@
//@ controller
const controller_review_get_all = require('../../controllers/' + 
ojs_configs.controller_version + 
'/reviews/controllers-review-get-all.js'
);


const controller_review_duyet_danh_gia = require('../../controllers/' + 
ojs_configs.controller_version + 
'/reviews/controllers-review-duyet-danh-gia.js'
);


const controller_review_delete = require('../../controllers/' + 
ojs_configs.controller_version + 
'/reviews/controllers-review-delete.js'
);


const controller_review_show = require('../../controllers/' + 
ojs_configs.controller_version + 
'/reviews/controllers-review-show.js'
);


const controller_review_update = require('../../controllers/' + 
ojs_configs.controller_version + 
'/reviews/controllers-review-update.js'
);




//@
//@
//@
//@
//@ router
router.get('/', controller_review_get_all);






router.post('/duyet-danh-gia/:review_id', controller_review_duyet_danh_gia);
router.get('/delete/:review_id', controller_review_delete);
router.get('/show/:review_id', controller_review_show);
router.post('/update/:review_id', controller_review_update);



*/	
	
	
//@
//@
//@
//@
//@ router	
module.exports = router;
	
	
	

//@
//@
//@
//@
//@ end
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



const controller_review_active = require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/reviews/controller-admin-review-active.js'
);



const controller_review_show = require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/reviews/controller-admin-review-show.js'
);


const controller_review_update = require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/reviews/controller-admin-review-update.js'
);







//@
//@
//@
//@
//@ router
router.get('/', controller_review_show_all);
router.delete('/delete/:review_id', controller_review_delete);
router.put('/active/:review_id', controller_review_active);
router.get('/show/:review_id', controller_review_show);
router.put('/update/:review_id', controller_review_update);







	
	
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
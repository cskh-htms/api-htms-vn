

const express = require('express');
const router = express.Router();

const config_api = require('../../../../configs/config-api');


const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');

const controllers_review_get_all =  require('../../controllers/reviews/controllers-review-get-all-appdalacom-api.js');
const controllers_review_duyet_danh_gia =  require('../../controllers/reviews/controllers-review-duyet-danh-gia-appdalacom-api.js');
const controllers_review_delete =  require('../../controllers/reviews/controllers-review-delete-appdalacom-api.js');
const controllers_review_show =  require('../../controllers/reviews/controllers-review-show-appdalacom-api.js');
const controllers_review_update =  require('../../controllers/reviews/controllers-review-update-appdalacom-api.js');

router.get('/', function(req, res, next) {
  res.end('api appdalacom reviews by user welcom');
});

router.get('/get-all/',middle_ware, controllers_review_get_all );
router.put('/duyet-danh-gia/:review_id',middle_ware, controllers_review_duyet_danh_gia );
router.delete('/delete-review/:review_id',middle_ware, controllers_review_delete );
router.get('/show/:review_id',middle_ware, controllers_review_show );
router.put('/update/:review_id',middle_ware, controllers_review_update );



module.exports = router;

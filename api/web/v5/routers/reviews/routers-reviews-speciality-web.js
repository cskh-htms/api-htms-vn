
const express = require('express');
const router = express.Router();
const multer = require('multer');
const WPAPI = require( 'wpapi' );

const config_api = require('../../../../configs/config-api');


const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-web.js');



const controllers_reviews_spaciality_insert_web =  require('../../controllers/controllers-reviews-spaciality-insert-web.js');
const controllers_reviews_spaciality_update_web =  require('../../controllers/controllers-reviews-spaciality-update-web.js');

const controllers_reviews_spaciality_get_by_product_id_web =  require('../../controllers/reviews/controllers-reviews-speciality-get-by-product-id-web.js');
const controllers_reviews_spaciality_check_review_by_user_web =  require('../../controllers/reviews/controllers-reviews-speciality-check-review-by-user-web.js');


const controller_review_get_by_user =  require('../../controllers/reviews/controller-review-get-by-user.js');
const controller_review_get_product_no_reivew_by_user =  require('../../controllers/reviews/controller-review-get-product-no-review-by-user.js');



const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({storage}).array('image')



router.get('/', function(req, res, next) {
  res.end('App API reviews speciality v5 welcom ');
});


router.get('/get-by-user', middle_ware, controller_review_get_by_user);
router.get('/get-product-no-review-by-user', middle_ware, controller_review_get_product_no_reivew_by_user);
router.get('/check-review-by-user', middle_ware,controllers_reviews_spaciality_check_review_by_user_web);
router.get('/get-by-product-id', middle_ware,controllers_reviews_spaciality_get_by_product_id_web);



router.post('/insert-web', middle_ware, upload,controllers_reviews_spaciality_insert_web.insert_reviews_spaciality_web);
router.put('/update-web/:review_id', middle_ware, upload,controllers_reviews_spaciality_update_web.update_reviews_spaciality_web);










module.exports = router;

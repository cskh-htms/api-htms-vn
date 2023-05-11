
const express = require('express');
const router = express.Router();
const multer = require('multer');
const WPAPI = require( 'wpapi' );

const config_api = require('../../configs/config');


const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-app.js');


const controllers_reviews_spaciality_insert_app =  require('../../controllers/controllers-reviews-spaciality-insert-app.js');
const controllers_reviews_spaciality_update_app =  require('../../controllers/controllers-reviews-spaciality-update-app.js');

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


router.post('/insert-app', middle_ware, upload,controllers_reviews_spaciality_insert_app.insert_reviews_spaciality_app);
router.put('/update-app/:review_id', middle_ware, upload,controllers_reviews_spaciality_update_app.update_reviews_spaciality_app);







module.exports = router;

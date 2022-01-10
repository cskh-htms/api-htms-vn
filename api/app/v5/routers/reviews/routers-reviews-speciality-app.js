
const express = require('express');
const router = express.Router();
const middle_ware =  require('../../../../lib/middle-ware/middle-ware');

const controllers_reviews_spaciality_app =  require('../../controllers/controllers-reviews-spaciality-insert-app.js');



router.get('/', function(req, res, next) {
  res.end('App API reviews speciality v5 welcom ');
});


router.post('/insert-app', middle_ware, controllers_reviews_spaciality_app.insert_reviews_spaciality_app);


module.exports = router;

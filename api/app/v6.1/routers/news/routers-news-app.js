


//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();
const config_api = require('../../configs/config');


//@
//@
//@

const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-app.js');

const controllers_news_get_all_app =  require('../../controllers/news/controllers-news-get-all-app.js');
const controllers_news_get_by_id =  require('../../controllers/news/controllers-news-get-by-id.js');




router.get('/', function(req, res, next) {
  res.end('App news v5 welcom ');
});





//@
//@
//@
//@ router
router.get('/get-all', middle_ware,controllers_news_get_all_app);

router.get('/get-by-id', middle_ware,controllers_news_get_by_id);




//@
//@
//@
//@ export
module.exports = router;

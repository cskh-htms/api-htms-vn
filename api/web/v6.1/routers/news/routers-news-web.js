const express = require('express');
const router = express.Router();

const config_api = require('../../configs/config');



const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-web.js');

const controllers_news_get_all_web =  require('../../controllers/news/controllers-news-get-all-web.js');
const controllers_news_get_by_id =  require('../../controllers/news/controllers-news-get-by-id.js');



router.get('/', function(req, res, next) {
  res.end('App news v5 welcom ');
});

router.get('/get-all', middle_ware,controllers_news_get_all_web);

router.get('/get-by-id', middle_ware,controllers_news_get_by_id);

module.exports = router;

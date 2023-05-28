//@
//@
//@
//@ file start
const express = require('express');
const router = express.Router();


const config_api = require('../../../configs/config');



const middle_ware =  require('../../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');







//@
//@
//@
//@ controller
const  controllers_admin_news_show_all =  
require(
	'../../../controllers/admin/news/controllers-admin-news-show-all'
);

const  controllers_admin_news_show =  
require(
	'../../../controllers/admin/news/controllers-admin-news-show'
);

const  controllers_admin_news_update =  
require(
	'../../../controllers/admin/news/controllers-admin-news-update'
);

const  controllers_admin_news_add =  
require(
	'../../../controllers/admin/news/controllers-admin-news-add'
);


const  controllers_admin_news_save =  
require(
	'../../../controllers/admin/news/controllers-admin-news-save'
);


const  controllers_admin_news_delete =  
require(
	'../../../controllers/admin/news/controllers-admin-news-delete'
);









//@
//@
//@
//@ router
router.get('/show-all',	middle_ware, controllers_admin_news_show_all);
router.get('/show',	middle_ware, controllers_admin_news_show);
router.put('/update', middle_ware, controllers_admin_news_update);
router.get('/add', middle_ware, controllers_admin_news_add);
router.post('/save', middle_ware, controllers_admin_news_save);
router.delete('/delete', middle_ware, controllers_admin_news_delete );


router.get('/', function(req, res, next) {
  res.end('api v5 news  appdalacom welcom ! ');
});










//@
//@
//@
//@ export
module.exports = router;



//@
//@
//@
//@ file end
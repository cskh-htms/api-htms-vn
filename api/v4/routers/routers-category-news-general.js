
/*
@@@@
@@@@@
@@@@@
@@@@@
*/

var express = require('express');
var router = express.Router();
var middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
var controllers_category_news_general = require('../controllers/controllers-category-news-general');








//@@
//@@
//@@
//insert

router.post('/', middle_ware, controllers_category_news_general.insert_category_news_general);

//@@
//@@
//@@
//get all 

router.get('/', middle_ware, controllers_category_news_general.get_all_category_news_general);


//@@
//@@
//@@
//get one 

router.get('/:category_news_id', middle_ware, controllers_category_news_general.get_one_category_news_general);


//@@
//@@
//@@
//update

router.put('/:category_news_id', middle_ware, controllers_category_news_general.update_category_news_general);

//@@
//@@
//@@
//update

router.delete('/:category_news_id', middle_ware, controllers_category_news_general.delete_category_news_general);


//@@
//@@
//@@
//update

router.post('/search', middle_ware, controllers_category_news_general.search);




/*
@@@@
@@@@@
@@@@@
@@@@@
*/

module.exports = router;



/*
@@@@
@@@@@
@@@@@
@@@@@
*/
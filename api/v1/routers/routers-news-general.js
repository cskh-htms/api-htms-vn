
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
var controllers_news_general = require('../controllers/controllers-news-general');








//@@
//@@
//@@
//insert

router.post('/', middle_ware, controllers_news_general.insert_news_general);

//@@
//@@
//@@
//get all 

router.get('/', middle_ware, controllers_news_general.get_all_news_general);


//@@
//@@
//@@
//get one 

router.get('/:news_id', middle_ware, controllers_news_general.get_one_news_general);


//@@
//@@
//@@
//update

router.put('/:news_id', middle_ware, controllers_news_general.update_news_general);

//@@
//@@
//@@
//update

router.delete('/:news_id', middle_ware, controllers_news_general.delete_news_general);


//@@
//@@
//@@
//update

router.post('/search', middle_ware, controllers_news_general.search);




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
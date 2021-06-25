
/*


- controller category general

* -1. [insert_category_news_general] 

* 2. [get_all__category_news_general]

* 3. [get_one__category_news_general]

* 4. [update__category_news_general]

* 5. [delete__category_news_general]

* 6. [search]

*/





var express = require('express');
var router = express.Router();
var middle_ware =  require('./routers-middle-ware');


const controllers_category_news_general = require('../controllers/controllers-category-news-general');




/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////




//@
//@
//@
//@
//@ * 1. [insert_category_news_general]
router.post('/', middle_ware, controllers_category_news_general.insert_category_news_general);







//@
//@
//@
//@
//@ * 2. [get_all_category_news_general]
router.get('/', middle_ware, controllers_category_news_general.get_all_category_news_general);





//@
//@
//@
//@
//@ * 3. [get_one_category_news_general]
router.get('/:category_news_id', middle_ware, controllers_category_news_general.get_one_category_news_general);


//@
//@
//@
//@
//@ * 4. [update_category_news_general]
router.put('/:category_news_id', middle_ware, controllers_category_news_general.update_category_news_general);




//@
//@
//@
//@
//@ * 5. [delete_category_news_general]
router.delete('/:category_news_id', middle_ware, controllers_category_news_general.delete_category_news_general);



//@
//@
//@
//@
//@ * 6. [search]
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
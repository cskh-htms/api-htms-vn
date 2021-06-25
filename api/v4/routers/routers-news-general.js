
/*




* 1. [insert_news_general]

* 2. [get_all_news_general]

* 3. [get_one_news_general]

* 4. [update_news_general]

* 5. [delete_news_general]

* 6. [search]


*/


const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');


const controllers_news_general = require('../controllers/controllers-news-general');







//@
//@
//@
//@
//@
//@ * 1. [insert_news_general]
router.post('/', middle_ware, controllers_news_general.insert_news_general);





//@
//@
//@
//@
//@
//@ * 2. [get_all_news_general]
router.get('/', middle_ware, controllers_news_general.get_all_news_general);






//@
//@
//@
//@
//@
//@ * 3. [get_one_news_general]
router.get('/:news_id', middle_ware, controllers_news_general.get_one_news_general);







//@
//@
//@
//@
//@
//@ * 4. [update_news_general]
router.put('/:news_id', middle_ware, controllers_news_general.update_news_general);






//@
//@
//@
//@
//@
//@ * 5. [delete_news_general]
router.delete('/:news_id', middle_ware, controllers_news_general.delete_news_general);






//@
//@
//@
//@
//@
//@ * 5. [search]
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
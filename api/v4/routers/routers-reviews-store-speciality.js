
/*




* 1. [insert_reviews_store_spaciality]

* 2. [get_all_reviews_store_spaciality]

* 3. [get_one_reviews_store_spaciality]

* 4. [update_reviews_store_spaciality]

* 5. [delete_reviews_store_spaciality]

* 5. [search]




*/

const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
const controllers_reviews_store_spaciality = require('../controllers/controllers-reviews-store-spaciality');








//@
//@
//@
//@
//@ * 1. [insert_reviews_speciality]
router.post('/', middle_ware, controllers_reviews_store_spaciality.insert_reviews_store_spaciality);











//@
//@
//@
//@
//@ * 2. [get_all_reviews_speciality]
router.get('/', middle_ware, controllers_reviews_store_spaciality.get_all_reviews_store_spaciality);









//@
//@
//@
//@
//@ * 3. [get_one_reviews_speciality]
router.get('/:review_store_id', middle_ware, controllers_reviews_store_spaciality.get_one_reviews_store_spaciality);







//@
//@
//@
//@
//@ * 4. [update_reviews_speciality]
router.put('/:review_store_id', middle_ware, controllers_reviews_store_spaciality.update_reviews_store_spaciality);











//@
//@
//@
//@
//@ * 5. [delete_reviews_speciality]
router.delete('/:review_store_id', middle_ware, controllers_reviews_store_spaciality.delete_reviews_store_spaciality);










//@
//@
//@
//@
//@ * 6. [search]
router.post('/search', middle_ware, controllers_reviews_store_spaciality.search);








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
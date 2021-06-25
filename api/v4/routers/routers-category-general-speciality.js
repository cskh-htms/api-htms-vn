
/*


- controller category general

* -1. [insert_category_general_speciality] ( tạo category)

* 2. [get_all_category_general_speciality]

* 3. [get_one_category_general_speciality]

* 4. [update_category_general_speciality]

* 5. [delete_category_general_speciality]






*/





var express = require('express');
var router = express.Router();
var middle_ware =  require('./routers-middle-ware');














//chuyen huong controller 
var controllers_category_general_speciality = require('../controllers/controllers-category-general-speciality');




//@@
//@@
//@@
// 1. [insert_category_general_speciality]
router.post('/', middle_ware, controllers_category_general_speciality.insert_category_general_speciality);



//@@
//@@
//@@
// 2. [get_all_category_general_speciality]
router.get('/', middle_ware, controllers_category_general_speciality.get_all_category_general_speciality);




//@@
//@@
//@@
// 3. [get_one_category_general_speciality]
router.get('/:cat_id', middle_ware, controllers_category_general_speciality.get_one_category_general_speciality);



//@@
//@@
//@@
// 4. [update_category_general_speciality]
router.put('/:cat_id', middle_ware, controllers_category_general_speciality.update_category_general_speciality);




//@@
//@@
//@@
// 5. [delete_category_general_speciality]
router.delete('/:cat_id', middle_ware, controllers_category_general_speciality.delete_category_general_speciality);





//@@
//@@
//@@
// 6. [delete_category_general_speciality]
router.post('/search', middle_ware, controllers_category_general_speciality.search);






//@@
//@@
//@@

module.exports = router;



/*
@@@@
@@@@@
@@@@@
@@@@@
*/
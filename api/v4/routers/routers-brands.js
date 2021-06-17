
/*




* 1. [insert_brands]

* 2. [get_all_brands]

* 3. [get_one_brands]

* 4. [update_brands]

* 5. [delete_brands]

* 6. [search]


*/

const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');



const controllers_brands = require('../controllers/controllers-brands');








//@
//@
//@
//@
//@* 1. [insert_brands]
router.post('/', middle_ware, controllers_brands.insert_brands);




//@
//@
//@
//@
//@* 2. [get_all_brands]
router.get('/', middle_ware, controllers_brands.get_all_brands);



//@
//@
//@
//@
//@* 3. [get_one_brands]
router.get('/:brand_id', middle_ware, controllers_brands.get_one_brands);






//@
//@
//@
//@
//@* 4. [update_brands]
router.put('/:brand_id', middle_ware, controllers_brands.update_brands);






//@
//@
//@
//@
//@* 5. [update_brands]
router.put('/:brand_id', middle_ware, controllers_brands.update_brands);





//@
//@
//@
//@
//@* 5. [delete_brands]
router.delete('/:brand_id', middle_ware, controllers_brands.delete_brands);




//@
//@
//@
//@
//@* 6. [search]
router.post('/search', middle_ware, controllers_brands.search);







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
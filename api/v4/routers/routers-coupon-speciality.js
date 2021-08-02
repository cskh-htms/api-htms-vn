
/*

* 1. [insert_coupon_speciality]

* 2. [get_all_coupon_speciality]

* 3. [get_one_coupon_speciality]

* 4. [update_coupon_speciality]

* 5. [delete_coupon_speciality]


* 6. [search]


* 7. [search_all]


* 8. [checked-coupon]



*/








const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
const controllers_coupon_speciality = require('../controllers/controllers-coupon-speciality');





//@
//@
//@
//@
//@* 1. [insert_coupon_speciality]
router.post('/', middle_ware, controllers_coupon_speciality.insert_coupon_speciality);



//@
//@
//@
//@
//@* 2. [get_all_coupon_speciality]
router.get('/', middle_ware, controllers_coupon_speciality.get_all_coupon_speciality);





//@
//@
//@
//@
//@* 3. [get_one_coupon_speciality]
router.get('/:coupon_speciality_id', middle_ware, controllers_coupon_speciality.get_one_coupon_speciality);




//@
//@
//@
//@
//@* 4. [update_coupon_speciality]
router.put('/:coupon_speciality_id', middle_ware, controllers_coupon_speciality.update_coupon_speciality);



//@
//@
//@
//@
//@* 5. [delete_coupon_speciality]
router.delete('/:coupon_speciality_id', middle_ware ,controllers_coupon_speciality.delete_coupon_speciality);




//@@
//@@
//@@
//6. [search] 
router.post('/search', middle_ware, controllers_coupon_speciality.search);




//@@
//@@
//@@
//7. [search_all] 
router.post('/search_all', middle_ware, controllers_coupon_speciality.search_all);





//@@
//@@
//@@
//8. [checked-coupon] 
router.post('/checked-coupon', middle_ware, controllers_coupon_speciality.checked_coupon);
















module.exports = router;

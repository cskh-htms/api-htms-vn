
/*

* 1. [insert_shipping_spaciality]

* 2. [get_all_shipping_spaciality]

* 3. [get_one_shipping_spaciality]

* 4. [update_shipping_spaciality]

* 5. [delete_shipping_spaciality]


*/

var express = require('express');
var router = express.Router();
var middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
var controllers_shipping_spaciality = require('../controllers/controllers-shipping-spaciality');



//@
//@
//@
//@
//@* 1. [insert_sping_tracking]
router.post('/', middle_ware, controllers_shipping_spaciality.insert_shipping_spaciality);



//@
//@
//@
//@
//@* 2. [get_all_shipping_spaciality]
router.get('/', middle_ware, controllers_shipping_spaciality.get_all_shipping_spaciality);





//@
//@
//@
//@
//@* 3. [get_one_shipping_spaciality]
router.get('/:shipping_speciality_id', middle_ware, controllers_shipping_spaciality.get_one_shipping_spaciality);




//@
//@
//@
//@
//@* 4. [update_shipping_spaciality]
router.put('/:shipping_speciality_id', middle_ware, controllers_shipping_spaciality.update_shipping_spaciality);







//@
//@
//@
//@
//@* 5. [delete_shipping_spaciality]
router.delete('/:shipping_speciality_id', middle_ware ,controllers_shipping_spaciality.delete_shipping_spaciality);




//@@
//@@
//@@
//6. [search] 
router.post('/search', middle_ware, controllers_shipping_spaciality.search);




















module.exports = router;
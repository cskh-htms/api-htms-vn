
/*

* 1. [insert_shipping_tracking]

* 2. [get_all_shipping_tracking]

* 3. [get_one_shipping_tracking]

* 4. [update_shipping_tracking]

* 5. [delete_shipping_tracking]

* 6. [search]

* 7. [push-shipping-dala]

* 7. [push-shipping-dala-shipper]

* 9. [push-shipping-ghtk]

*/








const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
const controllers_shipping_tracking = require('../controllers/controllers-shipping-tracking');





//@
//@
//@
//@
//@* 1. [insert_sping_tracking]
router.post('/', middle_ware, controllers_shipping_tracking.insert_shipping_tracking);



//@
//@
//@
//@
//@* 2. [get_all_shipping_tracking]
router.get('/', middle_ware, controllers_shipping_tracking.get_all_shipping_tracking);





//@
//@
//@
//@
//@* 3. [get_one_shipping_tracking]
router.get('/:tracking_id', middle_ware, controllers_shipping_tracking.get_one_shipping_tracking);




//@
//@
//@
//@
//@* 4. [update_shipping_tracking]
router.put('/:tracking_id', middle_ware, controllers_shipping_tracking.update_shipping_tracking);







//@
//@
//@
//@
//@* 5. [delete_shipping_tracking]
router.delete('/:tracking_id', middle_ware ,controllers_shipping_tracking.delete_shipping_tracking);




//@@
//@@
//@@
//6. [search] 
router.post('/search', middle_ware, controllers_shipping_tracking.search);







//@
//@
//@
//@
//@
//@* 7. [push-shipping-dala]
router.post('/push-shipping-dala', middle_ware, controllers_shipping_tracking.push_shipping_dala);




//@
//@
//@
//@
//@
//@* 8. [push-shipping-dala-shipper]
router.post('/push-shipping-dala-shipper', middle_ware, controllers_shipping_tracking.push_shipping_dala_shipper);




//@
//@
//@
//@
//@
//@* 9. [push-shipping-ghtk]
router.post('/push-shipping-ghtk', middle_ware, controllers_shipping_tracking.push_shipping_ghtk);













module.exports = router;

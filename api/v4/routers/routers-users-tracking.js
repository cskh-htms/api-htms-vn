
/*

* 1. [insert_users_tracking]

* 2. [get_all_users_tracking]

* 3. [get_one_users_tracking]

* 4. [update_users_tracking]

* 5. [delete_users_tracking]

* 6. [search]







*/








const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
const controllers_users_tracking = require('../controllers/controllers-users-tracking');





//@
//@
//@
//@
//@* 1. [insert_sping_tracking]
router.post('/', middle_ware, controllers_users_tracking.insert_users_tracking);



//@
//@
//@
//@
//@* 2. [get_all_users_tracking]
router.get('/', middle_ware, controllers_users_tracking.get_all_users_tracking);





//@
//@
//@
//@
//@* 3. [get_one_users_tracking]
router.get('/:user_tracking_id', middle_ware, controllers_users_tracking.get_one_users_tracking);




//@
//@
//@
//@
//@* 4. [update_users_tracking]
router.put('/:user_tracking_id', middle_ware, controllers_users_tracking.update_users_tracking);



//@
//@
//@
//@
//@* 5. [update_users_tracking]
router.put('/unlock/:user_tracking_id', middle_ware, controllers_users_tracking.unlock_users_tracking);



//@
//@
//@
//@
//@* 5. [delete_users_tracking]
router.delete('/:user_tracking_id', middle_ware ,controllers_users_tracking.delete_users_tracking);




//@@
//@@
//@@
//6. [search] 
router.post('/search', middle_ware, controllers_users_tracking.search);




















module.exports = router;

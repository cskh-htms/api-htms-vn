
/*

* 1. [insert_uploads_infomation]

* 2. [get_all_uploads_infomation]

* 3. [get_one_uploads_infomation]

* 4. [update_uploads_infomation]

* 5. [delete_uploads_infomation]

* 6. [search]






*/








const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
const controllers_uploads_infomation = require('../controllers/controllers-uploads-infomation');





//@
//@
//@
//@
//@* 1. [insert_uploads_infomation]
router.post('/', middle_ware, controllers_uploads_infomation.insert_uploads_infomation);



//@
//@
//@
//@
//@* 2. [get_all_uploads_infomation]
router.get('/', middle_ware, controllers_uploads_infomation.get_all_uploads_infomation);





//@
//@
//@
//@
//@* 3. [get_one_uploads_infomation]
router.get('/:uploads_infomation_id', middle_ware, controllers_uploads_infomation.get_one_uploads_infomation);




//@
//@
//@
//@
//@* 4. [update_uploads_infomation]
router.put('/:uploads_infomation_id', middle_ware, controllers_uploads_infomation.update_uploads_infomation);



//@
//@
//@
//@
//@* 5. [delete_uploads_infomation]
router.delete('/:uploads_infomation_id', middle_ware ,controllers_uploads_infomation.delete_uploads_infomation);




//@@
//@@
//@@
//6. [search] 
router.post('/search', middle_ware, controllers_uploads_infomation.search);




















module.exports = router;
